import { useState } from 'react'
import './form.css'
import { useBookStore } from '../../store/booksStore'
import { ECategory, ELanguage } from '../../enums'

const Form: React.FC = () => {
  const createBookStore = useBookStore(state => state.createBookStore)
  const fetchBooksStore = useBookStore(state => state.fetchBooksStore)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [description, setDescription] = useState('')
  const [imageLink, setImageLink] = useState('')
  const [category, setCategory] = useState<ECategory>(ECategory.Historica)
  const [language, setLanguage] = useState<ELanguage>(ELanguage.Castellano)
  const [link, setLink] = useState('')
  const [available, setAvailable] = useState(false)

  const handleCreateBook = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()
    try {
      await createBookStore(title, author, description, imageLink, category, language, link, available)
      setTitle('')
      setAuthor('')
      setDescription('')
      setImageLink('')
      setCategory(ECategory.Historica)
      setLanguage(ELanguage.Castellano)
      setLink('')
      setAvailable(false)
      await fetchBooksStore()
    } catch (error) {
      console.log('Error creating book: ', error)
    }
  }

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form onSubmit={handleCreateBook} className='form'>

      {/* Title */}
      <div className='form__input'>
        <label htmlFor="book-title">Título</label>
        <input
          id="book-title"
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setTitle(e.target.value)
          }}
        />
      </div>

      {/* Author */}
      <div className='form__input'>
        <label htmlFor="book-author">Autor</label>
        <input
          id="book-author"
          value={author}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setAuthor(e.target.value)
          }}
        />
      </div>

      {/* Description */}
      <div className='form__input'>
        <label htmlFor="book-description">Descripción</label>
        <input
          id="book-description"
          value={description}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setDescription(e.target.value)
          }}
        />
      </div>

      {/* ImageLink */}
      <div className='form__input'>
        <label htmlFor="book-imageLink">Image Link</label>
        <input
          id="book-imageLink"
          value={imageLink}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setImageLink(e.target.value)
          }}
        />
      </div>

      {/* Category */}
      <div className='form__input'>
        <label htmlFor="book-category">Categoría</label>
        <select
          id="book-category"
          value={category}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            setCategory(e.target.value as ECategory)
          }}
        >
          <option value="">Selecciona un categoría</option>
          <option value="histórica">Histórica</option>
          <option value="tremendismo">Tremendismo</option>
          <option value="años60">Años 60</option>
          <option value="social">Social</option>
        </select>
      </div>

      {/* Language */}
      <div className='form__input'>
        <label htmlFor="book-language">Idioma</label>
        <select
          id="book-language"
          value={language}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            setLanguage(e.target.value as ELanguage)
          }}
        >
          <option value="">Selecciona un idioma</option>
          <option value="castellano">Castellano</option>
          <option value="catalan">Catalan</option>
        </select>
      </div>

      {/* Link */}
      <div className='form__input'>
        <label htmlFor="book-link">Link</label>
        <input
          id="book-link"
          value={link}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setLink(e.target.value)
          }}
        />
      </div>

      {/* Available */}
      <div className='form__input'>
        <label htmlFor="book-available">Disponible</label>
        <select
          id="book-available"
          value={available ? 'true' : 'false'}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            setAvailable(e.target.value === 'true')
          }}
        >
          <option value="">Selecciona un categoría</option>
          <option value="true">Sí</option>
          <option value="false">No</option>
        </select>
      </div>

      <button>Crear Libro</button>
    </form>
  )
}

export default Form
