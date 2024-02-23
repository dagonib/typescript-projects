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

export async function getByIdBookController (req: Request, res: Response) {
  const bookId = req.params.bookId

  const book = await BookModel.findById(bookId)
  res.json(book)
}

export async function updateBookController (req: Request, res: Response) {
  const bookId = req.params.bookId
  const existingBook = await BookModel.findById(bookId)

  if (existingBook !== null) {
    existingBook.title = req.body.title || existingBook.title
    existingBook.author = req.body.author || existingBook.author
    existingBook.description  = req.body.description  || existingBook.description
    existingBook.imageLink  = req.body.imageLink  || existingBook.imageLink
    existingBook.category = req.body.category || existingBook.category
    existingBook.language = req.body.language || existingBook.language
    existingBook.link = req.body.link || existingBook.link
    existingBook.available = req.body.available !== undefined ? req.body.available : existingBook.available
  }
  
  const updatedBook = await existingBook?.save()
  res.json(updatedBook)
}