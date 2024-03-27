import axios from 'axios'
import { API_URL } from './config'
import { type ListOfCategories, type Category } from '../types'

export async function getCategories (column: string | null = null, order: string | null = null, searchValue: string | null = null): Promise<ListOfCategories> {
  let url = `${API_URL}/categories`

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

export async function createCategory (name: string, description: string): Promise<Category> {
  const response = await axios.post(`${API_URL}/categories`, {
    name,
    description
  }, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return response.data
}

export async function getCategoryById (id: string): Promise<Category> {
  const response = await axios.get(`${API_URL}/categories/${id}`)
  return response.data
}

export async function getNameCategoryById (id: string): Promise<string> {
  const response = await axios.get(`${API_URL}/categories/name/${id}`)
  return response.data
}

export async function updateCategory (id: string, name: string, description: string): Promise<Category> {
  const response = await axios.put(`${API_URL}/categories/${id}`, {
    name,
    description
  }, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return response.data
}

export async function deleteCategory (id: string): Promise<Category> {
  const response = await axios.delete(`${API_URL}/categories/${id}`)
  return response.data
}
