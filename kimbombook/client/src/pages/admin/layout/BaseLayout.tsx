import './baseLayout.css'
import Header from '../components/header/Header'
import AsideBar from '../components/asideBar/asideBar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/footer/Footer'

const BaseLayout: React.FC = () => {
  return (
    // App
    <main className="baselayout">
      <Header />
      {/* main-container */}
      <div className="baselayout__wrapper" id="main">
        <AsideBar />
        <Outlet/>
      </div>
      <Footer />
    </main>
  )
}

export default BaseLayout
