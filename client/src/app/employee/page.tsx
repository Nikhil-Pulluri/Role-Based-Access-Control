import React from 'react'
import Login from '@/components/ui/login'

function page() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Login onLogin={function (credentials: { email: string; password: string; userType: 'admin' | 'employee' }): void {
        throw new Error('Function not implemented.')
      } } />
    </div>
  )
}

export default page
