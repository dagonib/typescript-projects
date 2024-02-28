/* eslint-disable @typescript-eslint/no-floating-promises */
import './book.css'
import { type Book as BookType } from '../../../../types'

type Props = BookType

const Book: React.FC<Props> = ({ _id, author, title, imageLink, link }) => {
  return (
    <div className='book' key={_id}>
        <img src={imageLink} alt={title} />
        <div className='book__content'>
          <h3>{title}</h3>
          <p>{author}</p>
          <a href={link} target='_blank' rel='noreferrer'>Comprar</a>
        </div>
    </div>
  )
}

export default Book
