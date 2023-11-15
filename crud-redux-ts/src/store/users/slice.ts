import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const DEFAULT_STATE = [
    {
        id: "1",
        name: "Peter Doe",
        email: "peter@gmail.com",
        github: "peter",
    },
    {
        id: "2",
        name: "David Gon",
        email: "peter@gmail.com",
        github: "dagonib",
    },
    {
        id: "3",
        name: "Miguel Angel",
        email: "peter@gmail.com",
        github: "midudev",
    }
]

export type UserId = string

export interface User {
    name: string,
    email: string,
    github: string
}

export interface UserWithId extends User {
    id: UserId
}

const initialState: UserWithId[] = (() => {
    const persistedState = localStorage.getItem("__redux__state__")
    if (persistedState) {
        return JSON.parse(persistedState).users
    }
    return DEFAULT_STATE
})()

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addNewUser: (state, action: PayloadAction<User>) => {
            const id = crypto.randomUUID()
            state.push({ id, ...action.payload })
        },
        deleteUserById: (state, action: PayloadAction<UserId>) => {
            const id = action.payload
            return state.filter((user) => user.id !== id)
        },
        rollbackUser: (state, action: PayloadAction<UserWithId>) => {
            const isUserAlreadyDefined = state.some(user => user.id === action.payload.id)
            if (!isUserAlreadyDefined) {
                state.push(action.payload)
            }
        }
    }
})

export default usersSlice.reducer

export const { addNewUser, deleteUserById, rollbackUser } = usersSlice.actions