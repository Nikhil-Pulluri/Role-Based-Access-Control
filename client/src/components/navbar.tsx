import React from 'react'

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-800 text-white p-4 shadow-md">
      <div className="max-w-9xl mx-auto flex items-center">
        <h1 className="text-lg font-bold">Role Based Access Control</h1>
      </div>
    </nav>
  )
}

export default Navbar
