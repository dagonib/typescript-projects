import { Book, NonInfoBook, newBookEntry } from '../types'
import bookData from './books.json'

const books: Array<Book> = bookData as Array<Book>

export const getBooks = (): Book[] => books

export const findBookById = (id: number): Book | undefined => {
  const book = books.find(book => book.id === id)
  return book
}

export const getBooksWithoutInfo = (): Array<NonInfoBook> => {
  return books.map(({ id, title, imageLink, link }) => {
    return {
      id,
      title,
      imageLink,
      link
    }
  })
}

// export const findBookWithoutInfoById = (id: number): NonInfoBook | undefined => {
//   const book = books.find(book => book.id === id)
//   if (book !== undefined) {
//     const { description, ...restOfBook } = book
//     return restOfBook
//   } 
//    return undefined
// }

export const addBook = (newBookEntry: newBookEntry): Book => {
  const newBook = {
    id: Math.max(...books.map(b => b.id)) + 1,
    ...newBookEntry
  }

  books.push(newBook)
  return newBook
}