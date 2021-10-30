import {Dispatch} from "redux";
import {todolists_api} from "../api/todolists_api";

enum TodolistActions {
    SET_TODOLISTS= 'SET_TODOLISTS',
}

type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}
type InitialStateType = Array<TodolistType>
type ActionsType = ReturnType<typeof setTodolists>

const initialState: InitialStateType = []

export const todolist_reducer = (state: InitialStateType = initialState, action: ActionsType) => {
    switch (action.type) {

        case TodolistActions.SET_TODOLISTS:
            return [...state, ...action.payload]

        default:
            return state
    }
}

export const setTodolists = (payload: Array<TodolistType>) => {
    return {
        type: TodolistActions.SET_TODOLISTS,
        payload,
    } as const
}
export const getTodolistsThunk = () => (dispatch: Dispatch) => {
    todolists_api().getTodolists()
        .then(response => response.data)
        .then(data => {
            dispatch(setTodolists([data]))
        })
}