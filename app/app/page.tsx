import { MusicProviderCards } from '@/components/music-provider-cards'

export default async function MainPage() {
  // const session = await getServerSession(authOptions)

  // if (!session) {
  //   redirect('/login')
  // }

  return (
    <>
      <div>
        <h3 className="text-2xl font-bold tracking-tight">Connect music providers</h3>
        <p className="text-sm text-muted-foreground">
          Connect your music providers, and start transfering, creating and updating your playlists.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <MusicProviderCards />
      </div>
    </>
  )
}
