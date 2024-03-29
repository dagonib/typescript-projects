import { useEffect, useState } from 'react'
import styles from './form.module.css'
import { createAuthor, updateAuthor } from '../../../../../api/author'
import { useNavigate } from 'react-router-dom'
import { type Author } from '../../../../../types'

const Form: React.FC<{ author?: Author }> = ({ author }) => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [imageLink, setImageLink] = useState('')
  const [showConfirmation, setShowConfirmation] = useState(false)

  useEffect(() => {
    if (author != null) {
      setName(author.name)
      setImageLink(author.imageLink)
    }
  }, [author])

  const handleCreateAuthor = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()
    try {
      if (author !== null && author !== undefined) {
        await updateAuthor(author._id, name, imageLink)
      } else {
        await createAuthor(name, imageLink)
        setName('')
        setImageLink('')
      }
      setShowConfirmation(true)
      setTimeout(() => {
        setShowConfirmation(false)
      }, 3000)
      navigate('/admin/authors')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form onSubmit={handleCreateAuthor} className={styles.form}>
      <div className={styles.form__content}>
        {/* Name */}
        <div className={styles.form__item}>
          <label htmlFor='author-name'>Name</label>
          <input
            id='author-name'
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setName(e.target.value)
            }}
          />
        </div>

        {/* ImageURL */}
        <div className={styles.form__item}>
          <label htmlFor='author-imgUrl'>Image URL</label>
          <input
            id='author-img'
            value={imageLink}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setImageLink(e.target.value)
            }}
          />
        </div>
      </div>

      <button className='btn'>
        {
          author !== null &&
            author !== undefined
            ? 'Actualizar'
            : 'Create Author'
        }
      </button>

      { showConfirmation &&
        <p className={styles.confirmation}>Author created successfully</p>
      }
    </form>
  )
}

export default Form
