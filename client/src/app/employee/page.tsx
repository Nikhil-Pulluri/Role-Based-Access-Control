'use client'
import React, { useState } from 'react'
import Login from '@/components/ui/login'
import { useEmployeeAuth } from '@/context/employee_context'
import { useRouter } from 'next/navigation'

function Page() {
  const [error, setError] = useState<string | null>(null)
  const { setEmail } = useEmployeeAuth()
  const router = useRouter()

  const handleLogin = async (credentials: { email: string; password: string; userType: 'admin' | 'employee' }) => {
    if (credentials.userType !== 'employee') {
      console.error('Only employee login is allowed.')
      return
    }

    try {
      const response = await fetch('http://localhost:5000/api/employees/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        setError(errorData.error || 'An error occurred')
        return
      }

      const data = await response.json()
      console.log('Employee logged in successfully:', data)

      localStorage.setItem('employeeData', JSON.stringify(data))

      setEmail(credentials.email)
      router.push('employee/secure_route')
    } catch (error) {
      console.error('Error during login:', error)
      setError('An error occurred. Please try again later.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md">
        <Login onLogin={handleLogin} usertype={'employee'} />
        {error && <div className="mt-4 text-red-500">{error}</div>}
      </div>
    </div>
  )
}

export default Page
