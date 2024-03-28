import type { Table } from '@tanstack/react-table'
import { Trash2Icon } from 'lucide-react'

import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Separator } from './ui/separator'

interface DataTableDeleteRowsBtnProps<TData> {
  table: Table<TData>
}

export function DataTableDeleteRowsBtn<TData>({
  table,
}: DataTableDeleteRowsBtnProps<TData>) {
  const selectedRows = table.getFilteredSelectedRowModel().rows

  return (
    <>
      {selectedRows.length > 0 ? (
        <Button type="button" variant="outline">
          <Trash2Icon className="mr-2 h-4 w-4" />
          Delete
          <Separator orientation="vertical" className="mx-2 h-4" />
          <Badge variant="secondary" className="rounded-sm">
            {selectedRows.length}
          </Badge>
        </Button>
      ) : null}
    </>
  )
}
