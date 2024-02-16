import express from 'express'
import { 
  createBookController, 
  deleteBookController, 
  getBooksController 
} from '../controllers/bookControllers'

const router = express.Router()
// Mongodb 
router.post('/', createBookController)
router.get('/', getBooksController)
router.delete('/:bookId', deleteBookController)

export default router