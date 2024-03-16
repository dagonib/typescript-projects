import Logo from '../logo/Logo'
import Nav from '../nav/Nav'
import './header.css'

const Header: React.FC = () => {
  return (
    <div className="admin-header" id='admin-header'>
      {/* Logo */}
      <Logo />

      {/* Navbar */}
      <Nav />

    </div>
  )
}

export default Header
