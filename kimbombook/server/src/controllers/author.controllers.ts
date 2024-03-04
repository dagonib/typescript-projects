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

export async function getAuthorsController (_req: Request, res: Response) {
  const authors = await AuthorModel.find()
  res.json(authors)
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
