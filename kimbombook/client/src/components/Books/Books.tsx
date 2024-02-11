import { type ListOfBooks } from '../../types'
import { Book } from '../Book/Book'
import './books.css'

interface Props {
  books: ListOfBooks
}

const Books: React.FC<Props> = ({ books }) => {
  return (
    <ul className='books'>
      {books.map((book) => (
        <li key={book._id}>
          <Book
            _id={book._id}
            author={book.author}
            title={book.title}
            description={book.description}
            imageLink={book.imageLink}
            category={book.category}
            language={book.language}
            link={book.link}
            available={book.available}
          />
        </li>
      ))}
    </ul>
  )
}

export default Books
