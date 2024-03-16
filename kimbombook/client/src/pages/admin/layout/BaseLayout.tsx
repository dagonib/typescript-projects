import './baseLayout.css'
import Header from '../components/header/Header'
import NewSideBar from '../components/asideBar/asideBar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/footer/Footer'

const BaseLayout: React.FC = () => {
  return (
    // App
    <main className="baselayout">
      <Header />
      {/* main-container */}
      <div className="baselayout__wrapper" id="main">
        <NewSideBar />
        <Outlet/>
      </div>
      <Footer />
    </main>
  )
}

export default BaseLayout
