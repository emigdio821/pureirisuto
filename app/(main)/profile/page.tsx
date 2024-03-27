import React from 'react'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/lib/auth'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ImgPlaceholder } from '@/components/img-placeholder'
import { ProfileCardContent } from '@/components/profile/card-content'

export default async function ProfilePage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login')
  }

  const user = session.user

  return (
    <>
      <Card className="mx-auto w-full max-w-sm">
        <CardHeader>
          <Avatar className="mb-2 h-20 w-20 rounded-lg">
            <AvatarImage alt="user avatar" src={user?.image ?? ''} />
            <AvatarFallback asChild className="rounded-lg">
              <ImgPlaceholder />
            </AvatarFallback>
          </Avatar>
          <CardTitle>{user?.name}</CardTitle>
          <CardDescription>{user?.email}</CardDescription>
        </CardHeader>
        <ProfileCardContent />
      </Card>
    </>
  )
}
