import { API_URL } from './config'
import { type Book } from '../types'

export async function createBook (title: string, author: string, description: string, imageLink: string, category: string, language: string, link: string, available: string): Promise<Book> {
  const response = await fetch(`${API_URL}/books`, {
    method: 'POST',
    body: JSON.stringify({
      title,
      author,
      description,
      imageLink,
      category,
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
