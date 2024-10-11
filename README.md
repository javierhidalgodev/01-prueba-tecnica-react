https://gist.github.com/brandovidal/153d30bb6f639ad26e1796bb010af8c8#ejercicio-1-a%C3%B1adir-y-eliminar-elementos-de-una-lista-react

Ejercicio 1. Añadir y eliminar elementos de una lista (React) Requisitos: Tener instalado Nodejs (v16.x.x o superior). Tener instalado npm.

Duración máxima: 40 minutos

Enunciado:

Crear una app en React que implemente un campo de texto y botón para añadir un elemento.

Cuando se hace click en el botón, el texto en el campo de entrada debe agregarse a continuación en una lista de elementos.

Además, cada vez que se hace click en cualquier elemento de la lista, debe eliminarse de la lista.

- [ ] Dar importancia a la funcionalidad y usabilidad, más que al diseño visual.
- [ ] El código debe ser enteramente desarrollado en Typescript.

---

Lista de seguimiento de tareas:

### Primeros pasos y generación de la UI

- [x] Iniciar proyecto con `create vite@latest` y repositorio.
- [x] Reutilizar código `CSS` y limpiar componentes y carpetas.
- [x] Iniciar interfaz de usuario básica con representación de datos ficticia.

### Funcionalidad

- [x] Función de agregado de elementos a la lista.
  - [x] Tipar correctamente (interfaces).
  - [x] Se pueden usar varias estrategias, como `FormData`. En este ocasión se recomienda acceder a los `elements` del formulario, y llamar al `input` por su nombre (`name`) con `namedItem`. Además se comprueba que sea un `input instaceof HTMLInputElement` para recuperar correctamente su `value`. Hecho esto se crea el nuevo item y se modifica el estado.
  - [x] Para la modificación del estado se recomienda usar la función de recuperación del estado previo.

```ts
setItem(prevItems => [...prevItems, newItem])
```
- [x] Función para eliminar elementos de la lista:
  - [x] Se recomienda crear una función que se encargue de crear una función para cada uno de los elementos de la lista, aciendo más eficaces las operaciones.

```ts
const createHandleRemoveItem = (id: ItemID) => {
  return () => {
    setItems(prevItems => {
      return prevItems.filter(currentItem.id !== id)
    })
  }
}
```

### Testing

- [x] Instalar dependencias
```
npm i -D vitest happy-dom @testing-library/react @testing-library/user-event
```
- [x] Utilizar las funciones de `render` y `screen` de `@testing-library/react`, junto con las funciones que provee `@testing-library/user-event`, para simular un usuario que realice acciones de navegador.

### Refactoring

- [x] Creación de un componente `Item` que sea renderizado por cada elemento de la lista.
- [x] Creación de un `customHook` para la gestión del estado de los elementos, así como las funciones para crear y eliminar elementos `useItems`.

### Testing de HOOKS

- [x] Nos traemos `renderHook` y `act` de `@testing-library/react`.
- [x] Renderizamos el `useEffect` por medio de un *callback*, y extraemos la propiedad `results`.
- [x] Nos damos cuenta que también tiene una propiedad `rerender()`. Esta función renderiza de nuevo el *custom hoook*, pero suele tener más sentido para ver la reacción del mismo a elementos que afectan desde fuera, como podrian ser las *props*.

### Ejercicios propuestos

- [ ] Utilizar `reducer` en las acciones del *custom hook*.
- [ ] Testear `useSEO()`.
- [ ] *Responsive design*.