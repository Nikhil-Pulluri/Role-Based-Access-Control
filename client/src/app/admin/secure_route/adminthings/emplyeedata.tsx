'use client'
import React, { useState, ChangeEvent } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'

interface Employee {
  name: string
  role: string
  email: string
  accessStatus: 'Granted' | 'Denied'
}

const initialEmployees: Employee[] = [
  {
    name: 'John Doe',
    role: 'Admin',
    email: 'john@example.com',
    accessStatus: 'Granted',
  },
  {
    name: 'Jane Smith',
    role: 'Employee',
    email: 'jane@example.com',
    accessStatus: 'Granted',
  },
  {
    name: 'Alice Brown',
    role: 'Employee',
    email: 'alice@example.com',
    accessStatus: 'Denied',
  },
  {
    name: 'Bob Johnson',
    role: 'Manager',
    email: 'bob@example.com',
    accessStatus: 'Granted',
  },
]

export function EmployeeTable() {
  const [password, setPassword] = useState<string>('')
  const [isAuthorized, setIsAuthorized] = useState<boolean>(true)
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees)

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === 'admin123') {
      setIsAuthorized(true)
    } else {
      setIsAuthorized(false)
    }
  }

  const handleAccessStatusChange = (email: string, newStatus: 'Granted' | 'Denied') => {
    setEmployees((prevEmployees) => prevEmployees.map((employee) => (employee.email === email ? { ...employee, accessStatus: newStatus } : employee)))
  }

  const handleSaveChanges = () => {
    console.log('Changes saved:', employees)
  }

  return (
    <div>
      {!isAuthorized ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="block font-medium">
              Enter Password:
            </label>
            <input type="password" id="password" value={password} onChange={handlePasswordChange} className="border p-2" required />
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Submit
          </button>
        </form>
      ) : (
        <div>
          <Table>
            <TableCaption>A list of employees with access to the website.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((employee) => (
                <TableRow key={employee.email}>
                  <TableCell className="font-medium">{employee.name}</TableCell>
                  <TableCell>{employee.role}</TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>
                    <label className="inline-flex items-center">
                      {/* Use ShadCN Switch here */}
                      <Switch checked={employee.accessStatus === 'Granted'} onCheckedChange={(checked) => handleAccessStatusChange(employee.email, checked ? 'Granted' : 'Denied')} />
                      <span className="ml-2">{employee.accessStatus}</span>
                    </label>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total Employees</TableCell> {/* Adjusted to colspan 3 */}
                <TableCell>{employees.length}</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
          <div className="mt-4">
            <Button onClick={handleSaveChanges}>Save Changes</Button>
          </div>
        </div>
      )}
    </div>
  )
}
