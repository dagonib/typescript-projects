import { useState } from 'react'
import { createBook } from '../../api/createBook'
import './form.css'

const Form: React.FC = () => {
  const [title, setTitle] = useState('')

  function handleCreateBook (e: React.FormEvent): void {
    e.preventDefault()
    try {
      createBook(title)
        .then(book => {
          console.log(book)
          setTitle('')
        })
        .catch(error => {
          console.log('Error al crear el libro:', error)
        })
    } catch (error) {
      console.log('Error al crear el libro:', error)
    }
  }

  return (
    <form onSubmit={handleCreateBook}>
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

      <button>Crear Libro</button>
    </form>
  )
}

export default Form
