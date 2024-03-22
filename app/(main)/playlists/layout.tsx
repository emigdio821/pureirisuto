import type { Metadata } from 'next'

interface PlaylistsLayoutProps {
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: 'Playlists',
}

export default function PlaylistsLayout({ children }: Readonly<PlaylistsLayoutProps>) {
  return <>{children}</>
}
