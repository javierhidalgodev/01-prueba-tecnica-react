// Es importante la extesión .test.tsx para que Vitest lo pueda detectar
// npm i -D happy-dom vitest => PARA EL TESTING
// npm i -D @testing-library/react => TRAE FUNCIONES DE TESTING ESPECÍFICAS DE REACT
// npm i -D @testing-library/user-event => SIMULAR ACCIONES DE USUARIO PARA TEST E2E

// ! PREGUNTA TÍPICA DE ENTREVISTA:
// ! ¿Qué test harías a tu aplicación?
// ! Solo UNO: e2e (end to end)

import React from 'react';
import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../src/App'

describe('<App />', () => {
    // test('should work', () => {
    //     render(<App />) // Verificamos si se ha renderizado
    //     screen.debug() // Vemos lo que se ha renderizado en el HTML

    //     expect(
    //         screen.getByText('Pruea técnica')
    //     ).toBeDefined()
    // })

    test('should add/remove an item', async () => {
        // Generar un usuario
        const user = userEvent.setup()

        // Verificamos si se ha renderizado
        render(<App />)

        // Buscar campo de texto => Usar el role
        const input = screen.getByRole('textbox')
        expect(input).toBeDefined()

        // Buscar formulario: es imprescindible añadir aria-label="..." a la etiqueta
        const form = screen.getByRole('form')
        expect(form).toBeDefined()

        const button = form.querySelector('button')
        expect(button).toBeDefined()

        // El usuario escribe
        const randomText = crypto.randomUUID().toString()
        await user.type(input, randomText)
        // El usuario clicka el botón
        await user.click(button!)

        // Recuperar la lista y comprobar que tiene el nuevo elemento
        const list = screen.getByRole('list')
        expect(list).toBeDefined()
        expect(list.childNodes.length).toBe(1) // ! Los espacios cuentan como childeNodes
        
        // Buscar elemento añadido y borrar
        const addedItem = screen.getByText(randomText, { exact: false }) // ! Si el elemento tiene algún texto más no lo encuentra, da error. Tiene que ser match perfecto
        // Buscar el botón para eliminar
        const removeButton = addedItem.querySelector('button')
        expect(removeButton).toBeDefined()
        
        // Eliminar elemento
        await user.click(removeButton!)
        
        // expect(list.childNodes.length).toBe(2)
        const noResults = screen.getByText('No elements here!')
        expect(noResults).toBeDefined()
    })
})