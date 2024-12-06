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
  const [editingIndex, setEditingIndex] = useState<number | null>(null)

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

  const handleEditChange = (index: number, key: keyof Employee, value: string | 'Granted' | 'Denied') => {
    const updatedEmployees = [...employees]
    updatedEmployees[index] = { ...updatedEmployees[index], [key]: value }
    setEmployees(updatedEmployees)
  }

  const handleDelete = (index: number) => {
    setEmployees((prevEmployees) => prevEmployees.filter((_, i) => i !== index))
  }

  const handleSaveChanges = () => {
    console.log('Changes saved:', employees)
    setEditingIndex(null) // Exit editing mode
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
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((employee, index) => (
                <TableRow key={employee.email}>
                  <TableCell>
                    {editingIndex === index ? (
                      <input type="text" value={employee.name} onChange={(e) => handleEditChange(index, 'name', e.target.value)} className="border p-1 w-full" />
                    ) : (
                      employee.name
                    )}
                  </TableCell>
                  <TableCell>
                    {editingIndex === index ? (
                      <input type="text" value={employee.role} onChange={(e) => handleEditChange(index, 'role', e.target.value)} className="border p-1 w-full" />
                    ) : (
                      employee.role
                    )}
                  </TableCell>
                  <TableCell>
                    {editingIndex === index ? (
                      <input type="email" value={employee.email} onChange={(e) => handleEditChange(index, 'email', e.target.value)} className="border p-1 w-full" />
                    ) : (
                      employee.email
                    )}
                  </TableCell>
                  <TableCell>
                    {editingIndex === index ? (
                      <label className="inline-flex items-center">
                        <Switch checked={employee.accessStatus === 'Granted'} onCheckedChange={(checked) => handleEditChange(index, 'accessStatus', checked ? 'Granted' : 'Denied')} />
                        <span className="ml-2">{employee.accessStatus}</span>
                      </label>
                    ) : (
                      employee.accessStatus
                    )}
                  </TableCell>
                  <TableCell>
                    {editingIndex === index ? (
                      <Button onClick={handleSaveChanges}>Save</Button>
                    ) : (
                      <>
                        <Button variant="secondary" onClick={() => setEditingIndex(index)}>
                          Edit
                        </Button>
                        <Button variant="destructive" onClick={() => handleDelete(index)} className="ml-2">
                          Delete
                        </Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={4}>Total Employees</TableCell>
                <TableCell>{employees.length}</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
          <div className="mt-4">
            <Button onClick={handleSaveChanges}>Save All Changes</Button>
          </div>
        </div>
      )}
    </div>
  )
}
