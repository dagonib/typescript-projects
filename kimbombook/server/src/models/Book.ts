import mongoose from "mongoose";
// import { Category, Language } from "../enums";

const Schema = mongoose.Schema
// const ObjectId = mongoose.Types.ObjectId

const BookSchema = new Schema({
  // id: Number,
  title: String,
  // description: String,
  // imageLink: String,
  // category: Category,
  // language: Language,
  // link: String,
  // available: Boolean,
})

const BookModel = mongoose.model("Book", BookSchema)
export default BookModel