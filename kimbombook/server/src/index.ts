import express from 'express'
import bookRouter from './routes/books'

const app = express()
app.use(express.json())

const PORT = 3000

app.get('/ping', (_req, res) => {
  console.log('Someone pinged here!')
  res.send('pong');
});

app.use('/api/books', bookRouter)

app.listen(PORT, () => {
  console.log(`Server running on port  ${PORT}`)
})
