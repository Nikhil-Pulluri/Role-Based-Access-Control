'use client'
import React, { createContext, useState, useContext, useEffect } from 'react'

// Define the context type
interface EmployeeAuthContextType {
  email: string | null
  setEmail: (email: string | null) => void
}

// Create the context
const EmployeeAuthContext = createContext<EmployeeAuthContextType | undefined>(undefined)

// AuthProvider to wrap the components
export const EmployeeAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [email, setEmail] = useState<string | null>(null)

  // Load the email from localStorage if available
  useEffect(() => {
    const storedEmail = localStorage.getItem('employeeEmail') // Use "employeeEmail" for clarity
    if (storedEmail) {
      setEmail(storedEmail)
    }
  }, [])

  const value = { email, setEmail }

  return <EmployeeAuthContext.Provider value={value}>{children}</EmployeeAuthContext.Provider>
}

// Custom hook to use the auth context
export const useEmployeeAuth = (): EmployeeAuthContextType => {
  const context = useContext(EmployeeAuthContext)
  if (!context) {
    throw new Error('useEmployeeAuth must be used within an EmployeeAuthProvider')
  }
  return context
}
