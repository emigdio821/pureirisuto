import type { AlertDialogProps } from '@radix-ui/react-alert-dialog'

import { Spinner } from './icons'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog'

type AlertConfirmProps = {
  title?: React.ReactNode
  description?: React.ReactNode
  action?: () => void
  trigger?: React.ReactNode
  isActionLoading?: boolean
} & AlertDialogProps

export function AlertConfirm(props: AlertConfirmProps) {
  const { title, description, action, trigger, isActionLoading } = props

  return (
    <AlertDialog {...props}>
      {trigger && <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title ?? 'Are you sure?'}</AlertDialogTitle>
          {description && <AlertDialogDescription>{description}</AlertDialogDescription>}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          {action && (
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault()
                action()
              }}
              disabled={isActionLoading}
            >
              Continue
              {isActionLoading && <Spinner className="ml-2" barsClassName="bg-background" />}
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
