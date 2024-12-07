'use client'
import { AdminAuthProvider } from '@/context/admin_login'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <AdminAuthProvider>{children}</AdminAuthProvider>
}
