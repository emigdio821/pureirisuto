'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

import { TooltipProvider } from '@/components/ui/tooltip'

interface ProvidersProps {
  children: React.ReactNode
}

const queryClient = new QueryClient()

export function Providers({ children }: ProvidersProps) {
  return (
    <NextThemesProvider
      enableSystem
      attribute="class"
      defaultTheme="system"
      disableTransitionOnChange
    >
      <QueryClientProvider client={queryClient}>
        <TooltipProvider delayDuration={300}>{children}</TooltipProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </NextThemesProvider>
  )
}
