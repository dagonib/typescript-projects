import mongoose from "mongoose"

const Schema = mongoose.Schema

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
})

const CategoryModel = mongoose.model('CategoryModel', CategorySchema)

export default CategoryModel
