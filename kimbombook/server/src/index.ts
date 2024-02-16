import { config } from 'dotenv'
config()

import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

import bookRouter from './routes/bookRoutes'
import authRoutes from './routes/auth.routes'

// import Book from './models/Book'
const PORT = 3000

const app = express()

app.use(cors({ 
  origin: '*',
  credentials: true  
}))
app.use(express.json())

app.use('/api/books', bookRouter)
app.use('/api/auth', authRoutes)

mongoose.connect(process.env.MONGO_URL!).then(() => {
  console.log(`Listening on PORT ${PORT}`)
  app.listen(PORT)
})
