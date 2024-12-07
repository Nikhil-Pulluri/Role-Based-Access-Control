'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAdminAuth } from '@/context/admin_login' // Import your auth context
import { ChangePasswordDialog } from './adminthings/changePassword'
import { useEmailAuth } from '@/context/auth_context'

interface LayoutProps {
  children: React.ReactNode
}

const SidebarLayout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter()
  const { isLoggedIn, setLoginStatus } = useAdminAuth() // Use auth context
  const { email } = useEmailAuth() // Get email from the auth context
  const [employeeDetails, setEmployeeDetails] = useState<any>(null) // State to store employee details
  const [loading, setLoading] = useState<boolean>(true) // Loading state to manage the fetching process

  useEffect(() => {
    if (!isLoggedIn) {
      // Redirect if not logged in
      router.push('/admin')
    }
  }, [isLoggedIn, router])

  useEffect(() => {
    // Fetch employee details by email when email is available
    const fetchEmployeeDetails = async () => {
      if (email) {
        try {
          const response = await fetch(`http://localhost:5000/api/employees/email/${email}`)
          if (!response.ok) {
            throw new Error('Failed to fetch employee details')
          }
          const data = await response.json()
          setEmployeeDetails(data)
        } catch (error) {
          console.error('Error fetching employee details:', error)
        } finally {
          setLoading(false)
        }
      }
    }

    fetchEmployeeDetails()
  }, [email])

  const handleLogout = () => {
    // Clear any authentication data (e.g., tokens in localStorage/sessionStorage)
    localStorage.removeItem('authToken') // Example, replace with your auth logic
    console.log('Logged out successfully.')

    // Update the auth state
    setLoginStatus(false)

    // Redirect to login page
    router.push('/admin') // Replace with your login route
  }

  // Prevent rendering layout while redirecting or loading employee data
  if (!isLoggedIn || loading) {
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
            <div className="text-black">
              {employeeDetails && (
                <p>
                  Welcome, {employeeDetails.name} ({employeeDetails.role})
                </p>
              )}
              {/* Pass employeeId directly as a prop to ChangePasswordDialog */}
              {employeeDetails && employeeDetails._id && <ChangePasswordDialog employeeId={employeeDetails._id} />}
            </div>
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
