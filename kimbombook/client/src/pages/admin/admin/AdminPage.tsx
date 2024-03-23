import { Route, Routes } from 'react-router-dom'
import { useAuthStore } from '../../../store/auth.store'
import ProtectedRoute from '../../../components/ProtectedRoute/ProtectedRoute'
import ProfilePage from '../profile/ProfilePage'
import DashBoardPage from '../dashboard/DashboarPage'

import './adminpage.css'
import CreateBookPage from '../books/createBookPage/CreateBookPage'
import EditBookPage from '../books/editBookPage/EditBookPage'
import BooksPage from '../books/booksPage/BooksPage'
import BaseLayout from '../layout/BaseLayout'

const AdminPage: React.FC = () => {
  const isAuth = useAuthStore(state => state.isAuth)

  return (
      <div className='admin-page'>
        <Routes>
          <Route element={<BaseLayout />}>
            <Route
              path='dashboard'
              element= {
                <ProtectedRoute isAllowed={isAuth}>
                  <DashBoardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path='books'
              element= {
                <ProtectedRoute isAllowed={isAuth}>
                  <BooksPage />
                </ProtectedRoute>
              }
            />
            <Route
              path='create-book'
              element= {
                <ProtectedRoute isAllowed={isAuth}>
                  <CreateBookPage />
                </ProtectedRoute>
              }
            />
            <Route
              path='edit-book/:bookId'
              element= {
                <ProtectedRoute isAllowed={isAuth}>
                  <EditBookPage />
                </ProtectedRoute>
              }
            />
            <Route
              path='profile'
              element= {
                <ProtectedRoute isAllowed={isAuth}>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </div>
  )
}

export default AdminPage
