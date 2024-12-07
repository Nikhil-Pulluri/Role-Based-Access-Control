import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Building2, UserCircle } from 'lucide-react'
import { Card } from '@/components/ui/card'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Welcome Back</h1>
          <p className="text-muted-foreground">Please select your login type to continue</p>
        </div>

        <div className="space-y-4 ">
          <Link href="/admin">
            <Button className="w-full h-16 text-lg justify-start space-x-4 bg-white hover:bg-gray-50 text-gray-900 border shadow-sm" variant="outline">
              <Building2 className="h-6 w-6 text-primary" />
              <div className="flex flex-col items-start">
                <span className="font-semibold">Admin Portal</span>
                <span className="text-sm text-muted-foreground">System administration & Management</span>
              </div>
            </Button>
          </Link>

          <Link href="/employee">
            <Button className="w-full h-16 text-lg justify-start space-x-4 bg-white hover:bg-gray-50 text-gray-900 border shadow-sm" variant="outline">
              <UserCircle className="h-6 w-6 text-primary" />
              <div className="flex flex-col items-start">
                <span className="font-semibold">Employee Portal</span>
                <span className="text-sm text-muted-foreground">Access your employee dashboard</span>
              </div>
            </Button>
          </Link>
        </div>

        <div className="text-center text-sm text-muted-foreground">© {new Date().getFullYear()} VRV Security. All rights reserved.</div>
      </Card>
    </div>
  )
}
