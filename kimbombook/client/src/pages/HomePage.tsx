import { useEffect, useState } from 'react'
import { type ListOfBooks } from '../types'
import { getBooks } from '../api/getBooks'
import Books from '../components/Books/Books'
import Form from '../components/Form/Form'

const HomePage: React.FC = () => {
  const [books, setBooks] = useState<ListOfBooks>([])

  useEffect(() => {
    async function fetchBooks (): Promise<void> {
      const dbBooks = await getBooks()
      setBooks(dbBooks)
    }
    fetchBooks().catch(error => { console.error('Error fetching books: ', error) })
  }, [])

  return (
    <section className='home'>
      <Books books={books} />
      <Form />
    </section>
  )
}

export default HomePage
