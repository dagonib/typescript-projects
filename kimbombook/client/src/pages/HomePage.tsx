import Books from '../components/Books/Books'
import Header from '../components/Header/Header'
import Form from '../components/Form/Form'

const HomePage: React.FC = () => {
  return (
    <section className='home'>
      <Header />
      <Books />
      <Form />
    </section>
  )
}

export default HomePage
