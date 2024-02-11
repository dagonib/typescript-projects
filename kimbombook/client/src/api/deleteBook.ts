import { API_URL } from './config'

export async function deleteBook (bookId: string): Promise<void> {
  await fetch(`${API_URL}/books/${bookId}`, {
    method: 'DELETE'
  })
}
