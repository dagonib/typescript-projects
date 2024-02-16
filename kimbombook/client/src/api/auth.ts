import axios from 'axios'
import { API_URL } from './config'
import { useAuthStore } from '../store/auth.store'

export async function loginRequest (email: string, password: string): Promise<any> {
  const response = await axios.post(`${API_URL}/auth/login`, {
    email,
    password
  })
  return response.data
}

export async function profileRequest (): Promise<any> {
  const token = useAuthStore.getState().token
  const response = await axios.get(`${API_URL}/auth/profile`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response.data
}
