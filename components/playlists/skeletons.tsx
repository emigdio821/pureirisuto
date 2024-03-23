import { Skeleton } from '@/components/ui/skeleton'
import { Spinner } from '@/components/icons'

export function TableSkeleton() {
  return (
    <div className="flex flex-col py-4">
      <h2 className="mb-4 text-xl font-semibold">
        <Skeleton className="h-7 w-20" />
      </h2>
      <div className="flex h-full items-center justify-center rounded-md border">
        <Spinner />
      </div>
    </div>
  )
}
