import Logo from '../logo/Logo'
import './header.css'

const Header: React.FC = () => {
  return (
    <div className="admin-header" id='admin-header'>
      {/* Logo */}
      <Logo />
    </div>
  )
}

export default Header
