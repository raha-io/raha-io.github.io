---
title: "Docker Swarm Networking: Deep Dive into VXLAN and FDB Synchronization"
date: "2026-01-02"
description: "Explore how Docker Swarm uses VXLAN technology for overlay networking and the mechanisms it employs to synchronize forwarding information across cluster nodes."
---

Docker Swarm's overlay networking is one of its most powerful features, enabling seamless communication between containers across multiple hosts. At the heart of this capability lies VXLAN (Virtual Extensible LAN) technology. Let's explore how it all works.

## Understanding the Problem

When running containers on a single host, networking is straightforward—containers can communicate via bridge networks. But in a distributed environment like Docker Swarm, containers on different physical hosts need to communicate as if they were on the same network.

This presents several challenges:

- **Network isolation**: How do you keep traffic separated between different services?
- **IP addressing**: How do containers discover each other across hosts?
- **Scalability**: How do you manage this as your cluster grows?

Docker Swarm solves these challenges using **overlay networks** built on VXLAN technology.

## What is VXLAN?

VXLAN (Virtual Extensible LAN) is a network virtualization technology that encapsulates Layer 2 Ethernet frames within Layer 4 UDP packets. This allows you to create virtual Layer 2 networks that span across Layer 3 boundaries.

### Key VXLAN Concepts

- **VNI (VXLAN Network Identifier)**: A 24-bit identifier (similar to VLAN ID but with much larger address space—over 16 million networks)
- **VTEP (VXLAN Tunnel Endpoint)**: The entity that performs encapsulation and decapsulation of VXLAN traffic
- **Underlay Network**: The physical network infrastructure carrying the encapsulated traffic
- **Overlay Network**: The virtual network created on top of the underlay

### VXLAN Packet Structure

```text
+--------------------------------------------------+
| Outer Ethernet Header (14 bytes)                 |
+--------------------------------------------------+
| Outer IP Header (20 bytes)                       |
| - Source IP: Local VTEP                          |
| - Dest IP: Remote VTEP                           |
+--------------------------------------------------+
| Outer UDP Header (8 bytes)                       |
| - Dest Port: 4789 (VXLAN default)                |
+--------------------------------------------------+
| VXLAN Header (8 bytes)                           |
| - VNI: 24-bit Network Identifier                 |
+--------------------------------------------------+
| Original Ethernet Frame                          |
| - Inner MAC addresses                            |
| - Inner IP packet                                |
| - Payload                                        |
+--------------------------------------------------+
```

## How Docker Swarm Implements VXLAN

When you create an overlay network in Docker Swarm, several things happen behind the scenes.

### Creating an Overlay Network

```bash
docker network create --driver overlay --attachable my-overlay
```

Docker Swarm then:

1. Allocates a unique **VNI** for this network
2. Creates **network namespaces** on each participating node
3. Sets up **VXLAN interfaces** (vxlan devices) in the kernel
4. Configures **bridge devices** to connect containers to the VXLAN

### Network Namespace Architecture

On each Swarm node, Docker creates a dedicated network namespace for the overlay network:

```text
Node 1                                   Node 2
+---------------------------+           +---------------------------+
| Container A               |           | Container B               |
| eth0: 10.0.0.2            |           | eth0: 10.0.0.3            |
+----------|----------------+           +----------|----------------+
           |                                       |
+----------|----------------+           +----------|----------------+
| Overlay Network Namespace |           | Overlay Network Namespace |
|                           |           |                           |
| br0 (bridge)              |           | br0 (bridge)              |
|   |                       |           |   |                       |
| vxlan0 (VNI: 4097)        |           | vxlan0 (VNI: 4097)        |
|   |                       |           |   |                       |
+---|---[VTEP: 192.168.1.10]|           +---|---[VTEP: 192.168.1.11]|
    |                                       |
====|=======================================|====  Underlay Network
              UDP Port 4789
```

### Viewing VXLAN Configuration

You can inspect the VXLAN setup on a Swarm node:

```bash
# List network namespaces
ls /var/run/docker/netns/

# Enter the overlay network namespace
nsenter --net=/var/run/docker/netns/1-abc123def ip -d link show vxlan0
```

Output will show something like:

```text
vxlan0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1450 qdisc noqueue
    master br0 state UNKNOWN mode DEFAULT
    link/ether 02:42:ac:12:00:02 brd ff:ff:ff:ff:ff:ff
    vxlan id 4097 srcport 0 0 dstport 4789 proxy l2miss l3miss
```

## Forwarding Database (FDB) Synchronization

Here's where the magic happens. For VXLAN to work, each node needs to know which remote VTEP hosts which MAC addresses. This information is stored in the **Forwarding Database (FDB)**.

### The FDB Challenge

Traditional VXLAN implementations rely on multicast for MAC learning—when a node doesn't know where a MAC address lives, it floods the packet to all VTEPs. However, multicast isn't always available in cloud environments.

Docker Swarm solves this using **control-plane MAC distribution**, avoiding the need for multicast entirely.

### Docker's Gossip Protocol

Docker Swarm uses a gossip-based protocol built on **HashiCorp's Serf** (via libnetwork) to distribute network information across the cluster. This includes:

- **Node membership**: Which nodes are part of the swarm
- **Network endpoints**: Which containers exist on which networks
- **MAC-to-VTEP mappings**: Where each container's MAC address is located

```text
+-------------+     Gossip      +-------------+
|   Node 1    |<--------------->|   Node 2    |
|   Serf      |                 |   Serf      |
+------+------+                 +------+------+
       |                               |
       v                               v
+-------------+                 +-------------+
| libnetwork  |                 | libnetwork  |
| FDB Updates |                 | FDB Updates |
+-------------+                 +-------------+
```

### How FDB Entries are Synchronized

When a container joins an overlay network:

1. **Local registration**: The node registers the container's MAC address and IP in its local network database
2. **Gossip broadcast**: This information is shared with other nodes via the gossip protocol
3. **FDB programming**: Each receiving node programs its kernel FDB with the new MAC-to-VTEP mapping

```bash
# View FDB entries for a VXLAN interface
bridge fdb show dev vxlan0

# Example output:
02:42:0a:00:00:03 dst 192.168.1.11 self permanent
02:42:0a:00:00:04 dst 192.168.1.12 self permanent
```

### The L2MISS and L3MISS Mechanism

Docker configures VXLAN interfaces with `l2miss` and `l3miss` flags. When the kernel can't find a destination:

```bash
# VXLAN is configured with proxy, l2miss, and l3miss
ip link add vxlan0 type vxlan id 4097 \
    local 192.168.1.10 \
    dstport 4789 \
    proxy l2miss l3miss
```

- **L2MISS**: Kernel notifies userspace when it doesn't have an FDB entry for a MAC
- **L3MISS**: Kernel notifies userspace when it needs ARP resolution

Docker's network driver listens for these events and responds with the correct information from its distributed database:

```go
// Simplified representation of the miss handling
func handleL2Miss(mac net.HardwareAddr) {
    // Look up MAC in distributed network state
    vtep := networkDB.LookupMAC(mac)
    if vtep != nil {
        // Program FDB entry
        netlink.AddFDBEntry(mac, vtep)
    }
}
```

## The Complete Data Flow

Let's trace a packet from Container A on Node 1 to Container B on Node 2:

### Step 1: Container A Sends Packet

```text
Container A (10.0.0.2) -> Container B (10.0.0.3)
Inner Ethernet: src=02:42:0a:00:00:02, dst=02:42:0a:00:00:03
```

### Step 2: ARP Resolution (if needed)

If Container A doesn't know Container B's MAC:

1. ARP request is sent to the bridge
2. Docker's proxy ARP (via l3miss) responds with Container B's MAC
3. Container A now has the destination MAC

### Step 3: FDB Lookup

The bridge forwards the frame to the VXLAN interface, which:

1. Looks up `02:42:0a:00:00:03` in the FDB
2. Finds it maps to VTEP `192.168.1.11`

### Step 4: VXLAN Encapsulation

```text
+--------------------------------------------------+
| Outer Ethernet: Node1 MAC -> Node2 MAC           |
+--------------------------------------------------+
| Outer IP: 192.168.1.10 -> 192.168.1.11           |
+--------------------------------------------------+
| UDP: srcport=random, dstport=4789                |
+--------------------------------------------------+
| VXLAN Header: VNI=4097                           |
+--------------------------------------------------+
| Original Frame: Container A -> Container B       |
+--------------------------------------------------+
```

### Step 5: Transmission and Decapsulation

1. Packet travels over the underlay network
2. Node 2 receives it on UDP port 4789
3. VXLAN interface decapsulates and extracts the inner frame
4. Bridge delivers the frame to Container B

## Encrypted Overlay Networks

Docker Swarm also supports encrypted overlay networks using IPsec:

```bash
docker network create --driver overlay --opt encrypted secure-overlay
```

This adds an IPsec ESP layer between the UDP and VXLAN headers, providing encryption for all traffic on that network. Key exchange is handled automatically using the swarm's PKI infrastructure.

## Troubleshooting Tips

### Checking VXLAN Interface Status

```bash
# Enter the network namespace
docker run --rm -it --net=host --pid=host --privileged \
    nicolaka/netshoot nsenter -t 1 -n

# List VXLAN interfaces
ip -d link show type vxlan
```

### Verifying FDB Entries

```bash
# Check if remote MAC addresses are in FDB
bridge fdb show dev vxlan0 | grep -v permanent
```

### Monitoring Gossip Traffic

```bash
# Capture gossip traffic (default port 7946)
tcpdump -i eth0 port 7946
```

### Common Issues

- **MTU problems**: VXLAN adds 50 bytes of overhead. Ensure your underlay MTU accounts for this
- **Firewall rules**: Ports 4789 (VXLAN), 7946 (gossip), and 2377 (cluster management) must be open
- **Clock skew**: Gossip protocol can be affected by significant time differences between nodes

## Conclusion

Docker Swarm's use of VXLAN provides a elegant solution for multi-host container networking. By combining kernel-level VXLAN with a gossip-based control plane for FDB synchronization, Swarm delivers:

- **Scalability**: No dependence on multicast infrastructure
- **Simplicity**: Automatic MAC learning and distribution
- **Performance**: Direct host-to-host communication once FDB is populated
- **Security**: Optional IPsec encryption for sensitive workloads

Understanding these internals helps when debugging network issues and optimizing your Swarm deployments for production workloads.
