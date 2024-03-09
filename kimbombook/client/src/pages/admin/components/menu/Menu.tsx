import { Link } from 'react-router-dom'
import './menu.css'
import { FaHome } from 'react-icons/fa'
import { ImProfile } from 'react-icons/im'

const Menu: React.FC = () => {
  return (
    <menu className='menu'>
      {/* General */}
      <div className="menu__item">
        <span className="menu__item--title">MAIN</span>
        <Link to={''} className='menu__item--link'>
          <FaHome />
          <span className="menu__item--name">Home</span>
        </Link>
        <Link to={''} className='menu__item--link'>
          <ImProfile />
          <span className="menu__item--name">Profile</span>
        </Link>
      </div>

      {/* Libros */}
      <div className="menu__item">
        <span className="menu__item--title">LIBROS</span>
        <Link to={'/admin/books'} className='menu__item--link'>
          <FaHome />
          <span className="menu__item--name">Lista</span>
        </Link>
      </div>

      {/* Categorias */}
      <div className="menu__item">
        <span className="menu__item--title">CATEGORIAS</span>
        <Link to={''} className='menu__item--link'>
          <FaHome />
          <span className="menu__item--name">Lista</span>
        </Link>
      </div>
    </menu>
  )
}

export default Menu
