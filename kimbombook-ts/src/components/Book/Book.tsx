import './book.css'
import { type Book as BookType } from '../../types'

type Props = BookType

export const Book: React.FC<Props> = ({ id, title, imageLink, link }) => {
  return (
    <div className='book' key={id}>
        <div className='book__image'>
          <img src={imageLink} alt={title} />
        </div>
        <p>{title}</p>
        <a href={link} target='_blank' rel='noreferrer'>Comprar</a>
    </div>
  )
}
