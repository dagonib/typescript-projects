import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../../store/auth.store'
import './profilepage.css'

const ProfilePage: React.FC = () => {
  const logout = useAuthStore(state => state.logout)
  const profile = useAuthStore(state => state.profile)
  const navigate = useNavigate()

  return (
    <div>
      <p>{profile.email}</p>

      <button
        onClick={ () => {
          logout()
          navigate('/auth')
        }}
      >Logout</button>
    </div>
  )
}

export default ProfilePage
