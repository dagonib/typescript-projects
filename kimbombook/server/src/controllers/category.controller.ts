import { Request, Response } from 'express'
import CategoryModel from '../models/CategoyModel'

export async function createCategoryController (req: Request, res: Response) {
  const newCategory = new CategoryModel({
    name: req.body.name,
    description: req.body.description
  })
  const createdCategory = await newCategory.save()
  res.json(createdCategory)
}

export async function getCategoriesController (_req: Request, res: Response) {
  const categories = await CategoryModel.find()
  res.json(categories)
}

export async function getCategoryController (req: Request, res: Response) {
  const category = await CategoryModel.findById(req.params.id)
  res.json(category)
}

export async function deleteCategoryController (req: Request, res: Response) {
  const category = await CategoryModel.findByIdAndDelete(req.params.id)
  res.json(category)
}

export async function updateCategoryController (req: Request, res: Response) {
  const category = await CategoryModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
  res.json(category)
}

