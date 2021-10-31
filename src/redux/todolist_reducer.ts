import {Dispatch} from "redux";
import {todolists_api} from "../api/todolists_api";

enum TodolistActions {
    SET_TODOLISTS = 'SET_TODOLISTS',
    ADD_TODOLIST = 'ADD_TODOLIST',
    DELETE_TODOLIST = 'DELETE_TODOLIST',
    CHANGE_TODOLIST_TITLE = 'CHANGE_TODOLIST_TITLE',
}

export type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}
type InitialStateType = Array<TodolistType>
type ActionsType = ReturnType<typeof setTodolists> | ReturnType<typeof addTodolist> | ReturnType<typeof deleteTodolist> | ReturnType<typeof changeTodolistTitle>

const initialState: InitialStateType = []

export const todolist_reducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {

        case TodolistActions.SET_TODOLISTS:
            return [...state, ...action.payload]

        case TodolistActions.ADD_TODOLIST:
            return [...state, action.payload]

        case TodolistActions.DELETE_TODOLIST:
            return state.filter(tl => tl.id !== action.payload)

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
export const deleteTodolist = (payload: string) => {
    return {
        type: TodolistActions.DELETE_TODOLIST,
        payload,
    } as const
}
//TODO разобраться с параметрами (пэйлоад)
export const changeTodolistTitle = (payload: string) => {
    return {
        type: TodolistActions.CHANGE_TODOLIST_TITLE,
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
            data.resultCode === 0 && dispatch(addTodolist(data.data.item))
        })
}
export const deleteTodolistThunk = (todolistId: string) => (dispatch: Dispatch) => {
    todolists_api().deleteTodolist(todolistId)
        .then(response => response.data)
        .then(data => {
            data.resultCode === 0 && dispatch(deleteTodolist(todolistId))
        })
}
//TODO разобраться с параметрами (тайтл)
export const changeTodolistTitleThunk = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    todolists_api().changeTodolistTitle(todolistId, title)
        .then(response => response.data)
        .then(data => {
            debugger
            data.resultCode === 0 && dispatch(changeTodolistTitle(''))
        })
}