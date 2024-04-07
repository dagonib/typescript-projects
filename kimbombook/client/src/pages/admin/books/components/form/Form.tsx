import { useEffect, useState } from 'react'
import './form.css'
import { ELanguage } from '../../../../../enums'
import { type Book } from '../../../../../types'
import { useNavigate } from 'react-router-dom'
import useFetchAuthors from '../../../../../hooks/author/useFetchAuthors'
import { SelectCategories, type SelectCategoryOption } from '../selectCategories/SelectCategories'
import useFetchCategories from '../../../../../hooks/categories/useFetchCategories'
import { createBook, updateBook } from '../../../../../api/book'
import FileImageInput from '../../../components/fileImageInput/FileImageInput'
import book_mockup from '../../../../../assets/book_mockup.png'

const Form: React.FC<{ book?: Book }> = ({ book }) => {
  const navigate = useNavigate()

  const authors = useFetchAuthors('name', 'asc', null)
  const listOfCategories = useFetchCategories('name', 'asc', null)

  const [value, setValue] = useState<SelectCategoryOption[]>([])
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [description, setDescription] = useState('')
  const [imageLink, setImageLink] = useState<string>(book_mockup)
  const [categories, setCategories] = useState<string[]>([])
  const [language, setLanguage] = useState<ELanguage>(ELanguage.Castellano)
  const [link, setLink] = useState('')
  const [available, setAvailable] = useState(false)

  const [showConfirmation, setShowConfirmation] = useState(false)

  useEffect(() => {
    if (book != null) {
      setTitle(book.title)
      setAuthor(book.author)
      setDescription(book.description)
      setImageLink(book.imageLink)
      setCategories(book.categories)
      setLanguage(book.language)
      setLink(book.link)
      setAvailable(book.available)
      const selectedCategories = listOfCategories.filter((category) => book.categories.includes(category._id))
      setValue(selectedCategories)
    }
  }, [book])

  const handleCreateBook = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()
    try {
      if (book !== null && book !== undefined) {
        await updateBook(book._id, title, author, description, imageLink, categories, language, link, available)
        setShowConfirmation(true)
        setTimeout(() => {
          setShowConfirmation(false)
        }, 3000)
        navigate('/admin/books')
      } else {
        await createBook(title, author, description, imageLink, categories, language, link, available)
        setTitle('')
        setAuthor('')
        setDescription('')
        setImageLink('')
        setCategories([])
        setLanguage(ELanguage.Castellano)
        setLink('')
        setAvailable(false)
        setShowConfirmation(true)
        setTimeout(() => { setShowConfirmation(false) }, 3000)
        navigate('/admin/books')
      }
    } catch (error) {
      console.log('Error creating book: ', error)
    }
  }

  const handleSelectChange = (o: SelectCategoryOption[]): void => {
    setValue(o)
    const selectedIds = o.map(category => category._id)
    setCategories(selectedIds)
  }

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form onSubmit={handleCreateBook} className='form'>
      <div className='form__content'>
        <div className='form__content--left'>

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
            <select
              id="book-author"
              value={author}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                setAuthor(e.target.value)
              }}
            >
              <option value="">Selecciona un autor</option>
              {authors.map((author) => (
                <option key={author._id} value={author._id}>
                  {author.name}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div className='form__input form__select'>
            <label htmlFor="book-description">Descripción</label>
            <textarea
              id="book-description"
              value={description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                setDescription(e.target.value)
              }}
            />
          </div>

          {/* Portada */}
          <div className='form__input'>
           <label htmlFor="book-imageLink">Portada</label>
            <FileImageInput
              fileImageUrl={imageLink}
              setFileImageUrl={setImageLink}
              type='books'
            />
          </div>
        </div>

        <div className='form__content--right'>

        {/* Categories */}
        <div className='form__input'>
          <label htmlFor="book-categories">Categorias</label>
            <SelectCategories
              multiple
              value={value}
              options={listOfCategories}
              onChange={handleSelectChange}
            />
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
              {Object.keys(ELanguage).map((key) => (
                <option key={key} value={ELanguage[key as keyof typeof ELanguage]}>
                  {ELanguage[key as keyof typeof ELanguage]}
                </option>
              ))}
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
                const value = e.target.value === 'true'
                setAvailable(value)
              }}
            >
              <option value="">Selecciona un categoría</option>
              <option value='true'>Sí</option>
              <option value='false'>No</option>
            </select>
          </div>
        </div>
      </div>
      <button className='btn'>{book !== null && book !== undefined ? 'Actualizar' : 'Crear Libro'}</button>
      {showConfirmation && <p className='confirmation'>Libro creado correctamente.</p>}
    </form>
  )
}

export default Form
