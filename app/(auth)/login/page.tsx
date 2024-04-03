import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/lib/auth'
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
    redirect('/')
  }

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Start managing yout playlists</CardDescription>
      </CardHeader>
      {/* <CardContent>{isProd ? <SignInOptions /> : <LoginForm />}</CardContent> */}
      <CardContent>{<LoginForm />}</CardContent>
    </Card>
  )
}
