'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import Login from '@/components/ui/login'
import { useAdminAuth } from '@/context/admin_login'
import { useEmailAuth } from '@/context/auth_context'

function Page() {
  const router = useRouter()

  const { setLoginStatus } = useAdminAuth()
  const { setEmail } = useEmailAuth()

  const handleLogin = async (credentials: { email: string; password: string; userType: 'admin' | 'employee' }) => {
    if (credentials.userType !== 'admin') {
      console.error('Only admin login is allowed.')
      return
    }

    try {
      const response = await fetch('http://localhost:5000/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        alert(`Login failed: ${errorData.error}`) // Display error to the user
        return
      }

      const data = await response.json()
      console.log('Admin logged in successfully:', data)

      // Optionally store user data (like a token) in localStorage or cookies
      localStorage.setItem('adminData', JSON.stringify(data))

      setEmail(credentials.email)
      setLoginStatus(true)

      // Redirect to the secure admin route
      router.push('/admin/secure_route')
    } catch (error) {
      console.error('Error during login:', error)
      alert('An error occurred. Please try again later.') // Notify user of general error
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-6 shadow-lg rounded-md bg-white">
        <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
        <Login onLogin={handleLogin} usertype="admin" />
      </div>
    </div>
  )
}

export default Page
