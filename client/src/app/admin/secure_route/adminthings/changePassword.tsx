import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface ChangePasswordProps {
  employeeId: string
}

export function ChangePasswordDialog({ employeeId }: ChangePasswordProps) {
  const [oldPassword, setOldPassword] = useState<string>('')
  const [newPassword, setNewPassword] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  const handleSave = async () => {
    if (!oldPassword || !newPassword) {
      alert('Both old password and new password are required.')
      return
    }

    setLoading(true)
    setError('')

    try {
      // Send the request to change the password
      const response = await fetch(`http://localhost:5000/api/employees/${employeeId}/change-password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPassword: oldPassword,
          newPassword: newPassword,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        alert('Password updated successfully!')
      } else {
        setError(data.error || 'Failed to update password')
      }
    } catch (err) {
      setError('An error occurred while updating the password')
    } finally {
      setLoading(false)
      setOldPassword('')
      setNewPassword('')
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Change Password</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
          <DialogDescription>Enter the old and new password to change the password.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="oldPassword" className="text-right">
              Old Password
            </Label>
            <Input id="oldPassword" type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} placeholder="Enter old password" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="newPassword" className="text-right">
              New Password
            </Label>
            <Input id="newPassword" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Enter new password" className="col-span-3" />
          </div>
        </div>
        {error && <div className="text-red-500 mt-2">{error}</div>}
        <DialogFooter>
          <Button type="button" onClick={handleSave} disabled={loading}>
            {loading ? 'Saving...' : 'Save Password'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
