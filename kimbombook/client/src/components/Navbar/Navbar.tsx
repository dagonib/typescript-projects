import { Link } from 'react-router-dom'
import './navbar.css'

const Navbar: React.FC = () => {
  return (
    <nav className='kbk__navbar'>
      <div className='kbk__navbar-links'>
          <div className='kbk__navbar-links_logo'>
              <h3>Kimbombook</h3>
          </div>
      </div>

      <div className='kbk__navbar-filters'>
          <input type='text' placeholder='Busca tu libro' />
          <button>Buscar</button>
      </div>

      <div className='kbk__navbar-sign'>
        <Link to='/auth'>Login</Link>
      </div>
    </nav>
  )
}

export default Navbar
