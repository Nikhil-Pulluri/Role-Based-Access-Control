'use client'
import React, { useState, ChangeEvent, useEffect } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { AddEmployeeDialog } from './addEmployee'

interface Employee {
  _id: string
  name: string
  role: string
  email: string
  accessStatus: 'Granted' | 'Denied'
}

export function EmployeeTable() {
  const [password, setPassword] = useState<string>('')
  const [isAuthorized, setIsAuthorized] = useState<boolean>(true)
  const [employees, setEmployees] = useState<Employee[]>([])
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

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/employees/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setEmployees((prevEmployees) => prevEmployees.filter((employee) => employee._id !== id))
      } else {
        console.error('Failed to delete employee')
      }
    } catch (error) {
      console.error('Error deleting employee:', error)
    }
  }

  const handleSaveChanges = async () => {
    if (editingIndex === null) return

    const updatedEmployee = employees[editingIndex]

    try {
      const response = await fetch(`http://localhost:5000/api/employees/${updatedEmployee._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedEmployee),
      })

      if (response.ok) {
        setEditingIndex(null)
        console.log('Employee updated successfully')
      } else {
        console.error('Failed to update employee')
      }
    } catch (error) {
      console.error('Error updating employee:', error)
    }
  }

  const handleAddEmployee = async (newEmployee: Employee) => {
    try {
      // Extract individual key-value pairs, excluding _id
      const { name, role, email, accessStatus } = newEmployee

      // Construct the JSON object without _id and add default password
      const employeePayload = {
        name,
        role,
        email,
        accessStatus,
        password: 'test@123', // Default password added here
      }

      // Send to backend
      const response = await fetch('http://localhost:5000/api/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employeePayload),
      })

      if (response.ok) {
        const createdEmployee = await response.json()
        setEmployees((prevEmployees) => [...prevEmployees, createdEmployee])
      } else {
        console.error('Failed to add new employee')
      }
    } catch (error) {
      console.error('Error adding new employee:', error)
    }
  }

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/employees')
        if (response.ok) {
          const data = await response.json()
          setEmployees(data)
        } else {
          console.error('Failed to fetch employees')
        }
      } catch (error) {
        console.error('Error fetching employees:', error)
      }
    }
    fetchEmployees()
  }, [])

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
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Employee List</h2>
            <AddEmployeeDialog onAddEmployee={handleAddEmployee} />
          </div>
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
                      <Button onClick={() => handleSaveChanges()}>Save</Button>
                    ) : (
                      <>
                        <Button variant="secondary" onClick={() => setEditingIndex(index)}>
                          Edit
                        </Button>
                        <Button variant="destructive" onClick={() => handleDelete(employee._id)} className="ml-2">
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
        </div>
      )}
    </div>
  )
}
