import { createContext } from 'react'

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type SidebarContextProps = {
  isSidebarOpen: boolean
  openSidebar: () => void
  closeSidebar: () => void
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export const SidebarContext = createContext<SidebarContextProps>({
  isSidebarOpen: false,
  openSidebar: () => {},
  closeSidebar: () => {}
} as SidebarContextProps)
