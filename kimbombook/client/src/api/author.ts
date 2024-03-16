import axios from 'axios'
import { API_URL } from './config'
import { type ListOfAuthors, type Author } from '../types'

export async function getAuthors (): Promise<ListOfAuthors> {
  const response = await axios.get(`${API_URL}/authors`)
  const data = await response.data
  return data
}

export async function createAuthor (name: string, imageLink: string): Promise<Author> {
  const response = await axios.post(`${API_URL}/authors`, {
    name,
    imageLink
  }, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return response.data
}

export async function getAuthorById (id: string): Promise<Author> {
  console.log('Getting author by id:', id)
  const response = await axios.get(`${API_URL}/authors/${id}`)
  return response.data
}
