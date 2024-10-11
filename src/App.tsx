import './App.css'
import { Item } from './components/Item'
import { useItems } from './hooks/useItem'
import { useSEO } from './hooks/useSEO'

const SEO = {
  title: 'Prueba técnica React',
  description: 'Prueba técnica de React para comprobar las capacidades de un aspirante al puesto'
}

function App() {
  // * Se recupera del custom hook todo lo necesario para el funcionamiento del componente
  const { items, addItem, removeItem } = useItems()

  // SEO
  useSEO({
    title: `[${items.length}] - Prueba técnica`,
    description: SEO.description
  })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const { elements } = event.currentTarget

    // Lo correcto es comprobar que el input existe y sea una instanci de HTMLInputElement para poder acceder al value, y operar en consecuencia.
    const input = elements.namedItem('item')
    const isInput = input instanceof HTMLInputElement // JavaScript puro

    if (!isInput) return

    addItem(input.value)

    input.value = ''
  }

  // Para manejar la eliminación de tareas es mejor crear una función
  const createHandleRemoveItem = (id: string) => {
    return () => {
      removeItem(id)
    }
  }

  return (
    <main>
      <aside>
        <h1>Prueba técnica</h1>
        <form onSubmit={handleSubmit} aria-label='Formulario para añadir elementos a una lista'>
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
        {
          items.length === 0
            ? <p>No elements here!</p>
            : <ul>{
              items.map(item => {
                return (
                  <Item {...item} key={item.id} handleClick={createHandleRemoveItem(item.id)} />
                )
              })
            }</ul>
        }
      </section>
    </main>
  )
}

export default App
