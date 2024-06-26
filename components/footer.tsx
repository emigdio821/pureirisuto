import { siteConfig } from '@/config/site'
import { Separator } from '@/components/ui/separator'
import { ThemeToggler } from '@/components/theme-toggler'

export function Footer() {
  return (
    <footer className="container mt-auto flex items-center justify-center gap-2 p-4">
      <span className="flex h-5 items-center gap-2 text-sm">
        <span className="font-semibold">{new Date().getFullYear()}</span>
        <Separator orientation="vertical" />
        {siteConfig.name}
        <Separator orientation="vertical" />
        <ThemeToggler />
      </span>
    </footer>
  )
}
