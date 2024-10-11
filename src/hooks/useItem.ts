import { useState } from "react"
import { ItemI } from "../components/Item"

// Mock temporal
export const itemsData: ItemI[] = [
    // {
    //   id: crypto.randomUUID(),
    //   timestamp: new Date(),
    //   name: 'Libros 📚'
    // },
    // {
    //   id: crypto.randomUUID(),
    //   timestamp: new Date(),
    //   name: 'Películas 🎬'
    // },
]

// ? Estado, y funciones de creación/eliminación, pasan a un custom hook, y son exportadas al final

export const useItems = () => {
    const [items, setItems] = useState(itemsData)

    const addItem = (text: string) => {
        const newItem: ItemI = {
            id: crypto.randomUUID(),
            timestamp: new Date(),
            name: text
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
    }

    const removeItem = (id: string) => {
        setItems((prevItems) => {
            return prevItems.filter(currentItem => currentItem.id !== id)
        })
    }

    return {
        items,
        addItem,
        removeItem
    }
}