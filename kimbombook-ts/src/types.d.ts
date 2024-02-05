export interface Book {
  id: string
  title: string
  description: string
  imageLink: string
  category: string[]
  language: string
  link: string
}

export type BookId = Pick<Book, 'id'>

export type ListOfBooks = Book[]
