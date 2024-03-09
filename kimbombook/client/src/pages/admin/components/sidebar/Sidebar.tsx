import { MdOutlineClose, MdOutlineGridView, MdOutlineLogout } from 'react-icons/md'
import './sidebar.css'
import { Link } from 'react-router-dom'
import { SidebarContext } from '../../../../context/SidebarContext'
import { useContext, useEffect, useRef } from 'react'

const Sidebar: React.FC = () => {
  const { isSidebarOpen, closeSidebar } = useContext(SidebarContext)
  console.log(isSidebarOpen)
  const navbarRef = useRef(null)

  const handleClickOutside = (e: MouseEvent): void => {
    if (
      navbarRef.current !== null &&
      (navbarRef.current as HTMLElement).contains(e.target as Node) &&
      (e.target as HTMLElement).className !== 'sidebar-open-btn'
    ) {
      closeSidebar()
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <nav
      className={`sidebar ${isSidebarOpen ? 'sidebar-show' : ''}`}
      ref={navbarRef as React.RefObject<HTMLDivElement>}
    >
      <div className="sidebar-top">
        <div className="sidebar-brand">
          <span className='sidebar-brand-text'>Kimbombook</span>
        </div>
        <button className="sidebar-close-btn" onClick={closeSidebar}>
          <MdOutlineClose size={20} />
        </button>
      </div>

      <div className="sidebar-body">
        <div className="sidebar-menu">
          <ul className="menu-list">
            <li className="menu-item">
              <Link to='/admin/dashboard' className="menu-link active">
                <span className="menu-link-icon">
                  <MdOutlineGridView size={18}/>
                </span>
                <span className="menu-link-text">Dashboard</span>
              </Link>
            </li>

            <li className="menu-item">
              <Link to='/admin/dashboard' className="menu-link active">
                <span className="menu-link-icon">
                  <MdOutlineGridView size={18}/>
                </span>
                <span className="menu-link-text">Dashboard</span>
              </Link>
            </li>
          </ul>
        </div>

        <div className="sidebar-menu sidebar-menu2">
          <ul className="menu-list">
            <li className="menu-item">
              <Link to="/" className="menu-link">
                <span className="menu-link-icon">
                  <MdOutlineLogout size={20} />
                </span>
                <span className="menu-link-text">Logout</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Sidebar
