import { Link } from 'react-router-dom'
import './navbar.css'
import { FaUserLock } from 'react-icons/fa'
import logo from '../../../../assets/logo.png'

const Navbar: React.FC = () => {
  return (
    <nav className='nav-landing'>
      {/* Logo */}
      <div className='container nav-container'>
        <Link to={'/'} className='nav-logo'>
          <img src={logo} alt='logo' />
          <p>Kimbombook</p>
        </Link>

        {/* Login */}
        <Link className='nav-link' to='/auth'><FaUserLock /></Link>
      </div>
    </nav>
  )
}

export default Navbar
