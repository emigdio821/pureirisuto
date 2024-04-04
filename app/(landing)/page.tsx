import Link from 'next/link'
import { ListMusicIcon } from 'lucide-react'
import { getServerSession } from 'next-auth/next'

import { siteConfig } from '@/config/site'
import { authOptions } from '@/lib/auth'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { GithubIcon } from '@/components/icons'
import { UserMenu } from '@/components/user-menu'

export default async function LandingPage() {
  const session = await getServerSession(authOptions)

  return (
    <>
      <header className="h-14">
        <div className="container flex h-full items-center justify-between">
          <span className="text-base font-bold">{siteConfig.name}</span>
          <div className="flex items-center gap-2">
            {session ? (
              <>
                <Button
                  asChild
                  variant="unstyled"
                  className="px-3 py-1 text-foreground/60 hover:text-foreground"
                >
                  <Link href="/app">Go to app</Link>
                </Button>
                <UserMenu session={session} />
              </>
            ) : (
              <Button asChild className="rounded-full">
                <Link href="/login">Log in</Link>
              </Button>
            )}
          </div>
        </div>
      </header>

      <section className="container flex w-full max-w-3xl flex-col items-center justify-center gap-6 py-14 sm:py-28">
        <ListMusicIcon className="size-8 text-muted-foreground" />
        <div className="flex flex-col items-center gap-2 text-center">
          <h2 className="text-5xl font-black">Simple playlist manager</h2>
          <p className="text-lg leading-tight text-muted-foreground">
            A basic solution to help you to manage all your playlists across music
            providers.
          </p>
        </div>
        <Button className="rounded-full">Get started</Button>
      </section>

      <section className="container flex w-full max-w-3xl flex-col items-center justify-center text-center">
        <div className="flex flex-col items-center gap-2 text-center">
          <h2 className="text-3xl font-extrabold">Transfer and manage your playlists.</h2>
          <p className="text-muted-foreground">
            Transfer playlist between all supported music providers. Manage your playlists
            by updating the details and deleting tracks.
          </p>
        </div>
      </section>

      <section className="container w-full max-w-3xl py-14 sm:py-28">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Supported music providers?</AccordionTrigger>
            <AccordionContent>
              Spotify, YouTube and Apple Music are currently supported.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Features?</AccordionTrigger>
            <AccordionContent>
              {siteConfig.name} supports transfers between music providers. Edit playlist
              information, delete tracks from playlist and in the future add tracks to
              playlist.
            </AccordionContent>
          </AccordionItem>{' '}
          <AccordionItem value="item-3">
            <AccordionTrigger>Is it safe to use?</AccordionTrigger>
            <AccordionContent>
              Absolutely, this project is open-source, you can review the code{' '}
              <Button asChild variant="link">
                <a href={siteConfig.links.github} target="_blank">
                  here
                </a>
              </Button>
              .
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>Pricing?</AccordionTrigger>
            <AccordionContent>
              This project is currently free. It is only a personal project for my needs.
              This project uses the API basic version in each music provider.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger>Can I use it for my personal needs?</AccordionTrigger>
            <AccordionContent>
              Sure!, you can fork it, and use your own API keys. Refer to the{' '}
              <Badge className="font-mono" variant="outline">
                .env.example
              </Badge>{' '}
              for more details about what env variables you need.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      <section className="container flex w-full max-w-3xl flex-col items-center justify-center pb-4 text-center">
        <div className="flex flex-col items-center gap-2 text-center">
          <h2 className="text-3xl font-extrabold">Open Source</h2>
          <p className="mb-6 text-muted-foreground">
            The source code is available on GitHub. Feel free to read, review, or
            contribute to it.
          </p>
          <Button variant="outline" className="rounded-full">
            <GithubIcon className="mr-2 size-4" />
            Star on GitHub
          </Button>
        </div>
      </section>
    </>
  )
}
