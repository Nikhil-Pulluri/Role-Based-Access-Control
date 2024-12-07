import { Suspense } from 'react'
import { EmployeeDetails } from './employeethings/employeeDetails'
import { Skeleton } from '@/components/ui/skeleton'

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-3xl font-bold">Employee Dashboard</h1>
        <Suspense fallback={<EmployeeSkeleton />}>
          <EmployeeDetails />
        </Suspense>
      </div>
    </main>
  )
}

function EmployeeSkeleton() {
  return (
    <div className="w-full max-w-2xl rounded-lg border p-6 shadow-sm">
      <div className="flex items-center gap-4">
        <Skeleton className="h-16 w-16 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
      <div className="mt-6 space-y-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
  )
}
