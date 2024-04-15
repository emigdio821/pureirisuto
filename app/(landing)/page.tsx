import Link from 'next/link'
import { ChevronRightIcon, ListMusicIcon } from 'lucide-react'
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
import { AppleMusicIcon, GithubIcon, SpotifyIcon, YTMusicIcon } from '@/components/icons'
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
              <UserMenu session={session} />
            ) : (
              <Button asChild className="rounded-full">
                <Link href="/login">Log in</Link>
              </Button>
            )}
          </div>
        </div>
      </header>

      <section className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-14 sm:py-28">
          <div className="flex flex-col items-center justify-center gap-2 text-center">
            <ListMusicIcon className="size-8 text-muted-foreground" />
            <h2 className="text-4xl font-black sm:text-5xl">Simple playlist manager</h2>
            <p className="text-lg leading-tight text-muted-foreground">
              A basic solution to help you to manage all your playlists across music
              providers.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button asChild className="rounded-full">
                <Link href="/app">
                  {session ? 'Go to app' : 'Get started'}
                  <ChevronRightIcon className="ml-2 size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-indigo-500 to-indigo-100 opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
      </section>

      <section className="container flex w-full max-w-3xl flex-col items-center justify-center text-center">
        <div className="flex flex-col items-center gap-2 text-center">
          <h2 className="text-2xl font-extrabold sm:text-3xl">
            Transfer and manage your playlists
          </h2>
          <p className="text-muted-foreground">
            Transfer playlist between all supported music providers. Manage your playlists
            by updating the details and deleting tracks.
          </p>

          <div className="flex items-center gap-2">
            <SpotifyIcon className="size-8 text-muted-foreground" />
            <YTMusicIcon className="size-8 text-muted-foreground" />
            <AppleMusicIcon className="size-7 text-muted-foreground" />
          </div>
        </div>
      </section>

      <section className="container w-full max-w-3xl py-14 sm:py-28">
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-center text-2xl font-extrabold sm:text-3xl">
            Some questions
          </h2>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Supported music providers?</AccordionTrigger>
              <AccordionContent>
                Spotify, YouTube and Apple Music (WIP) are currently supported.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Features?</AccordionTrigger>
              <AccordionContent>
                {siteConfig.name} supports transfers between music providers. Edit
                playlist information, delete tracks from playlist and in the future add
                tracks to playlist.
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
                This project is currently free. It is only a personal project for my
                needs. This project uses the API basic version in each music provider.
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
        </div>
      </section>

      <section className="container flex w-full max-w-3xl flex-col items-center justify-center pb-4 text-center">
        <div className="flex flex-col items-center gap-2 text-center">
          <h2 className="text-2xl font-extrabold sm:text-3xl">Open Source</h2>
          <p className="mb-6 text-muted-foreground">
            The source code is available on GitHub. Feel free to read, review, or
            contribute to it.
          </p>
          <Button asChild variant="outline" className="rounded-full">
            <a href={siteConfig.links.github} target="_blank">
              <GithubIcon className="mr-2 size-4" />
              Source
            </a>
          </Button>
        </div>
      </section>
    </>
  )
}
