import {Dispatch} from "redux";
import {todolists_api} from "../api/todolists_api";
import {setLoadingStatus} from "./app_reducer";

enum TodolistActions {
    SET_TODOLISTS = 'SET_TODOLISTS',
    ADD_TODOLIST = 'ADD_TODOLIST',
    DELETE_TODOLIST = 'DELETE_TODOLIST',
    CHANGE_TODOLIST_TITLE = 'CHANGE_TODOLIST_TITLE',
    CHANGE_TODOLIST_FILTER = 'CHANGE_TODOLIST_FILTER',
}
export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
    filter: FilterValuesType
}
type InitialStateType = Array<TodolistType>
type ActionsType =
    ReturnType<typeof setTodolists>
    | ReturnType<typeof addTodolist>
    | ReturnType<typeof deleteTodolist>
    | ReturnType<typeof changeTodolistTitle>
    | ReturnType<typeof changeTodolistFilter>

const initialState: InitialStateType = []

export const todolist_reducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {

        case TodolistActions.SET_TODOLISTS:
            return [...state, ...action.todolists]

        case TodolistActions.ADD_TODOLIST:
            return [...state, action.todolist]

        case TodolistActions.DELETE_TODOLIST:
            return state.filter(tl => tl.id !== action.todolistId)

        case TodolistActions.CHANGE_TODOLIST_TITLE:
            return state.map(tl => tl.id === action.todolistId ? {...tl, title: action.newTitle} : tl)

        case TodolistActions.CHANGE_TODOLIST_FILTER:
            return state.map(tl => tl.id === action.todolistId ? {...tl, filter: action.newFilter} : tl)

        default:
            return state
    }
}

export const setTodolists = (todolists: Array<TodolistType>) => {
    return {
        type: TodolistActions.SET_TODOLISTS,
        todolists,
    } as const
}
export const addTodolist = (todolist: TodolistType) => {
    return {
        type: TodolistActions.ADD_TODOLIST,
        todolist,
    } as const
}
export const deleteTodolist = (todolistId: string) => {
    return {
        type: TodolistActions.DELETE_TODOLIST,
        todolistId,
    } as const
}
export const changeTodolistTitle = (todolistId: string, newTitle: string) => {
    return {
        type: TodolistActions.CHANGE_TODOLIST_TITLE,
        todolistId,
        newTitle,
    } as const
}
export const changeTodolistFilter = (todolistId: string, newFilter: FilterValuesType) => {
    return {
        type: TodolistActions.CHANGE_TODOLIST_FILTER,
        todolistId,
        newFilter,
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
    dispatch(setLoadingStatus('loading'))
    todolists_api().createTodolist(title)
        .then(response => response.data)
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(setLoadingStatus('success'))
                dispatch(addTodolist(data.data.item))
            }
        })
}
export const deleteTodolistThunk = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setLoadingStatus('loading'))
    todolists_api().deleteTodolist(todolistId)
        .then(response => response.data)
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(setLoadingStatus('success'))
                dispatch(deleteTodolist(todolistId))
            }
        })
}
export const changeTodolistTitleThunk = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setLoadingStatus('loading'))
    todolists_api().changeTodolistTitle(todolistId, title)
        .then(response => response.data)
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(setLoadingStatus('success'))
                dispatch(changeTodolistTitle(todolistId, title))
            }
        })
}