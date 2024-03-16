import BooksAdmin from '../components/books-admin/BooksAdmin'
import './dashboardpage.css'
const DashBoardPage: React.FC = () => {
  return (
    <div className='admin-dashboard baselayout__content'>
      <BooksAdmin />
    </div>
  )
}

export default DashBoardPage
