import type { Session } from 'next-auth'

import { SidebarContent } from './content'

export function DesktopUserSidebar({ session }: { session: Session }) {
  return (
    <>
      <aside className="fixed top-0 z-50 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 border-r p-4 pl-0 sm:sticky sm:flex sm:flex-col">
        <SidebarContent session={session} />
      </aside>
    </>
  )
}
