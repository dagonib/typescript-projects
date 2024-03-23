import {
  createBrowserRouter
} from 'react-router-dom'
import App from '../App'
import HomePage from '../pages/landing/home/HomePage'
import LoginPage from '../pages/auth/login/LoginPage'
import AdminPage from '../pages/admin/admin/AdminPage'
import LibrariaPage from '../pages/landing/libraria/LibrariaPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <HomePage />
      },
      {
        path: '/libraria',
        element: <LibrariaPage />
      }
    ]
  },
  {
    path: '/auth',
    element: <LoginPage />
  },
  {
    path: '/admin//*',
    element: <AdminPage />
  }
])

export default router
