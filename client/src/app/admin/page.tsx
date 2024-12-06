'use client'
import React from 'react'
import Login from '@/components/ui/login'

function page() {
  const handleLogin = (credentials: { email: string; password: string; userType: 'admin' | 'employee' }) => {
    console.log(credentials)
  }
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Login onLogin={handleLogin} />
    </div>
  )
}

export default page
