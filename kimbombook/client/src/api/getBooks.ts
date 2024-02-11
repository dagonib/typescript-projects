import { type ListOfBooks } from '../types'
import { API_URL } from './config'

export async function getBooks (): Promise<ListOfBooks> {
  const response = await fetch(`${API_URL}/books`)
  const data = await response.json()
  return data
}
