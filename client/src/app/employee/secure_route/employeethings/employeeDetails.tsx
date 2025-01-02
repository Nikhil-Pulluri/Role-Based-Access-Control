'use client'

import React, { useEffect, useState } from 'react'
import { useEmployeeAuth } from '@/context/employee_context'
import { ChangePasswordDialog } from '@/app/admin/secure_route/adminthings/changePassword'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Building2, Mail, Shield, UserCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface Employee {
  _id: string
  name: string
  role: string
  email: string
  accessStatus: 'Granted' | 'Denied'
}

export function EmployeeDetails() {
  const { email, setEmail } = useEmployeeAuth()
  const [employee, setEmployee] = useState<Employee | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const router = useRouter()

  const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL

  useEffect(() => {
    if (!email) {
      setError('No email provided')
      setLoading(false)
      return
    }

    fetch(`${backendURL}/api/employees/email/${email}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch employee details')
        }
        return response.json()
      })
      .then((data) => {
        setEmployee(data || null)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [email])

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    console.log('Logged out successfully.')

    setEmail('')
    router.push('/employee')
  }

  if (loading) {
    return (
      <Card className="w-full max-w-2xl p-8 animate-pulse">
        <div className="flex items-center gap-6">
          <div className="h-24 w-24 rounded-full bg-gray-200" />
          <div className="space-y-2">
            <div className="h-6 w-48 bg-gray-200 rounded" />
            <div className="h-4 w-32 bg-gray-200 rounded" />
          </div>
        </div>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="w-full max-w-2xl p-8 bg-red-50">
        <div className="text-red-600 font-medium">Error: {error}</div>
      </Card>
    )
  }

  if (!employee) {
    return (
      <Card className="w-full max-w-2xl p-8 bg-yellow-50">
        <div className="text-yellow-600 font-medium">No employee details found.</div>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-2xl">
      <div className="p-8">
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="h-24 w-24 rounded-full bg-gradient-to-br from-primary/10 to-primary/30 flex items-center justify-center">
              <span className="text-3xl font-bold text-primary">{employee.name[0]}</span>
            </div>
            <Badge className={`absolute -bottom-2 right-0 ${employee.accessStatus === 'Granted' ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'}`}>{employee.accessStatus}</Badge>
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl font-bold tracking-tight">{employee.name}</h2>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Building2 className="h-4 w-4" />
              <span>{employee.role}</span>
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-primary" />
            <span className="font-medium">Email:</span>
            <span className="text-muted-foreground">{employee.email}</span>
          </div>

          <div className="flex items-center gap-3">
            <Shield className="h-5 w-5 text-primary" />
            <span className="font-medium">Access Status:</span>
            <Badge variant={employee.accessStatus === 'Granted' ? 'default' : 'destructive'}>{employee.accessStatus}</Badge>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="flex justify-between items-center gap-4 mt-6">
          <ChangePasswordDialog employeeId={employee._id} />
          <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md">
            Logout
          </button>
        </div>
      </div>
    </Card>
  )
}
