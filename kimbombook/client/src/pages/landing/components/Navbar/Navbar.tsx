import { Link } from 'react-router-dom'
import './navbar.css'
import { FaUserLock } from 'react-icons/fa'

const Navbar: React.FC = () => {
  return (
    <nav>
      {/* Logo */}
      <div className='container nav-container'>
        <Link className='nav-logo' to={'/'}>Kimbombook</Link>

        {/* Login */}
        <Link className='nav-link' to='/auth'><FaUserLock /></Link>
      </div>
    </nav>
  )
}

export default Navbar
