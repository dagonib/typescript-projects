import axios from 'axios'
import { type ListOfBooks } from '../types'
import { API_URL } from './config'

export async function getBooks (): Promise<ListOfBooks> {
  const response = await axios.get(`${API_URL}/books`)
  const data = await response.data
  return data
}
