import React, { PropsWithChildren } from "react"

import { useEventListener, useScreen } from "usehooks-ts"

interface ILayoutContext {
  sidebarOpen: boolean
  closeSidebar?: () => void
  openSidebar?: () => void
  toggleSidebar?: () => void
}

export const LayoutContext = React.createContext<ILayoutContext>({ sidebarOpen: false })
LayoutContext.displayName = "LayoutContext"

export function LayoutProvider(props: PropsWithChildren<{}>) {
  const screen = useScreen()
  const [sidebarOpen, setSidebarOpen] = React.useState(screen.width >= 1200)

  const resizeHandler = React.useCallback((event: Event) => {
    const eventTarget = event.target as Window
    if (eventTarget?.innerWidth >= 1200) {
      setSidebarOpen(true)
    }
  }, [])

  useEventListener("resize", resizeHandler)

  const closeSidebar = () => {
    if (screen.width < 1200) {
      setSidebarOpen(false)
    }
  }

  const openSidebar = () => {
    setSidebarOpen(true)
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const value = {
    sidebarOpen,
    closeSidebar,
    openSidebar,
    toggleSidebar,
  }

  return <LayoutContext.Provider value={value} {...props} />
}
