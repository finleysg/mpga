import React from "react"

import Button from "react-bootstrap/Button"

import { useLayout } from "./UseLayout"

const SidenavToggle: React.FC = () => {
  const { sidebarOpen, toggleSidebar } = useLayout()

  return (
    <Button
      variant="secondary"
      id="sidebarCollapse"
      className={sidebarOpen ? "" : " active"}
      onClick={() => toggleSidebar()}
    >
      <span></span>
      <span></span>
      <span></span>
    </Button>
  )
}

export default SidenavToggle
