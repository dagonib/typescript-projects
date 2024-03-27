import { Link } from 'react-router-dom'
import './asideBar.css'
import { BsFillGrid3X3GapFill, BsPersonBadge } from 'react-icons/bs'
import { GiBookshelf } from 'react-icons/gi'
import { MdCategory } from 'react-icons/md'

const NewSideBar: React.FC = () => {
  return (
    <aside className='admin-new-sidebar' id='admin-new-sidebar'>
      <ul className='admin-new-sidebar__nav' id='admin-new-sidebar__nav'>
        <li className='admin-new-sidebar__item'>
          <Link to='/admin/dashboard' className='admin-new-sidebar__link'>
            <BsFillGrid3X3GapFill />
            <span>Dashboard</span>
          </Link>
        </li>
      </ul>
      <ul className='admin-new-sidebar__nav'>
        <li className='admin-new-sidebar__item'>
          <Link to='/admin/books' className='admin-new-sidebar__link'>
            <GiBookshelf />
            <span>Books</span>
          </Link>
        </li>
      </ul>
      <ul className='admin-new-sidebar__nav'>
        <li className='admin-new-sidebar__item'>
          <Link to='/admin/categories' className='admin-new-sidebar__link'>
            <MdCategory />
            <span>Categories</span>
          </Link>
        </li>
      </ul>
      <ul className='admin-new-sidebar__nav'>
        <li className='admin-new-sidebar__item'>
          <Link to='/admin/authors' className='admin-new-sidebar__link'>
            <BsPersonBadge />
            <span>Authors</span>
          </Link>
        </li>
      </ul>
    </aside>
  )
}

export default NewSideBar
