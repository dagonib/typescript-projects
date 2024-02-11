import { Request, Response } from 'express'
import BookModel from '../models/BookModel'

export async function getBooksController (_req: Request, res: Response) {
  const books = await BookModel.find()
  res.json(books)
}

export async function createBookController (req: Request, res: Response) {
  const newBook = new BookModel({
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
    imageLink: req.body.imageLink,
    category: req.body.category,
    language: req.body.language,
    link: req.body.link,
    available: req.body.available
  })
  const createdBook = await newBook.save()
  res.json(createdBook)
}

export async function deleteBookController (req: Request, res: Response) {
  const bookId = req.params.bookId
  const book = await BookModel.findByIdAndDelete(bookId)
  res.json(book)
}