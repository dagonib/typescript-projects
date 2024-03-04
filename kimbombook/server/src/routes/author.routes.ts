import express from 'express'
import {
  createAuthorController,
  deleteAuthorController,
  getAuthorController,
  getAuthorsController,
  updateAuthorController
} from '../controllers/author.controllers'


const router = express.Router()

router.post('/', createAuthorController)
router.get('/', getAuthorsController)
router.get('/:id', getAuthorController)
router.delete('/:id', deleteAuthorController)
router.put('/:id', updateAuthorController)

export default router