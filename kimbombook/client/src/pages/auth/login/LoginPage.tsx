/* eslint-disable @typescript-eslint/no-misused-promises */
import { loginRequest, profileRequest } from '../../../api/auth'
import { useAuthStore } from '../../../store/auth.store'
import { useNavigate } from 'react-router-dom'
import { FaUser, FaLock } from 'react-icons/fa'
import './loginPage.css'

const LoginPage: React.FC = () => {
  const setToken = useAuthStore((state) => state.setToken) as (token: string) => string
  const setProfile = useAuthStore((state) => state.setProfile)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    const email = (e.currentTarget.elements[0] as HTMLInputElement).value
    const password = (e.currentTarget.elements[1] as HTMLInputElement).value

    const resLogin = await loginRequest(email, password)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    setToken(resLogin.token)

    const resProfile = await profileRequest()
    setProfile(resProfile)

    navigate('/admin/dashboard')
  }

  return (
    <div className='wrapper'>
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className='input-box'>
          <input type="email" placeholder="email@emial.com" value='test1@tesy.gmail.com' />
          <FaUser className='icon' />
        </div>
        <div className='input-box'>
          <input type="password" placeholder="******" value='123'/>
          <FaLock className='icon' />
        </div>

        <button>
          Login
        </button>
      </form>
    </div>

  )
}

export default LoginPage
