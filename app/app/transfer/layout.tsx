import type { Metadata } from 'next'

interface TransferLayoutProps {
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: 'Transfer',
}

export default function TransferLayout({ children }: Readonly<TransferLayoutProps>) {
  return <>{children}</>
}
