'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

// Define the context type
interface AdminAuthContextType {
  isLoggedIn: boolean
  setLoginStatus: (status: boolean) => void
}

// Create the context
const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined)

// Provider component
export const AdminAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const setLoginStatus = (status: boolean) => {
    setIsLoggedIn(status)
  }

  return <AdminAuthContext.Provider value={{ isLoggedIn, setLoginStatus }}>{children}</AdminAuthContext.Provider>
}

// Custom hook to use the AdminAuthContext
export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext)
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider')
  }
  return context
}
