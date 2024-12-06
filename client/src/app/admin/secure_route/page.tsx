import React from 'react'
import { EmployeeTable } from './adminthings/emplyeedata'

function Page() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center px-5 py-3">
      <div className="w-full max-w-7xl">
        <EmployeeTable />
      </div>
    </div>
  )
}

export default Page
