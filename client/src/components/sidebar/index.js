import React from 'react'
import SideNav from './SideNav'
import Collapsible from './Collapsible'

// Component structure
// Sidebar
//   |__ SideNav
//   |__ Collapsible

export default function Sidebar() {
  return (
    <div>
      <SideNav />
      <Collapsible />
    </div>
  )
}
