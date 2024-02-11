import './book.css'
import { type Book as BookType } from '../../types'
// import { deleteBook } from '../../api/deleteBook'

type Props = BookType

export const Book: React.FC<Props> = ({ _id, author, title, imageLink, link }) => {
  // function handleDeleteBook (bookId: string): void {
  //   deleteBook(bookId)
  //     .then(() => {
  //       console.log('Book deleted successfully')
  //     })
  //     .catch(error => {
  //       console.error('Error deleting the book:', error)
  //     })
  // }

  return (
    <div className='book' key={_id}>
        <div className='book__image'>
          <img src={imageLink} alt={title} />
        </div>
        <p>{author}</p>
        <p>{title}</p>
        <a href={link} target='_blank' rel='noreferrer'>Comprar</a>
        {/* <button onClick={() => { handleDeleteBook(_id) }}>Delete</button> */}
    </div>
  )
}
