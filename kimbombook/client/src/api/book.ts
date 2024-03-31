import axios from 'axios'
import { API_URL } from './config'
import { type ListOfBooks, type Book } from '../types'
import { type ELanguage } from '../enums'
import { useAuthStore } from '../store/auth.store'

export async function createBook (title: string, author: string, description: string, imageLink: string, categories: string[], language: ELanguage, link: string, available: boolean): Promise<Book> {
  const response = await fetch(`${API_URL}/books`, {
    method: 'POST',
    body: JSON.stringify({
      title,
      author,
      description,
      imageLink,
      categories,
      language,
      link,
      available
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return await response.json()
}

export async function updateBook (bookId: string, title: string, author: string, description: string, imageLink: string, categories: string[], language: ELanguage, link: string, available: boolean): Promise<Book> {
  const response = await axios.put(`${API_URL}/books/${bookId}`, {
    title,
    author,
    description,
    imageLink,
    categories,
    language,
    link,
    available
  }, {
    headers: {
      'Content-Type': 'application/json'
    }
  })

  return response.data
}

export async function deleteBook (bookId: string): Promise<void> {
  const token = useAuthStore.getState().token
  await fetch(`${API_URL}/books/${bookId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export async function getBookById (bookId: string): Promise<Book> {
  const response = await axios.get(`${API_URL}/books/${bookId}`)
  const data = await response.data
  return data
}

export async function getBooks (column: string | null = null, order: string | null = null, searchValue: string | null = null): Promise<ListOfBooks> {
  let url = `${API_URL}/books`
  const params = new URLSearchParams()

  if (column !== null && order !== null) {
    params.append('column', column)
    params.append('order', order)
  }

  if (searchValue !== null) {
    params.append('searchValue', searchValue)
  }

  url += `?${params.toString()}`

  const response = await axios.get(url)
  const data = await response.data
  return data
}

export async function getBooksByCategory (categoryId: string): Promise<ListOfBooks> {
  const response = await axios.get(`${API_URL}/books/category/${categoryId}`)
  const data = await response.data
  return data
}
