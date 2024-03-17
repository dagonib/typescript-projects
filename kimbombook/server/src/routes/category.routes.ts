import express from 'express'
import { 
  createCategoryController,
  deleteCategoryController,
  getCategoriesController,
  getCategoryController,
  getNameCategoryByIdController,
  updateCategoryController 
} from '../controllers/category.controller'

const router = express.Router()

router.post('/', createCategoryController)
router.get('/', getCategoriesController)
router.get('/:id', getCategoryController)
router.delete('/:id', deleteCategoryController)
router.put('/:id', updateCategoryController)
router.get('/name/:id', getNameCategoryByIdController)

export default router
