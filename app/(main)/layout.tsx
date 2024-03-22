import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/lib/auth'
import { DesktopUserSidebar } from '@/components/user-sidebar'
import { MobileUserSidebar } from '@/components/user-sidebar/mobile'

interface MainLayoutProps {
  children: React.ReactNode
}

export default async function MainLayout({ children }: MainLayoutProps) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login')
  }

  return (
    <section>
      <div className="sm:border-b">
        <MobileUserSidebar session={session} />
        <div className="container gap-4 sm:grid sm:grid-cols-[200px_minmax(0,1fr)]">
          <DesktopUserSidebar session={session} />
          {children}
        </div>
      </div>
    </section>
  )
}
