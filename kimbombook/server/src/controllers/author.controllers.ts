import { Request, Response } from 'express'
import AuthorModel from '../models/AuthorModel'

export async function createAuthorController (req: Request, res: Response) {
  const newAuthor = new AuthorModel({
    name: req.body.name,
    imageLink: req.body.imageLink
  })
  const createdAuthor = await newAuthor.save()
  res.json(createdAuthor)
}

export async function getAuthorsController (req: Request, res: Response) {
  const { column, order, searchValue } = req.query

  try {
    let query = AuthorModel.find()
    const sortOrder = {}

    if (column && order) {
      sortOrder[column as string] = order === 'asc' ? 1 : -1
    }

    if (searchValue) {
      const regex = new RegExp(searchValue as string, 'i')
      query = query.or([{ name: regex }])
    }

    if (Object.keys(sortOrder).length > 0) {
      query = query.sort(sortOrder)
    }
    const authors = await query.exec()
    res.json(authors)
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
}

export async function getAuthorController (req: Request, res: Response) {
  const author = await AuthorModel.findById(req.params.id)
  res.json(author)
}

export async function deleteAuthorController (req: Request, res: Response) {
  const author = await AuthorModel.findByIdAndDelete(req.params.id)
  res.json(author)
}

export async function updateAuthorController (req: Request, res: Response) {
  const author = await AuthorModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
  res.json(author)
}
