'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import Login from '@/components/ui/login'
import { useAdminAuth } from '@/context/admin_login'
import { useEmailAuth } from '@/context/auth_context'

function Page() {
  const router = useRouter()

  const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL

  const { setLoginStatus } = useAdminAuth()
  const { setEmail } = useEmailAuth()

  const handleLogin = async (credentials: { email: string; password: string; userType: 'admin' | 'employee' }) => {
    if (credentials.userType !== 'admin') {
      console.error('Only admin login is allowed.')
      return
    }

    try {
      const response = await fetch(`${backendURL}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        alert(`Login failed: ${errorData.error}`)
        return
      }

      const data = await response.json()
      console.log('Admin logged in successfully:', data)

      localStorage.setItem('adminData', JSON.stringify(data))

      setEmail(credentials.email)
      setLoginStatus(true)

      router.push('/admin/secure_route')
    } catch (error) {
      console.error('Error during login:', error)
      alert('An error occurred. Please try again later.')
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
