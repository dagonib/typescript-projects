import Footer from './pages/admin/components/footer/Footer'
import Navbar from './pages/landing/components/Navbar/Navbar'
import { Outlet } from 'react-router-dom'

const App = (): JSX.Element => {
  return (
    <div className='app'>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default App
