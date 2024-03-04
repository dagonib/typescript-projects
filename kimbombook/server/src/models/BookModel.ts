import mongoose from "mongoose";
import { ELanguage } from "../enums";

const Schema = mongoose.Schema
// const ObjectId = mongoose.Types.ObjectId

const BookSchema = new Schema({
  title: String,
  author: String,
  description: String,
  imageLink: String,
  categories: [String],
  language: {
    type: String,
    enum: Object.values(ELanguage)
  },
  link: String,
  available: Boolean,
})

const BookModel = mongoose.model("BookModel", BookSchema)
export default BookModel