import express from 'express'
// import * as bookServices from '../services/bookServices'
// import { toNewBook } from '../utils/book-utils'

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

// router.get('/', (_req, res) => {
//   res.send(bookServices.getBooksWithoutInfo())
// })

// router.get('/:id', (req, res) => {
//   const book = bookServices.findBookById(+req.params.id)
  
//   return book !== null
//     ? res.send(book)
//     : res.sendStatus(404)
// })

// Local post
// router.post('/', (req, res) => {
//   try {
//     const newBook = toNewBook(req.body)
  
//     const addedBook = bookServices.addBook(newBook)
  
//     res.json(addedBook)

//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   } catch (e: any) {
//     res.status(400).send(e.message)
//   }
// })



export default router