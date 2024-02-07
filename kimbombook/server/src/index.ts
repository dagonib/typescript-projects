import express from 'express'
import mongoose from 'mongoose'
import bookRouter from './routes/books'

// import Book from './models/Book'

const app = express()

app.use(express.json())

const PORT = 3000

app.use('/api/books', bookRouter)

mongoose.connect(
  'mongodb+srv://dgonzalezi:mesaBlanca24@kimbombook.daus0jo.mongodb.net/'
).then(() => {
  console.log(`Listening on PORT ${PORT}`)
  app.listen(PORT)
})
