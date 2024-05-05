import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type SidebarProviderProps = {
  children: ReactNode
}

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type SidebarContextType = {
  isOpen: boolean
  toggle: () => void
  close: () => void
}

const SidebarContext = createContext<SidebarContextType | null>(null)

export function useSidebarContext (): SidebarContextType {
  const value = useContext(SidebarContext)
  if (value === null) {
    throw new Error('useSidebar must be used within a SidebarProvider')
  }
  return value
}

export function SidebarProvider ({ children }: SidebarProviderProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const handle = () => {
      if (window.innerWidth >= 576) {
        setIsOpen(false)
      }
    }
    window.addEventListener('resize', handle)
    return () => {
      window.removeEventListener('resize', handle)
    }
  }, [])

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  function isScreenSmall () {
    return window.innerWidth < 576
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  function toggle () {
    if (isScreenSmall()) {
      setIsOpen((s) => !s)
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  function close () {
    setIsOpen(false)
  }

  return (
    <SidebarContext.Provider value={{
      isOpen,
      toggle,
      close
    }}>
      {children}
    </SidebarContext.Provider>
  )
}
