import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Raha IO',
  description: 'Strategy + Product + Engineering',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
