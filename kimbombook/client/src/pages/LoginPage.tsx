import { loginRequest, profileRequest } from '../api/auth'
import { useAuthStore } from '../store/auth.store'
import { useNavigate } from 'react-router-dom'

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
    setProfile(resProfile.profile)

    navigate('/profile')
  }

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form onSubmit={handleSubmit}>
      <input type="email" placeholder="email@emial.com" />
      <input type="password" placeholder="******"/>
      <button>
        Login
      </button>
    </form>
  )
}

export default LoginPage
