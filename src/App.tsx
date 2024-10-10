import { useState } from 'react'
import './App.css'

// Interfaz
export interface ItemI {
  id: string,
  timestamp: Date,
  name: string
}

// Mock temporal
export const itemsData: ItemI[] = [
  {
    id: crypto.randomUUID(),
    timestamp: new Date(),
    name: 'Libros 📚'
  },
  {
    id: crypto.randomUUID(),
    timestamp: new Date(),
    name: 'Películas 🎬'
  },
]

function App() {
  const [items, setItems] = useState(itemsData)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const { elements } = event.currentTarget

    // Lo correcto es comprobar que el input existe y sea una instanci de HTMLInputElement para poder acceder al value, y operar en consecuencia.
    const input = elements.namedItem('item')
    const isInput = input instanceof HTMLInputElement // JavaScript puro

    if (!isInput) return

    const newItem: ItemI = {
      id: crypto.randomUUID(),
      timestamp: new Date(),
      name: input.value
    }

    // Mala práctica, ya que no podemos asegurar que tenemos la último versión del estado
    /* setItems([
      ...items,
      newItem
    ]) */

    // Nos aseguramos que SIEMPRE tendremos la última versión del estado, independientemente de los cambios que pueda haber.
    setItems((prevItems) => {
      return [...prevItems, newItem]
    })

    input.value = ''
  }

  return (
    <main>
      <aside>
        <h1>Prueba técnica</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="">
            Elemento a introducir:
          </label>
          <input
            type="text"
            name="item"
            id=""
            placeholder='Lo que sea para previsualizar bro!'
            required />

          <button type='submit'>Añadir</button>
        </form>
      </aside>
      <section>
        <h2>Lista de elementos</h2>
        <ul>
          {
            items.map(item => {
              return (
                <li key={item.id}>
                  {item.name} - Añadido {item.timestamp.toLocaleDateString()}
                  <button onClick={() => setItems((prevItems) => {
                    return prevItems.filter(i => i.id !== item.id)
                  })}>Delete</button>
                </li>
              )
            })
          }
        </ul>
      </section>
    </main>
  )
}

export default App
