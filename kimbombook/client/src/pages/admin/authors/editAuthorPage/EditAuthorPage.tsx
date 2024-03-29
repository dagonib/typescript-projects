// import styles from './editAuthorPage.module.css'

import { useParams } from 'react-router-dom'
import { type Author } from '../../../../types'
import { useEffect, useState } from 'react'
import Form from '../components/form/Form'
import { useAuthorStore } from '../../../../store/author.store'

const EditAuthorPage = (): JSX.Element => {
  const { authorId } = useParams<{ authorId: string }>()
  const [author, setAuthor] = useState<Author>()

  const getAuthorByIdStore = useAuthorStore(state => state.getAuthorByIdStore)

  useEffect(() => {
    async function fetchAuthorFromStore (): Promise<void> {
      try {
        if (authorId != null) {
          const author = await getAuthorByIdStore(authorId)
          setAuthor(author as Author | undefined)
        }
      } catch (error) {
        console.error('Error getting author information: ', error)
      }
    }
    fetchAuthorFromStore().catch(error => { console.error('Error fetching authors: ', error) })
  }, [])

  return (
    <div className='baselayout__content'>
      <h1>Edit Author</h1>
      { author !== null && <Form author={author} /> }
    </div>
  )
}

export default EditAuthorPage
