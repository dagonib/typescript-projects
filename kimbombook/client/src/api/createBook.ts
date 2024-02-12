import { API_URL } from './config'
import { type Book } from '../types'
import { type ECategory, type ELanguage } from '../enums'

export async function createBook (title: string, author: string, description: string, imageLink: string, category: ECategory, language: ELanguage, link: string, available: boolean): Promise<Book> {
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
