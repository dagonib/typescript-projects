import Table from '../components/table/Table'
import './AuthorsPage.css'

const AuthorsPage: React.FC = () => {
  return (
    <div className='admin-authors baselayout__content'>
      <h1>Authors</h1>
      <Table />
    </div>
  )
}

export default AuthorsPage
