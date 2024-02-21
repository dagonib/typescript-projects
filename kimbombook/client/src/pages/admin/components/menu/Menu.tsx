import { useState } from 'react'
import './menu.css'
import { FaSignOutAlt } from 'react-icons/fa'
import { GiBookshelf, GiWhiteBook } from 'react-icons/gi'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../../../store/auth.store'

interface IconProps {
  icon: React.ReactNode
  isActive: boolean
  onClick: () => void
}

const Menu: React.FC = () => {
  const logout = useAuthStore(state => state.logout)
  const navigate = useNavigate()
  const [activeIndex, setActiveIndex] = useState<number | null>(0)

  const handleClick = (index: number, route: string): void => {
    setActiveIndex(index === activeIndex ? null : index)
    navigate(route)
  }

  return (
    <menu>
      <h4>Kimbombook</h4>

      <div className='menu-box'>
        <ul className='menu-top'>
          <Icon icon={<GiBookshelf />} isActive={activeIndex === 0} onClick={() => { handleClick(0, '/admin/dashboard') } } />
          <Icon icon={<GiWhiteBook />} isActive={activeIndex === 1} onClick={() => { handleClick(1, '/admin/create-book') } } />
        </ul>

        <ul className='menu-button'>
          <Icon
            icon={<FaSignOutAlt />}
            isActive={activeIndex === 3}
            onClick={() => {
              handleClick(3, '/admin/dashboard')
              logout()
              navigate('/auth')
            } } />
        </ul>
      </div>
    </menu>
  )
}

const Icon: React.FC<IconProps & { isActive: boolean, onClick: (route: string) => void }> = ({ icon, isActive, onClick }) => (
  <li className={isActive ? 'active' : ''}>
    <a href='#' onClick={onClick}>{icon}</a>
  </li>
)

export default Menu
