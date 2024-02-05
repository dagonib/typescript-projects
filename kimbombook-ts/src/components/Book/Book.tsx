import './book.css'
import { type Book as BookType } from '../../types'

type Props = BookType

export const Book: React.FC<Props> = ({ id, title, imageLink, category, language, link }) => {
  return (
    <div className='book' key={id}>
        <div className='book-image'>
          <img src={imageLink} alt={title} />
        </div>
        <h3>{title}</h3>
        <p>{category}</p>
        <p>{language}</p>
        <a href={link} target='_blank' rel='noreferrer'>Comprar</a>
    </div>
  )
}
