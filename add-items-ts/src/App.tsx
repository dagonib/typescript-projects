import { useEffect } from 'react'
import './App.css'
import { Item } from './components/Item'
import { useItems } from './hooks/useItems'
import { useSEO } from './hooks/useSeo'

export type ItemId = `${string}-${string}-${string}-${string}-${string}`

export interface Item {
  id: ItemId
  timestamp: number
  text: string
}

function App() {
 const { items, addItem, removeItem } = useItems()

 useSEO({
  title: `[${items.length}] Prueba técnica de React`,
  description: 'Añadir y eliminar elementos de una lista'
 })

 useEffect(() => {
  localStorage.setItem('elements', JSON.stringify(items))
 }, [items])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const { elements } = event.currentTarget

    const input = elements.namedItem('item')
    const isInput = input instanceof HTMLInputElement
    if (!isInput || input == null) return

    addItem(input.value)

    input.value = ''
  }

  const createHandleRemvoveItem = (id: ItemId) => () => {
    removeItem(id)
  }

  return (
    <main>
      <aside>
        <h1>App React - TypeScript</h1>
        <h3>Añadir y eliminar elementos de una lista</h3>
        <form onSubmit={handleSubmit} aria-label='Añadir elementos a la lista'>
          <label>
            Elemento a introducir
            <input 
              name='item'
              required
              type='text'
              placeholder='videojuegos'
            />
          </label>
          <button>Añadir elemento a la lista</button>
        </form>
      </aside>

      <section>
        <h2>Lista de elementos</h2>
        
          {
            items.length === 0 ? (
              <p>
                No hay elementos en la lista
              </p>
            ) : (
              <ul>
                {
                  items.map((item) => {
                    return (
                      <Item 
                        {...item} 
                        handleClick={createHandleRemvoveItem(item.id)} 
                        key={item.id} 
                      />
                    )
                  })
                }
              </ul>
            )
          }
        
      </section>
    </main>
  )
}

export default App
