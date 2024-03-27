import Table from '../components/table/Table'
import './categoriesPage.css'

const CategoriesPage: React.FC = () => {
  return (
    <div className='admin-categories baselayout__content'>
      <h1>Categories</h1>
      <Table />
    </div>
  )
}

export default CategoriesPage
