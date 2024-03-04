import mongoose from "mongoose"

const Schema = mongoose.Schema

const AuthorSchema = new Schema({ 
  name: String,
  imageLink: String,
})

const AuthorModel = mongoose.model("AuthorModel", AuthorSchema) 
export default AuthorModel
