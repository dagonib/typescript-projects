import { useAuthStore } from '../store/auth.store'
import { useNavigate } from 'react-router-dom'

const ProfilePage: React.FC = () => {
  const logout = useAuthStore(state => state.logout)
  const profile = useAuthStore(state => state.profile)
  const navigate = useNavigate()

  return (
    <div>
      <p>{profile.test}</p>

      <button
        onClick={ () => {
          logout()
          navigate('/login')
        }}
      >Logout</button>
    </div>
  )
}

export default ProfilePage
