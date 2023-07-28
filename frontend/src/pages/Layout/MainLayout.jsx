import React from 'react'
import Navbar from '@components/navbar/Navbar'
import Sidebar from '@components/sidebar/Sidebar/Sidebar'

const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <Sidebar />
      {children}
    </>
  )
}

export default MainLayout