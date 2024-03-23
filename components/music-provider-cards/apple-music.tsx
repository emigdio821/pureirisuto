// import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AppleMusicIcon } from '@/components/icons'

export function AppleMusicProviderCard() {
  return (
    <Card>
      <CardHeader>
        <span className="flex items-center">
          <AppleMusicIcon className="mr-2 h-5 w-5" />
          <CardTitle>Apple Music</CardTitle>
        </span>
        <CardDescription>Connect your Apple Music account</CardDescription>
      </CardHeader>
      <CardContent>
        <Button disabled>
          Soon
          {/* <Link href="#">Connect</Link> */}
        </Button>
      </CardContent>
    </Card>
  )
}
