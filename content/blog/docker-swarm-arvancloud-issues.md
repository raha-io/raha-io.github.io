---
title: "Docker Swarm in ArvanCloud is not going to save you"
date: "2026-01-02"
description: "Our journey debugging mysterious connection timeouts on Docker Swarm overlay networks in ArvanCloud, and why we ended up bypassing the overlay entirely."
---

After spending considerable time understanding the elegance of Docker Swarm's VXLAN-based overlay networking, we were excited to deploy our microservices architecture on ArvanCloud. What followed was weeks of debugging mysterious connection timeouts that taught us a valuable lesson: understanding how something *should* work doesn't mean it *will* work in your environment.

## The Setup

We had a straightforward Docker Swarm cluster running on ArvanCloud's infrastructure:

- 3 manager nodes
- 5 worker nodes
- Multiple services communicating over an overlay network
- Docker Engine v28

Everything looked perfect on paper. Services were deployed, health checks passed, and the cluster reported healthy status across all nodes.

## The Problem

Then the timeouts started.

```text
Error: connect ETIMEDOUT 10.0.1.15:8080
    at TCPConnectWrap.afterConnect [as oncomplete]
```

Services on one node couldn't reliably reach services on other nodes through the overlay network. The failures were intermittent—sometimes requests worked fine, sometimes they hung for 30 seconds before timing out.

### What We Observed

- **Inconsistent failures**: The same request might succeed, then fail, then succeed again
- **Cross-node only**: Services on the same node communicated perfectly
- **No packet loss on underlay**: `ping` between hosts worked flawlessly
- **VXLAN interface was up**: Everything looked healthy in the network namespace

```bash
# This worked fine
ping 192.168.1.11  # Underlay IP

# This was unreliable
docker exec service-a curl http://service-b:8080/health
# Sometimes: {"status": "ok"}
# Sometimes: curl: (28) Connection timed out
```

## The Debugging Journey

We dove deep into the networking stack, armed with our knowledge of how VXLAN and FDB synchronization should work.

### Checking FDB Entries

```bash
nsenter --net=/var/run/docker/netns/1-xyz123 bridge fdb show dev vxlan0
```

FDB entries looked correct. MAC addresses were mapped to the right VTEPs.

### Capturing VXLAN Traffic

```bash
tcpdump -i eth0 port 4789 -nn
```

We could see encapsulated packets leaving the source node. Sometimes we'd see them arrive at the destination. Sometimes we wouldn't.

### Verifying Gossip Protocol

```bash
tcpdump -i eth0 port 7946
```

Gossip traffic was flowing. Nodes were communicating. The control plane seemed healthy.

### Checking for MTU Issues

VXLAN adds 50 bytes of overhead. We verified MTU settings:

```bash
ip link show eth0      # MTU 1500
ip link show vxlan0    # MTU 1450
```

Looked correct. We even tried lowering the MTU further—no improvement.

### Inspecting iptables Rules

```bash
iptables -L -n -v
iptables -t nat -L -n -v
```

Firewall rules looked fine. Required ports (4789, 7946, 2377) were open.

## The Suspects

We narrowed it down to two possibilities:

### 1. ArvanCloud's Network Infrastructure

Cloud providers often have their own network virtualization layers. ArvanCloud uses SDN (Software-Defined Networking) for their infrastructure. We suspected potential issues with:

- **Nested encapsulation**: VXLAN inside ArvanCloud's own overlay
- **UDP packet handling**: Some cloud networks don't handle UDP traffic as reliably as TCP
- **Security groups or hidden firewalls**: Intermittently dropping VXLAN packets
- **MTU issues at the infrastructure level**: Path MTU discovery failing silently

We opened tickets with ArvanCloud support but couldn't get definitive answers about their underlying network architecture.

### 2. Docker Engine v28 Changes

Docker Engine v28 introduced several networking changes. We considered:

- **libnetwork updates**: Changes to the gossip protocol or FDB management
- **Kernel module interactions**: Different behavior with newer kernel versions
- **Race conditions**: Timing issues in the control plane

We tested with Docker Engine v27—same issues. This pointed more toward the infrastructure.

## The Verdict: Inconclusive

After weeks of debugging, we couldn't definitively prove whether the issue was:

- ArvanCloud's SDN not playing well with VXLAN encapsulation
- Docker Engine v28 having bugs in certain network configurations
- Some combination of both
- Something else entirely we hadn't considered

The intermittent nature of the failures made it nearly impossible to capture a "smoking gun."

## The Solution: Bypass the Overlay

Eventually, we made a pragmatic decision: **stop fighting the overlay network**.

Instead of relying on Docker's overlay networking for service-to-service communication, we:

### 1. Exposed Service Ports Directly

```yaml
services:
  api-gateway:
    image: our-api:latest
    ports:
      - target: 8080
        published: 8080
        mode: host  # Bypass ingress routing
    deploy:
      mode: global
```

### 2. Used Host Networking for Critical Services

```yaml
services:
  message-broker:
    image: rabbitmq:3-management
    network_mode: host
    deploy:
      placement:
        constraints:
          - node.hostname == broker-node
```

### 3. Implemented Service Discovery via DNS

Instead of relying on Docker's internal DNS, we set up external service discovery:

```yaml
services:
  app:
    environment:
      - SERVICE_B_HOST=192.168.1.12
      - SERVICE_B_PORT=8080
```

For more dynamic setups, we used Consul for service registration and discovery.

### 4. Direct Host-to-Host Communication

Services now communicate over the underlay network using host IPs:

```text
Before (Overlay):
Container A (10.0.1.2) --[VXLAN]--> Container B (10.0.1.3)
                         TIMEOUT!

After (Direct):
Container A --[port 8080]--> Host A (192.168.1.10:8080)
            --[underlay]---> Host B (192.168.1.11:8080)
            --[port 8080]--> Container B
                         SUCCESS!
```

## Trade-offs

This approach has downsides:

- **Lost network isolation**: Services are exposed on host ports
- **Port management complexity**: Need to track which ports are used where
- **Manual service discovery**: Docker's automatic DNS doesn't help us anymore
- **Security considerations**: More attack surface with exposed ports

But it also has benefits:

- **It actually works**: Reliable communication is worth the trade-offs
- **Simpler debugging**: Standard networking tools work without namespace gymnastics
- **Better performance**: No encapsulation overhead
- **Predictable behavior**: No mysterious timeouts

## Lessons Learned

### 1. Cloud Environments Are Not Created Equal

What works perfectly on bare metal or AWS might fail mysteriously on another provider. Cloud SDN layers add complexity that's often invisible to users.

### 2. Elegant Solutions Aren't Always Practical

Docker Swarm's overlay networking is beautifully designed. Understanding VXLAN and FDB synchronization is intellectually satisfying. But when it doesn't work in your environment, elegance means nothing.

### 3. Know When to Pivot

We spent weeks debugging. At some point, the sunk cost fallacy kicks in. Recognizing when to abandon a problematic approach and find a workaround is a valuable skill.

### 4. Document Your Failures

This blog post exists because we want others to know: if you're experiencing similar issues on ArvanCloud (or similar providers) with Docker Swarm overlay networks, you're not alone. And there's a working alternative.

## Conclusion

Docker Swarm's overlay networking is a powerful feature—when it works. In our ArvanCloud deployment, the combination of their network infrastructure and Docker Engine v28 created an environment where overlay networks were unreliable.

Rather than continuing to fight an unwinnable battle, we bypassed the overlay entirely. Our services now communicate directly over the underlay network using exposed ports. It's less elegant, but it's reliable.

If you're deploying Docker Swarm on ArvanCloud, be prepared for potential overlay network issues. Have a fallback plan ready, and don't be afraid to abandon the "right" way of doing things in favor of the "working" way.

Sometimes the best solution is the one that actually works.
