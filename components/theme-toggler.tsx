'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

export function ThemeToggler() {
  const { setTheme, resolvedTheme } = useTheme()

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          size="sm"
          type="button"
          variant="ghost"
          className="h-6 w-6"
          aria-label="Toggle theme"
          onClick={() => {
            setTheme(resolvedTheme === 'light' ? 'dark' : 'light')
          }}
        >
          <AnimatePresence initial={false} mode="wait">
            <motion.span key={resolvedTheme} animate={{ rotate: 0 }} initial={{ rotate: 90 }}>
              <SunIcon className="hidden h-3.5 w-3.5 dark:block" />
              <MoonIcon className="block h-3.5 w-3.5 dark:hidden" />
            </motion.span>
          </AnimatePresence>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <span>Toggle theme</span>
      </TooltipContent>
    </Tooltip>
  )
}
