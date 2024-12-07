// 'use client'

// import React, { useEffect, useState } from 'react'
// import Link from 'next/link'
// import { useRouter } from 'next/navigation'
// import { useAdminAuth } from '@/context/admin_login' // Import your auth context
// import { ChangePasswordDialog } from './adminthings/changePassword'
// import { useEmailAuth } from '@/context/auth_context'

// interface LayoutProps {
//   children: React.ReactNode
// }

// const SidebarLayout: React.FC<LayoutProps> = ({ children }) => {
//   const router = useRouter()
//   const { isLoggedIn, setLoginStatus } = useAdminAuth() // Use auth context
//   const { email } = useEmailAuth() // Get email from the auth context
//   const [employeeDetails, setEmployeeDetails] = useState<any>(null) // State to store employee details
//   const [loading, setLoading] = useState<boolean>(true) // Loading state to manage the fetching process

//   useEffect(() => {
//     if (!isLoggedIn) {
//       // Redirect if not logged in
//       router.push('/admin')
//     }
//   }, [isLoggedIn, router])

//   useEffect(() => {
//     // Fetch employee details by email when email is available
//     const fetchEmployeeDetails = async () => {
//       if (email) {
//         try {
//           const response = await fetch(`http://localhost:5000/api/employees/email/${email}`)
//           if (!response.ok) {
//             throw new Error('Failed to fetch employee details')
//           }
//           const data = await response.json()
//           setEmployeeDetails(data)
//         } catch (error) {
//           console.error('Error fetching employee details:', error)
//         } finally {
//           setLoading(false)
//         }
//       }
//     }

//     fetchEmployeeDetails()
//   }, [email])

//   const handleLogout = () => {
//     // Clear any authentication data (e.g., tokens in localStorage/sessionStorage)
//     localStorage.removeItem('authToken') // Example, replace with your auth logic
//     console.log('Logged out successfully.')

//     // Update the auth state
//     setLoginStatus(false)

//     // Redirect to login page
//     router.push('/admin')
//   }

//   // Prevent rendering layout while redirecting or loading employee data
//   if (!isLoggedIn || loading) {
//     return null
//   }

//   return (
//     <div className="flex items-center justify-center min-h-screen">
//       <div className="grid grid-cols-6 grid-rows-5 gap-4 w-full h-[75vh] p-5">
//         <aside className="col-span-1 row-span-5 bg-gray-800 text-white rounded-md p-4">
//           <h1 className="text-xl font-bold mb-6">Sidebar</h1>
//           <nav className="flex flex-col gap-4">
//             <Link href="/" className="hover:text-blue-400">
//               Employees
//             </Link>
//             <div className="text-black">
//               {employeeDetails && (
//                 <p>
//                   Welcome, {employeeDetails.name} ({employeeDetails.role})
//                 </p>
//               )}
//               {/* Pass employeeId directly as a prop to ChangePasswordDialog */}
//               {employeeDetails && employeeDetails._id && <ChangePasswordDialog employeeId={employeeDetails._id} />}
//             </div>
//             <button onClick={handleLogout} className="text-left bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md mt-6">
//               Logout
//             </button>
//           </nav>
//         </aside>
//         <main className="col-span-5 row-span-5 bg-gray-100 rounded-md p-4 overflow-auto">{children}</main>
//       </div>
//     </div>
//   )
// }

// export default SidebarLayout

'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAdminAuth } from '@/context/admin_login'
import { ChangePasswordDialog } from './adminthings/changePassword'
import { useEmailAuth } from '@/context/auth_context'
import { Users, LogOut, ChevronRight, Building } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'

interface LayoutProps {
  children: React.ReactNode
}

const SidebarLayout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter()
  const { isLoggedIn, setLoginStatus } = useAdminAuth()
  const { email } = useEmailAuth()
  const [employeeDetails, setEmployeeDetails] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/admin')
    }
  }, [isLoggedIn, router])

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      if (email) {
        try {
          const response = await fetch(`http://localhost:5000/api/employees/email/${email}`)
          if (!response.ok) {
            throw new Error('Failed to fetch employee details')
          }
          const data = await response.json()
          setEmployeeDetails(data)
        } catch (error) {
          console.error('Error fetching employee details:', error)
        } finally {
          setLoading(false)
        }
      }
    }

    fetchEmployeeDetails()
  }, [email])

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    console.log('Logged out successfully.')
    setLoginStatus(false)
    router.push('/admin')
  }

  if (!isLoggedIn || loading) {
    return null
  }

  return (
    <div className="flex min-h-screen h-[95vh] bg-gray-50">
      <aside className="w-64 border-r bg-white shadow-sm">
        <div className="flex h-full flex-col">
          <div className="p-6">
            <div className="flex items-center gap-2">
              <Building className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-semibold">Dashboard</h1>
            </div>
          </div>

          <Separator />

          {employeeDetails && (
            <div className="p-4">
              <Card className="p-4 bg-gray-50/50">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary/10 text-primary">{employeeDetails.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{employeeDetails.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{employeeDetails.role}</p>
                  </div>
                </div>
                <div className="mt-3">{employeeDetails._id && <ChangePasswordDialog employeeId={employeeDetails._id} />}</div>
              </Card>
            </div>
          )}

          <div className="flex-1 space-y-1 p-4">
            <Button onClick={handleLogout} variant="destructive" className="w-full justify-start">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex items-center overflow-auto">
        <div className="container mx-auto p-6">{children}</div>
      </main>
    </div>
  )
}

export default SidebarLayout
