'use client'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Building2, ChevronRight, UserCircle } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { ReactNode } from 'react'

interface LoginOptionProps {
  icon: LucideIcon
  title: string
  description: string
  href: string
}

function LoginOption({ icon: Icon, title, description, href }: LoginOptionProps) {
  return (
    <Button onClick={() => (window.location.href = href)} className="w-full h-20 text-lg justify-between group bg-card hover:bg-accent" variant="ghost">
      <div className="flex items-center space-x-4">
        <div className="p-2 rounded-lg bg-primary/10">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <div className="flex flex-col items-start">
          <span className="font-semibold">{title}</span>
          <span className="text-sm text-muted-foreground">{description}</span>
        </div>
      </div>
      <ChevronRight className="h-5 w-5 text-muted-foreground" />
    </Button>
  )
}

function PageContainer({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 blur-3xl -z-10" />
        {children}
      </div>
    </div>
  )
}

function LoginHeader() {
  return (
    <div className="text-center space-y-2">
      <div className="flex items-center justify-center mb-6">
        <Building2 className="h-12 w-12 text-primary" />
      </div>
      <h1 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">Welcome Back</h1>
      <p className="text-muted-foreground">Please select your login type to continue</p>
    </div>
  )
}

function LoginOptions() {
  return (
    <Card className="p-6 space-y-4 shadow-lg backdrop-blur-sm bg-card/50">
      <LoginOption icon={Building2} title="Admin Portal" description="System administration and management" href="/admin" />
      <LoginOption icon={UserCircle} title="Employee Portal" description="Access your employee dashboard" href="/employee" />
    </Card>
  )
}

function Footer() {
  return (
    <footer className="text-center text-sm text-muted-foreground">
      <p>© {new Date().getFullYear()} VRV Security. All rights reserved.</p>
    </footer>
  )
}

function App() {
  return (
    <PageContainer>
      <LoginHeader />
      <LoginOptions />
      <Footer />
    </PageContainer>
  )
}

export default App
