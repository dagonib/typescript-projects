import './App.css'
import { sampleBooks } from './data.ts'

function App() {

  return (
    <div className='section'>
      <header>
        <nav>
          <div>
              <p>Kimbombook</p>
          </div>
          <ul>
            <li><a href="">Inicio</a></li>
            <li><a href="">Sobre nosotros</a></li>
            <li><a href="">Contacto</a></li>
          </ul>
        </nav>
      </header>

      <main>
        <ul>
          {sampleBooks.map((book) => (
            <li key={book.title}>
              <img src={book.image} alt={book.title} className='book-image' />
              <h2>{book.title}</h2>
              <p>{book.description}</p>
              <p>{book.category}</p>
              <p>{book.language}</p>
              <a href={book.link} target='_blank' rel='noreferrer'>Comprar</a>
            </li>
          ))}
        </ul>
      </main>

      <footer>
        Footer
      </footer>
    </div>
  )
}

export default App
