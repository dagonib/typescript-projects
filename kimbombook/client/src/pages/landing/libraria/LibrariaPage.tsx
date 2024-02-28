import './librariapage.css'
import Books from '../components/Books/Books'
import { FilterProvider } from '../../../context/FilterProvider'
import Filters from '../components/Filters/Filters'

const LibrariaPage: React.FC = () => {
  return (
    <FilterProvider>
      <main className='libraria'>
        <div className='libraria__sidebar'>
          <Filters />
        </div>

        <div className='libraria__body'>
          <h1>Catálogo</h1>
          <Books />
        </div>
      </main>
    </FilterProvider>
  )
}

export default LibrariaPage
