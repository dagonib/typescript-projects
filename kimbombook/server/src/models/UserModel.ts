import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

interface UserDocument extends mongoose.Document {
  email: string;
  password: string;
  hashPassword(): Promise<void>;
  comparePassword(password: string): Promise<boolean>
}

const Schema = mongoose.Schema

const userSchema = new Schema<UserDocument>({
  email: String,
  password: String
})

userSchema.methods.hashPassword = async function (): Promise<void> {
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
}

userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  return await bcrypt.compare(password, this.password)
}

const UserModel = mongoose.model("users", userSchema)
export default UserModel