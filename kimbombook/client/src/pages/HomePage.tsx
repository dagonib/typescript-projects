import Books from '../components/Books/Books'
import Header from '../components/Header/Header'

const HomePage: React.FC = () => {
  return (
    <section className='home'>
      <Header />
      <Books />
    </section>
  )
}

export default HomePage
