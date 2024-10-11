import { expect, describe, test } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useItems } from '../src/hooks/useItem'

describe('useItems hook', () => {
	test('should add and remove items', () => {
		const { result, rerender } = renderHook(() => useItems())
		// console.log(result.current)

		// Comprobamos que el elemento items esté vacío
		expect(result.current.items).toEqual([])

		// Añadimos un elemento a items y comprobamos que ahora tiene un elemento
		act(() => {
			result.current.addItem('Jugar a videojuegos')
			// result.current.addItem('Jugar a videojuegos')
		})
		expect(result.current.items.length).toBe(1)
		// ? Se puede usar rerender(), pero este está más enfocado a los cambios de props, o elementos que vengan de fuera, que al estado interno.
		
		// Borrar un elemento y comprobar los items
		act(() => {
			result.current.removeItem(result.current.items[0].id)
			})
		expect(result.current.items.length).toBe(0)

	})
})