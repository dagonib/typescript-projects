import { useState } from 'react'
import { SidebarContext } from './SidebarContext'

interface SidebarProviderProps {
  children: JSX.Element | JSX.Element[]
}

export const SidebarProvider = ({ children }: SidebarProviderProps): JSX.Element => {
  const [isSidebarOpen, setSidebarOpen] = useState(true)

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const openSidebar = () => {
    setSidebarOpen(true)
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const closeSidebar = () => {
    setSidebarOpen(false)
  }

  return (
    <SidebarContext.Provider
      value={{
        isSidebarOpen,
        openSidebar,
        closeSidebar
      }}>
      {children} {/* Add the missing 'children' property */}
    </SidebarContext.Provider>
  )
}
