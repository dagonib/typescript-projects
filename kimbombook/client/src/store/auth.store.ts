import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface State {
  token: string
  profile: any
  isAuth: boolean
}

interface Actions {
  setToken: (token: string) => void
  setProfile: (profile: any) => void
  logout: () => void
}

export const useAuthStore = create(persist<State & Actions>(
  (set) => ({
    token: '',
    profile: null,
    isAuth: false,
    setToken: (token: string) => { set({ token, isAuth: true }) },
    setProfile: (profile: any) => { set(_state => ({ profile })) },
    logout: () => { set({ token: '', isAuth: false, profile: null }) }
  }), {
    name: 'auth'
  }
))
