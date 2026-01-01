import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Raha IO',
  description: 'Infrastructure + DevOps + Cloud solutions on AWS, Hetzner, and Arvancloud',
  icons: {
    icon: '/icon.png',
    apple: '/icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
