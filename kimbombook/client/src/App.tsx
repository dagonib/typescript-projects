import Navbar from './components/Navbar/Navbar'
import { Outlet } from 'react-router-dom'

const App = (): JSX.Element => {
  return (
    <div className='app'>
      <Navbar />
      <Outlet />
    </div>
  )
}

export default App
