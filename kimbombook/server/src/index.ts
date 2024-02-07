import express from 'express'
import mongoose from 'mongoose'
import { config } from 'dotenv'
config()

import bookRouter from './routes/books'

// import Book from './models/Book'

const app = express()

app.use(express.json())

const PORT = 3000

app.use('/api/books', bookRouter)

mongoose.connect(process.env.MONGO_URL!).then(() => {
  console.log(`Listening on PORT ${PORT}`)
  app.listen(PORT)
})
