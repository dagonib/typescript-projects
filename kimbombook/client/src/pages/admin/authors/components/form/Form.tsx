import { useEffect, useState } from 'react'
import styles from './form.module.css'
import { createAuthor, updateAuthor } from '../../../../../api/author'
import { useNavigate } from 'react-router-dom'
import { type Author } from '../../../../../types'
import FileImageInput from '../../../components/fileImageInput/FileImageInput'
import book_mockup from '../../../../../assets/book_mockup.png'

const Form: React.FC<{ author?: Author }> = ({ author }) => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [imageLink, setImageLink] = useState(book_mockup)
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

        {/* Image */}
        <div className={styles.form__item}>
          <label htmlFor='author-img'>Image</label>
          <FileImageInput
            fileImageUrl={imageLink}
            setFileImageUrl={setImageLink}
            type='authors'
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
