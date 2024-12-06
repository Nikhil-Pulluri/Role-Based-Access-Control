'use client'
import React, { useState, ChangeEvent } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface LoginProps {
  onLogin: (credentials: { email: string; password: string; userType: 'admin' | 'employee' }) => void
  usertype: 'admin' | 'employee'
}

const Login: React.FC<LoginProps> = ({ onLogin, usertype }) => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [userType, setUserType] = useState<'admin' | 'employee'>(usertype)

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)
  // const handleUserTypeChange = (e: ChangeEvent<HTMLInputElement>) => setUserType(e.target.value as 'admin' | 'employee')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onLogin({ email, password, userType })
  }

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Login</CardTitle>
        <CardDescription>Enter your email and password to login to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" required value={email} onChange={handleEmailChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required value={password} onChange={handlePasswordChange} />
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default Login
