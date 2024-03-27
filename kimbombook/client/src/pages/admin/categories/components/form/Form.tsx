import { useEffect, useState } from 'react'
import styles from './form.module.css'
import { createCategory, updateCategory } from '../../../../../api/category'
import { useNavigate } from 'react-router-dom'
import { type Category } from '../../../../../types'

const Form: React.FC<{ category?: Category }> = ({ category }) => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [showConfirmation, setShowConfirmation] = useState(false)

  useEffect(() => {
    if (category != null) {
      setName(category.name)
      setDescription(category.description)
    }
  }, [category])

  const handleCreateCategory = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()
    try {
      if (category !== null && category !== undefined) {
        await updateCategory(category._id, name, description)
        setShowConfirmation(true)
        setTimeout(() => {
          setShowConfirmation(false)
        }, 3000)
        navigate('/admin/categories')
      } else {
        await createCategory(name, description)
        setName('')
        setDescription('')
        setTimeout(() => {
          setShowConfirmation(false)
        }, 6000)
        navigate('/admin/categories')
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form onSubmit={handleCreateCategory} className={styles.form}>
      <div className={styles.form__content}>
        {/* Name */}
        <div className={styles.form__item}>
          <label htmlFor="category-name">Name</label>
          <input
            id="category-name"
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setName(e.target.value)
            }}
          />
        </div>

        {/* Description */}
        <div className={styles.form__item}>
          <label htmlFor="category-description">Description</label>
          <textarea
            id="category-description"
            rows={10}
            value={description}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              setDescription(e.target.value)
            }}
          />
        </div>
      </div>

      <button className='btn'>{category !== null && category !== undefined ? 'Actualizar' : 'Crear Categoría'}</button>
      {showConfirmation && <p className='confirmation'>Libro creado correctamente.</p>}
    </form>
  )
}

export default Form
