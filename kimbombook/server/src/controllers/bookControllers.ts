import { Request, Response } from 'express'
import BookModel from '../models/BookModel'
import AuthorModel from '../models/AuthorModel'
import CategoryModel from '../models/CategoyModel'

export async function getBooksController (_req: Request, res: Response) {
  const books = await BookModel.find()
  res.json(books)
}

export async function createBookController (req: Request, res: Response) {
  const author = await AuthorModel.findOne({ _id: req.body.author })

  if (!author) {
    return res.status(404).json({ error: 'Author not found' });
  }
  let categoriesIds: string[] | null = null
  if (req.body.categories) { 
    const categories = await CategoryModel.find({ _id: { $in: req.body.categories } })
    if(categories.length === 0) {
      return res.status(404).json({ error: 'Category not found' })  
    }
    categoriesIds = categories.map(category => category._id.toString()) as string[]
  }
 
  const newBook = new BookModel({
    title: req.body.title,
    author: author?._id,
    description: req.body.description,
    imageLink: req.body.imageLink,
    categories: categoriesIds,
    language: req.body.language,
    link: req.body.link,
    available: req.body.available
  })
  const createdBook = await newBook.save()
  res.json(createdBook)
  return
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

  if (!existingBook) {
    return res.status(404).json({ error: 'Book not found' })  
  }

  let authorId: string | null = null
  if (req.body.author) { 
    const author = await AuthorModel.findOne({ name: req.body.author })
    if(!author) {
      return res.status(404).json({ error: 'Author not found' })  
    } 
    authorId = author._id.toString()
  }

  let categoriesIds: string[] | null = null
  if (req.body.category) { 
    const categories = await CategoryModel.find({ name: { $in: req.body.category } })
    if(categories.length === 0) {
      return res.status(404).json({ error: 'Category not found' })  
    }
    categoriesIds = categories.map(category => category._id.toString()) as string[]
  }

  if (existingBook !== null) {
    existingBook.title = req.body.title || existingBook.title 
    existingBook.author = authorId || existingBook.author
    existingBook.description  = req.body.description  || existingBook.description
    existingBook.imageLink  = req.body.imageLink  || existingBook.imageLink
    existingBook.categories = categoriesIds || existingBook.categories
    existingBook.language = req.body.language || existingBook.language
    existingBook.link = req.body.link || existingBook.link
    existingBook.available = req.body.available !== undefined ? req.body.available : existingBook.available
  }
  
  const updatedBook = await existingBook?.save()
  res.json(updatedBook)
  return
}