import './logo.css'
import { FaThList } from 'react-icons/fa'

const Logo: React.FC = () => {
  const handleToggleSidebar = (): void => {
    document.body.classList.toggle('toggle-sidebar')
  }

  return (
    <div className="admin-logo" id='admin-logo'>
      <a className=''>
        <span>AdminDashboard</span>
      </a>
      <FaThList
        className='admin-logo__icon'
        onClick={handleToggleSidebar}
      />
    </div>
  )
}

export default Logo
