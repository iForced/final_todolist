import {Dispatch} from "redux";
import {todolists_api} from "../api/todolists_api";

enum TodolistActions {
    SET_TODOLISTS= 'SET_TODOLISTS',
    ADD_TODOLIST = 'ADD_TODOLIST',
}

export type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}
type InitialStateType = Array<TodolistType>
type ActionsType = ReturnType<typeof setTodolists> | ReturnType<typeof addTodolist>

const initialState: InitialStateType = []

export const todolist_reducer = (state: InitialStateType = initialState, action: ActionsType) => {
    switch (action.type) {

        case TodolistActions.SET_TODOLISTS:
            return [...state, ...action.payload]

        case TodolistActions.ADD_TODOLIST:
            return [...state, action.payload]

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
export const addTodolist = (payload: TodolistType) => {
    debugger
    return {
        type: TodolistActions.ADD_TODOLIST,
        payload,
    } as const
}
export const getTodolistsThunk = () => (dispatch: Dispatch) => {
    todolists_api().getTodolists()
        .then(response => response.data)
        .then(data => {
            dispatch(setTodolists(data))
        })
}
export const createTodolistThunk = (title: string) => (dispatch: Dispatch) => {
    todolists_api().createTodolist(title)
        .then(response => response.data)
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(addTodolist(data.data.item))
            }
        })
}