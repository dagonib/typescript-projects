import { Outlet } from 'react-router-dom'
import Sidebar from '../components/sidebar/Sidebar'
import './baseLayout.css'

const BaseLayout: React.FC = () => {
  return (
    <main className="page-wrapper">
      <Sidebar />

      <div className="content-wrapper">
        <Outlet />
      </div>
    </main>
  )
}

export default BaseLayout
