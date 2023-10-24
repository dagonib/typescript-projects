import React from 'react'
import userEvent from '@testing-library/user-event'
import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from '../src/App'

describe('<App />', () => {
    // test('should work', () => {
    //     render(<App />)

    //     expect(
    //         screen.getByText('Prueba técnica de React')
    //     ).toBeDefined()
    // })

    test('should add a items and remove then', async () => {
        const user = userEvent.setup()

        render(<App />)

        // Buscar el input
        const input = screen.getByRole('textbox')
        expect(input).toBeDefined()

        // Buscar el form
        const form = screen.getByRole('form')
        expect(form).toBeDefined()

        const button = form.querySelector('button')
        expect(button).toBeDefined()

        const randomText = crypto.randomUUID()
        await user.type(input, randomText)
        await user.click(button!)
        screen.debug()

        // Asegurar que el elemento se ha agregado
        // Recuperar la lista
        const list = screen.getByRole('list')
        expect(list).toBeDefined()

        expect(list.childNodes.length).toBe(1)

        // Comprobar que se puede borrar
        const item = screen.getByText(randomText)
        const removeButton = item.querySelector('button')
        expect(removeButton).toBeDefined()

        await user.click(removeButton!)

        // Comprobar que no haya elementos en la lista
        const noResults = screen.getByText('No hay elementos en la lista')
        expect(noResults).toBeDefined()
    })

})