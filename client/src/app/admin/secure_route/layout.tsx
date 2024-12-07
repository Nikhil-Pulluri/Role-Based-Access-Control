'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAdminAuth } from '@/context/admin_login' // Import your auth context

interface LayoutProps {
  children: React.ReactNode
}

const SidebarLayout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter()
  const { isLoggedIn, setLoginStatus } = useAdminAuth() // Use auth context

  useEffect(() => {
    if (!isLoggedIn) {
      // Redirect if not logged in
      router.push('/admin')
    }
  }, [isLoggedIn, router])

  const handleLogout = () => {
    // Clear any authentication data (e.g., tokens in localStorage/sessionStorage)
    localStorage.removeItem('authToken') // Example, replace with your auth logic
    console.log('Logged out successfully.')

    // Update the auth state
    setLoginStatus(false)

    // Redirect to login page
    router.push('/admin') // Replace with your login route
  }

  // Prevent rendering layout while redirecting
  if (!isLoggedIn) {
    return null
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="grid grid-cols-6 grid-rows-5 gap-4 w-full h-[75vh] p-5">
        <aside className="col-span-1 row-span-5 bg-gray-800 text-white rounded-md p-4">
          <h1 className="text-xl font-bold mb-6">Sidebar</h1>
          <nav className="flex flex-col gap-4">
            <Link href="/" className="hover:text-blue-400">
              Employees
            </Link>
            <button onClick={handleLogout} className="text-left bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md mt-6">
              Logout
            </button>
          </nav>
        </aside>
        <main className="col-span-5 row-span-5 bg-gray-100 rounded-md p-4 overflow-auto">{children}</main>
      </div>
    </div>
  )
}

export default SidebarLayout
