interface LandingLayoutProps {
  children: React.ReactNode
}

export default function LandingLayout({ children }: Readonly<LandingLayoutProps>) {
  return <>{children}</>
}
