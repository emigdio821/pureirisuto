import { useRef } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { decode } from 'html-entities'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import type { z } from 'zod'

import { editPlaylistSchema } from '@/lib/schemas/form'
import { useStore } from '@/lib/store'
import { resizeImageToMaxSizeBase64 } from '@/lib/utils'
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
  setLoading: (loading: boolean) => void
}

export function EditPlaylistDetails(props: EditPLaylistDetailsProps) {
  const { playlist, closeDialog, setLoading } = props
  const spotifySdk = useStore((state) => state.spotifySdk)
  const decodedDescription = decode(playlist.description)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const form = useForm<z.infer<typeof editPlaylistSchema>>({
    resolver: zodResolver(editPlaylistSchema),
    defaultValues: {
      title: playlist.title,
      description: decodedDescription,
      isPublic: playlist.isPublic,
      cover: '',
    },
  })

  async function handleCoverImg(img: File) {
    if (!img.type.includes('image/')) {
      if (fileInputRef.current) fileInputRef.current.value = ''
      form.setValue('cover', '', { shouldDirty: true, shouldValidate: true })
      toast.error('Invalid image')
      return
    }
    toast.promise(resizeImageToMaxSizeBase64(img, 250), {
      loading: 'Processing image...',
      success: (data) => {
        if (data) {
          const base64String = data.replace(/^data:image\/(png|jpeg);base64,/, '')
          form.setValue('cover', base64String, {
            shouldDirty: true,
            shouldValidate: true,
          })
        }
        return 'Image looks good'
      },
      error: () => {
        form.setValue('cover', '', { shouldDirty: true, shouldValidate: true })
        return 'We could not process this image, try again'
      },
    })
  }

  async function updateSpotifyPLaylist(values: z.infer<typeof editPlaylistSchema>) {
    await spotifySdk?.playlists.changePlaylistDetails(playlist.id, {
      name: values.title,
      description: values.description,
      public: values.isPublic,
    })
    if (values.cover) {
      await spotifySdk?.playlists.addCustomPlaylistCoverImageFromBase64String(
        playlist.id,
        values.cover,
      )
    }
  }

  async function onSubmit(values: z.infer<typeof editPlaylistSchema>) {
    setLoading(true)
    try {
      console.log(values)
      if (playlist.provider === 'Spotify') {
        await updateSpotifyPLaylist(values)
      }
      closeDialog()
      toast.success('Playlist updated', {
        description: 'Updated details may take some time to get reflected',
      })
    } catch (err) {
      toast.error('Something went wrong, try again')
      console.log('[EDIT_PLAYLIST_ERR]', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form {...form}>
      <div className="relative h-28 w-28">
        <Avatar
          className="h-28 w-28 rounded-md"
          onClick={() => {
            fileInputRef.current?.click()
          }}
        >
          <AvatarImage alt="Playlist image" src={playlist.coverUrl} />
          <AvatarFallback className="rounded-md" />
        </Avatar>
      </div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <FormField
          control={form.control}
          name="cover"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cover</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={(e) => {
                    const file = e.target.files
                    if (file && file.length > 0) {
                      const img = file[0]
                      void handleCoverImg(img)
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder={playlist.title} {...field} />
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
                  placeholder={decodedDescription}
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
