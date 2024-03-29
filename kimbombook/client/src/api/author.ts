import axios from 'axios'
import { API_URL } from './config'
import { type ListOfAuthors, type Author } from '../types'

export async function getAuthors (column: string | null = null, order: string | null = null, searchValue: string | null = null): Promise<ListOfAuthors> {
  let url = `${API_URL}/authors`

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
  const response = await axios.get(`${API_URL}/authors/${id}`)
  return response.data
}

export async function updateAuthor (id: string, name: string, imageLink: string): Promise<Author> {
  const response = await axios.put(`${API_URL}/authors/${id}`, {
    name,
    imageLink
  }, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return response.data
}

export async function deleteAuthor (id: string): Promise<Author> {
  const response = await axios.delete(`${API_URL}/authors/${id}`)
  return response.data
}
