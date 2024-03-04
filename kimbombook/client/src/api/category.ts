import axios from 'axios'
import { API_URL } from './config'
import { type ListOfCategories, type Category } from '../types'

export async function getCategories (): Promise<ListOfCategories> {
  const response = await axios.get(`${API_URL}/categories`)
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
