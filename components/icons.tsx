import { cn } from '@/lib/utils'
import styles from '@/styles/spinner.module.css'

interface SpinnerProps {
  className?: string
  barsClassName?: string
}

type IconProps = React.HTMLAttributes<SVGElement>

export function Spinner({ className, barsClassName }: SpinnerProps) {
  return (
    <div className={cn('h-4 w-4', className)}>
      <div className="relative left-1/2 top-1/2 h-[inherit] w-[inherit]">
        {Array.from(Array(12).keys()).map((n) => (
          <div
            key={`spinner-bar-${n}`}
            className={cn(
              'animate-spinner absolute -left-[10%] -top-[3.9%] h-[8%] w-[24%] rounded-[6px] bg-foreground',
              styles['spinner-bar'],
              barsClassName,
            )}
          />
        ))}
      </div>
    </div>
  )
}

export function GithubIcon(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <g
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
      >
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5c.08-1.25-.27-2.48-1-3.5c.28-1.15.28-2.35 0-3.5c0 0-1 0-3 1.5c-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5c-.39.49-.68 1.05-.85 1.65c-.17.6-.22 1.23-.15 1.85v4"></path>
        <path d="M9 18c-4.51 2-5-2-7-2"></path>
      </g>
    </svg>
  )
}
