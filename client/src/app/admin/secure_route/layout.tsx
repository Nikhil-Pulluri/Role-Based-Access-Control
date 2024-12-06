'use client'

import React from 'react'
import Link from 'next/link'

interface LayoutProps {
  children: React.ReactNode
}

const SidebarLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="grid grid-cols-6 grid-rows-5 gap-4 w-full h-[75vh] p-5">
        <aside className="col-span-1 row-span-5 bg-gray-800 text-white rounded-md p-4">
          <h1 className="text-xl font-bold mb-6">Sidebar</h1>
          <nav className="flex flex-col gap-4">
            <Link href="/" className="hover:text-blue-400">
              Employees
            </Link>
          </nav>
        </aside>
        <main className="col-span-5 row-span-5 bg-gray-100 rounded-md p-4 overflow-auto">{children}</main>
      </div>
    </div>
  )
}

export default SidebarLayout
