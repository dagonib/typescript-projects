import { Link } from 'react-router-dom'
import Header from '../components/Header/Header'

const HomePage: React.FC = () => {
  return (
    <>
      <Header />
      <section className='home'>
        <p>HomePage</p>
        <Link to={'/libraria'}>Catalogo</Link>
      </section>
    </>
  )
}

export default HomePage
