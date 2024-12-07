'use client'
import React, { createContext, useState, useContext, useEffect } from 'react'

// Define the context type
interface AuthContextType {
  email: string | null
  setEmail: (email: string | null) => void
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// AuthProvider to wrap the components
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [email, setEmail] = useState<string | null>(null)

  // Load the email from localStorage if available
  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail')
    if (storedEmail) {
      setEmail(storedEmail)
    }
  }, [])

  const value = { email, setEmail }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Custom hook to use the auth context
export const useEmailAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAdminAuth must be used within an AuthProvider')
  }
  return context
}
