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

export async function getCategoriesController (req: Request, res: Response) {
  const { column, order, searchValue } = req.query

  try {
    let query = CategoryModel.find()
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

    const categories = await query.exec()
    res.json(categories)
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
}

export async function getCategoryController (req: Request, res: Response) {
  const category = await CategoryModel.findById(req.params.id)
  res.json(category)
}

export async function getNameCategoryByIdController (req: Request, res: Response) {
  const category = await CategoryModel.findById(req.params.id)
  res.json(category?.name)
}

export async function deleteCategoryController (req: Request, res: Response) {
  const category = await CategoryModel.findByIdAndDelete(req.params.id)
  res.json(category)
}

export async function updateCategoryController (req: Request, res: Response) {
  const category = await CategoryModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
  res.json(category)
}

