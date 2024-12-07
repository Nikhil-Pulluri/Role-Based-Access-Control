'use client'

import React, { useEffect, useState } from 'react'
import { useEmployeeAuth } from '@/context/employee_context'
import { ChangePasswordDialog } from '@/app/admin/secure_route/adminthings/changePassword'

interface Employee {
  _id: string
  name: string
  role: string
  email: string
  accessStatus: 'Granted' | 'Denied'
}

export function EmployeeDetails() {
  const { email } = useEmployeeAuth()
  const [employee, setEmployee] = useState<Employee | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  console.log(email)

  useEffect(() => {
    if (!email) {
      setError('No email provided')
      setLoading(false)
      return
    }

    // Fetch employee details based on the email from context
    fetch(`http://localhost:5000/api/employees/email/${email}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch employee details')
        }
        return response.json()
      })
      .then((data) => {
        setEmployee(data || null) // Explicitly set `null` if no data
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [email])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>
  if (!employee) return <p>No employee details found.</p>

  return (
    <div className="w-full max-w-2xl rounded-lg border p-6 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center">
          <span className="text-xl font-bold">{employee.name[0]}</span>
        </div>
        <div>
          <h2 className="text-xl font-bold">{employee.name}</h2>
          <p className="text-sm text-gray-600">{employee.role}</p>
        </div>
      </div>
      <div className="mt-6">
        <p>
          <strong>Email:</strong> {employee.email}
        </p>
        <p>
          <strong>Access Status:</strong> {employee.accessStatus}
        </p>
      </div>

      <div>
        <ChangePasswordDialog employeeId={employee._id} />
      </div>
    </div>
  )
}
