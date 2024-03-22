import { MusicProviderCards } from '@/components/music-provider-cards'

export default async function MainPage() {
  // const session = await getServerSession(authOptions)

  // if (!session) {
  //   redirect('/login')
  // }

  return (
    <section className="py-4">
      <h2 className="text-xl font-semibold">Connect music providers</h2>
      <p className="mb-4 text-sm text-muted-foreground">
        Connect your music providers, and start transfering, creating and updating your playlists.
      </p>
      <div className="flex flex-wrap gap-4">
        <MusicProviderCards />
      </div>
    </section>
  )
}
