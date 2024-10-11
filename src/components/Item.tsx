// Interfaz
export interface ItemI {
    id: string,
    timestamp: Date,
    name: string
}

export const Item = (
    { name, timestamp, handleClick } :
    { name: string, timestamp: Date, handleClick: () => void }) => {
    return (
        <li>
            {name} - Añadido {timestamp.toLocaleDateString()}
            {/* <button onClick={() => setItems((prevItems) => {
                    return prevItems.filter(i => i.id !== item.id)
                  })}>Delete</button> */}
            <button onClick={handleClick}>Delete</button>
        </li>
    )
}