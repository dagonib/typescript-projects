import { type Middleware, configureStore } from '@reduxjs/toolkit'
import usersReducer, { rollbackUser } from './users/slice'
import { toast } from 'sonner'

const persistanceLocalStorageMiddleware: Middleware = (store) => (next) => (action) => {
    next(action)
    localStorage.setItem('__redux__state__', JSON.stringify(store.getState()))
}

const syncWithDatabase: Middleware = store => next => action => {
    const { type, payload } = action
    const previousState = store.getState()
    // Fase 1
    next(action)

     // Fase 2
    if (type === 'users/deleteUserById') {
        const userIdToRemove = payload
        const userToRemove = previousState.users.find(user => user.id === userIdToRemove)

        fetch(`https://jsonplaceholder.typicode.cdfom/users/${userIdToRemove}`, {
            method: 'DELETE'
        })
            .then(res => {
                if (res.ok) {
                    toast.success(`Usuario ${payload} eliminado correctamente`)
                }
                throw new Error('Error al eliminar el usuario')
            })
            .catch((err) => {
                toast.error(`Error deleting user ${userIdToRemove}`)
                if (userToRemove) store.dispatch(rollbackUser(userToRemove))
                console.log(err)
            })
    }

    if (type === 'users/addNewUser') {
        console.log(payload)
        fetch(`https://jsonplaceholder.typicode.com/users/`, {
            method: 'POST',
            body: JSON.stringify({
                name: payload.name,
                email: payload.email
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
            .then(res => {
                if (res.ok) {
                    console.log(res.ok)
                    toast.success(`Usuario ${payload.name} creado correctamente`)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

export const store = configureStore({
    reducer: {
        users: usersReducer
    },
    middleware: [persistanceLocalStorageMiddleware, syncWithDatabase]
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
