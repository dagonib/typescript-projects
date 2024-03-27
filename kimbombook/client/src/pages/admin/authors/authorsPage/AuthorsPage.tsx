import { useEffect } from 'react'
import { useAuthorStore } from '../../../../store/author.store'
import Table from '../components/table/Table'
import './AuthorsPage.css'

const AuthorsPage: React.FC = () => {
  const columns = ['name', 'imgLink', 'actions']
  const fetchAuthorsStore = useAuthorStore(state => state.fetchAuthorsStore)
  const authors = useAuthorStore(state => state.authors)

  useEffect(() => {
    async function fetchAuthorsFromStore (): Promise<void> {
      try {
        await fetchAuthorsStore()
      } catch (error) {
        console.error('Error fetching authors from store: ', error)
      }
    }
    fetchAuthorsFromStore().catch(error => { console.error('Error fetching authors: ', error) })
  }, [fetchAuthorsStore, authors])

  return (
    <div className='admin-authors baselayout__content'>
      <h1>Authors</h1>
      <Table
        columns={columns}
        entries={authors}
      />
    </div>
  )
}

export default AuthorsPage
