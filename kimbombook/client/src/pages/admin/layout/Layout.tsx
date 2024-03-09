import { Outlet } from 'react-router-dom'
import './layout.css'
import Menu from '../components/menu/Menu'
import Navbar from '../components/navbar/Navbar'
import Footer from '../components/footer/Footer'

const Layout: React.FC = () => {
  return (
    <div className="admin-main">
      <Navbar />
      <div className="admin-main__container">
        <div className="admin-main__menu-container">
          <Menu />
        </div>
        <div className="admin-main__content-container">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Layout
