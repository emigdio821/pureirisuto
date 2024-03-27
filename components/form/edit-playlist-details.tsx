import { zodResolver } from '@hookform/resolvers/zod'
import { ImageUpIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import type { z } from 'zod'

import { editPlaylistSchema } from '@/lib/schemas/form'
import { useStore } from '@/lib/store'
import type { PlaylistItem } from '@/hooks/use-playlists'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

import { Spinner } from '../icons'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

interface EditPLaylistDetailsProps {
  playlist: PlaylistItem
  closeDialog: () => void
}

export function EditPlaylistDetails({ playlist, closeDialog }: EditPLaylistDetailsProps) {
  const spotifySdk = useStore((state) => state.spotifySdk)

  const form = useForm<z.infer<typeof editPlaylistSchema>>({
    resolver: zodResolver(editPlaylistSchema),
    defaultValues: {
      title: playlist.name,
      description: playlist.description,
      isPublic: playlist.public,
    },
  })

  async function onSubmit(values: z.infer<typeof editPlaylistSchema>) {
    try {
      await spotifySdk?.playlists.changePlaylistDetails(playlist.id, {
        name: values.title,
        description: values.description,
        public: values.isPublic,
      })
      closeDialog()
      toast.success('Playlist updated', {
        description: 'Updated details may take some time to get reflected',
      })
    } catch (err) {
      toast.error('Something went wrong, try again')
      console.log('[EDIT_PLAYLIST_ERR]', err)
    }
  }

  console.log(form.getValues())

  return (
    <Form {...form}>
      <div className="relative h-28 w-28">
        <Avatar className="h-28 w-28 rounded-md">
          <AvatarImage alt="Playlist image" src={playlist.images[0].url} />
          <AvatarFallback className="rounded-md" />
        </Avatar>
        <Button
          size="icon"
          type="button"
          variant="outline"
          className="absolute -bottom-1 -right-1 shadow-lg"
        >
          <ImageUpIcon className="h-4 w-4" />
        </Button>
      </div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder={playlist.name} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  className="h-32 resize-none"
                  placeholder={playlist.description}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isPublic"
          render={({ field }) => (
            <FormItem>
              <div className="my-2 flex items-center gap-2">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel className="m-0">Set privacy as public</FormLabel>
              </div>
            </FormItem>
          )}
        />
        <Button type="submit" disabled={form.formState.isSubmitting}>
          Update
          {form.formState.isSubmitting && (
            <Spinner className="ml-2" barsClassName="bg-background" />
          )}
        </Button>
      </form>
    </Form>
  )
}
