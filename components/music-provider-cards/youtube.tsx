import { useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { CircleAlertIcon } from 'lucide-react'
import { toast } from 'sonner'

import { useGoogleProfile } from '@/hooks/use-google-profile'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { AlertConfirm } from '@/components/alert-confirm'
import { YTMusicIcon } from '@/components/icons'
import { ImgPlaceholder } from '@/components/img-placeholder'

const provider = 'YouTube'

export function YouTubeProviderCard() {
  const [loading, setLoading] = useState(false)
  const [alertOpen, setAlertOpen] = useState(false)
  const { data, error, isLoading, refetch } = useGoogleProfile()

  async function handleDisconnect() {
    try {
      setLoading(true)
      await axios.post('/api/youtube/disconnect')
      await refetch()
      setAlertOpen(false)
      toast.success(`Disconnected from ${provider}`)
    } catch (err) {
      console.log('[YT_MUSIC_DISCONNECT_ERR]', err)
    } finally {
      setLoading(false)
    }
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <span className="flex items-center">
            <Skeleton className="mr-2 h-5 w-5 rounded-full" />
            <Skeleton className="h-5 w-2/4" />
          </span>
          <div>
            <Skeleton className="h-5 w-3/4" />
          </div>
        </CardHeader>
        <CardContent className="flex h-full flex-col">
          <Skeleton className="h-10 w-[86px]" />
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardContent className="flex h-full flex-col items-center justify-between gap-2 p-4">
          <div className="flex flex-col items-center justify-center gap-2">
            <CircleAlertIcon className="h-5 w-5" />
            <p className="text-sm">{error.message}</p>
          </div>
          <Button
            className="w-full"
            onClick={() => {
              void refetch()
            }}
          >
            Reload
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (!data) {
    return (
      <Card>
        <CardHeader>
          <span className="flex items-center">
            <YTMusicIcon className="mr-2 h-5 w-5" />
            <CardTitle>{provider}</CardTitle>
          </span>
          <CardDescription>Connect your {provider} account</CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild>
            <Link href="/api/youtube/connect">Connect</Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <AlertConfirm
        open={alertOpen}
        isActionLoading={loading}
        onOpenChange={(opened) => {
          if (!loading) {
            setAlertOpen(opened)
          }
        }}
        description={`You are about to disconnect your ${provider} account`}
        action={() => {
          void handleDisconnect()
        }}
      />

      <Card>
        <CardHeader>
          <span className="flex items-center">
            <YTMusicIcon className="mr-2 h-5 w-5" />
            <CardTitle>{provider}</CardTitle>
          </span>
          <div>
            <Badge variant="outline">Connected</Badge>
          </div>
        </CardHeader>
        <CardContent className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage alt="user avatar" src={data.picture ?? ''} />
            <AvatarFallback asChild>
              <ImgPlaceholder />
            </AvatarFallback>
          </Avatar>
          <span className="flex flex-col items-start">
            <span className="text-sm font-semibold">{data.name}</span>
            <Button
              variant="link"
              className="text-xs"
              onClick={() => {
                setAlertOpen(true)
              }}
            >
              Disconnect
            </Button>
          </span>
        </CardContent>
      </Card>
    </>
  )
}
