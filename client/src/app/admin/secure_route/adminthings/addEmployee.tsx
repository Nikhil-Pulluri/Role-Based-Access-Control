import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface Employee {
  _id: string
  name: string
  role: string
  email: string
  accessStatus: 'Granted' | 'Denied'
}

interface AddEmployeeDialogProps {
  onAddEmployee: (employee: Employee) => void
}

export function AddEmployeeDialog({ onAddEmployee }: AddEmployeeDialogProps) {
  const [employee, setEmployee] = useState<Employee>({
    _id: '',
    name: '',
    role: '',
    email: '',
    accessStatus: 'Granted',
  })

  const handleChange = (key: keyof Employee, value: string) => {
    setEmployee((prev) => ({ ...prev, [key]: value }))
  }

  const handleSave = () => {
    if (!employee.name || !employee.role || !employee.email) {
      alert('All fields are required.')
      return
    }

    onAddEmployee(employee)
    setEmployee({ _id: '', name: '', role: '', email: '', accessStatus: 'Granted' }) // Reset the form
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add New Employee</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Employee</DialogTitle>
          <DialogDescription>Fill in the details to add a new employee. Click save when you&apos;re done.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value={employee.name} onChange={(e) => handleChange('name', e.target.value)} placeholder="Enter name" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="role" className="text-right">
              Role
            </Label>
            <Input id="role" value={employee.role} onChange={(e) => handleChange('role', e.target.value)} placeholder="Enter role" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input id="email" value={employee.email} onChange={(e) => handleChange('email', e.target.value)} placeholder="Enter email" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="accessStatus" className="text-right">
              Access Status
            </Label>
            <select id="accessStatus" value={employee.accessStatus} onChange={(e) => handleChange('accessStatus', e.target.value as 'Granted' | 'Denied')} className="col-span-3 border p-2 rounded">
              <option value="Granted">Granted</option>
              <option value="Denied">Denied</option>
            </select>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleSave}>
            Save Employee
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
