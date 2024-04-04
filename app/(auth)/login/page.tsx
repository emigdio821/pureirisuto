import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

import { siteConfig } from '@/config/site'
import { authOptions } from '@/lib/auth'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { LoginForm } from '@/components/login/form'

// import { SignInOptions } from '@/components/login/signin-opts'

// const isProd = process.env.NODE_ENV === 'production'

export default async function LoginPage() {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect('/app')
  }

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle>
          <Button asChild variant="unstyledWithHover" className="text-2xl font-bold">
            <Link href="/">{siteConfig.name}</Link>
          </Button>
        </CardTitle>
        <CardDescription>Welcome back, start managing your playlists.</CardDescription>
      </CardHeader>
      {/* <CardContent>{isProd ? <SignInOptions /> : <LoginForm />}</CardContent> */}
      <CardContent>{<LoginForm />}</CardContent>
    </Card>
  )
}
