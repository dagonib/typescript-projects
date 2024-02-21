import { useAuthStore } from '../../../../store/auth.store'
import './topcontainer.css'
import { BiSearchAlt } from 'react-icons/bi'

const TopContainer: React.FC = () => {
  const profile = useAuthStore(state => state.profile)

  return (
    <div className='top-container'>
      <div className='top-container__input-box'>
        <input type='text' placeholder='Search book'/>
        <i>
          <BiSearchAlt />
        </i>
      </div>
      <div className="top-container__profile-container">
        <p>{profile.email}</p>
      </div>
    </div>
  )
}

export default TopContainer
