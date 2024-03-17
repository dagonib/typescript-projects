import express from 'express'
import { 
  createBookController, 
  deleteBookController, 
  getBooksController,
  getByIdBookController,
  updateBookController,
} from '../controllers/bookControllers'
import requireAuth from '../middlewares/requireAuth'

const router = express.Router()
// Mongodb 
router.post('/', createBookController)
router.get('/', getBooksController)
router.delete('/:bookId', requireAuth, deleteBookController)
router.get('/:bookId', getByIdBookController)
router.put('/:bookId', updateBookController)

export default router