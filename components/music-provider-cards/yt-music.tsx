import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { YTMusicIcon } from '@/components/icons'

export function YTMusicProviderCard() {
  return (
    <Card className="w-80">
      <CardHeader>
        <span className="flex items-center">
          <YTMusicIcon className="mr-2 h-5 w-5" />
          <CardTitle>Youtube Music</CardTitle>
        </span>
        <CardDescription>Connect your Youtube Music account</CardDescription>
      </CardHeader>
      <CardContent>
        <Button asChild>
          <Link href="#">Connect</Link>
        </Button>
      </CardContent>
    </Card>
  )
}
