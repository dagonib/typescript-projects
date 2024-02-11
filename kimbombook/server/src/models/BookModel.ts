import mongoose from "mongoose";
import { ECategory, ELanguage } from "../enums";

const Schema = mongoose.Schema
// const ObjectId = mongoose.Types.ObjectId

const BookSchema = new Schema({
  title: String,
  author: String,
  description: String,
  imageLink: String,
  category: {
    type: String,
    enum: ECategory
  },
  language: {
    type: String,
    enum: ELanguage
  },
  link: String,
  available: Boolean,
})

const BookModel = mongoose.model("BookModel", BookSchema)
export default BookModel