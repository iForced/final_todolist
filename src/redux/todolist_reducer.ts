import {Dispatch} from "redux";
import {todolists_api} from "../api/todolists_api";
import {LoadingStatusesType, setAppError, setAppLoadingStatus} from "./app_reducer";

enum TodolistActions {
    SET_TODOLISTS = 'TODOLIST/SET_TODOLISTS',
    ADD_TODOLIST = 'TODOLIST/ADD_TODOLIST',
    DELETE_TODOLIST = 'TODOLIST/DELETE_TODOLIST',
    CHANGE_TODOLIST_TITLE = 'TODOLIST/CHANGE_TODOLIST_TITLE',
    CHANGE_TODOLIST_FILTER = 'TODOLIST/CHANGE_TODOLIST_FILTER',
    SET_LOADING_STATUS = 'TODOLIST/SET_LOADING_STATUS',
}
export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
    filter: FilterValuesType
    loadingStatus?: LoadingStatusesType
}
type InitialStateType = Array<TodolistType>
type ActionsType =
    ReturnType<typeof setTodolists>
    | ReturnType<typeof addTodolist>
    | ReturnType<typeof deleteTodolist>
    | ReturnType<typeof changeTodolistTitle>
    | ReturnType<typeof changeTodolistFilter>
    | ReturnType<typeof setTodolistLoadingStatus>

const initialState: InitialStateType = []

export const todolist_reducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {

        case TodolistActions.SET_TODOLISTS:
            return [...action.todolists]

        case TodolistActions.ADD_TODOLIST:
            return [...state, action.todolist]

        case TodolistActions.DELETE_TODOLIST:
            return state.filter(tl => tl.id !== action.todolistId)

        case TodolistActions.CHANGE_TODOLIST_TITLE:
            return state.map(tl => tl.id === action.todolistId ? {...tl, title: action.newTitle} : tl)

        case TodolistActions.CHANGE_TODOLIST_FILTER:
            return state.map(tl => tl.id === action.todolistId ? {...tl, filter: action.newFilter} : tl)

        case TodolistActions.SET_LOADING_STATUS:
            return state.map(tl => tl.id === action.todolistId ? {...tl, loadingStatus: action.newStatus} : tl)

        default:
            return state
    }
}

export const onSuccessRequest = (dispatch: Dispatch) => {
    dispatch(setAppError(''))
    dispatch(setAppLoadingStatus('success'))
}
export const onFailedRequest = (dispatch: Dispatch, error: string) => {
    dispatch(setAppError(error))
    dispatch(setAppLoadingStatus('fail'))
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
export const setTodolistLoadingStatus = (todolistId: string, newStatus: LoadingStatusesType) => {
    return {
        type: TodolistActions.SET_LOADING_STATUS,
        todolistId,
        newStatus,
    } as const
}
export const getTodolistsThunk = () => (dispatch: Dispatch) => {
    todolists_api().getTodolists()
        .then(response => response.data)
        .then(data => {
            dispatch(setTodolists(data))
        })
        .catch(err => {
            onFailedRequest(dispatch, err.message)
        })
}
export const createTodolistThunk = (title: string) => (dispatch: Dispatch) => {
    dispatch(setAppLoadingStatus('loading'))
    todolists_api().createTodolist(title)
        .then(response => response.data)
        .then(data => {
            if (data.resultCode === 0) {
                onSuccessRequest(dispatch)
                dispatch(addTodolist(data.data.item))
            } else {
                onFailedRequest(dispatch, data.messages.join(','))
            }
        })
        .catch(err => {
            onFailedRequest(dispatch, err.message)
        })
}
export const deleteTodolistThunk = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppLoadingStatus('loading'))
    todolists_api().deleteTodolist(todolistId)
        .then(response => response.data)
        .then(data => {
            if (data.resultCode === 0) {
                onSuccessRequest(dispatch)
                dispatch(deleteTodolist(todolistId))
            } else {
                onFailedRequest(dispatch, data.messages.join(','))
            }
        })
        .catch(err => {
            onFailedRequest(dispatch, err.message)
        })
}
export const changeTodolistTitleThunk = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setAppLoadingStatus('loading'))
    todolists_api().changeTodolistTitle(todolistId, title)
        .then(response => response.data)
        .then(data => {
            if (data.resultCode === 0) {
                onSuccessRequest(dispatch)
                dispatch(changeTodolistTitle(todolistId, title))
            } else {
                onFailedRequest(dispatch, data.messages.join(','))
            }
        })
        .catch(err => {
            onFailedRequest(dispatch, err.message)
        })
}