import {Dispatch} from "redux";
import {auth_api} from "../api/auth_api";
import {onFailedRequest, onSuccessRequest} from "./todolist_reducer";
import {setAppError, setAppLoadingStatus} from "./app_reducer";

enum AuthActions {
    LOGIN = 'AUTH/LOGIN',
    LOGOUT = 'AUTH/LOGOUT',
    INITIALIZE = 'AUTH/INITIALIZE',
}

type InitialStateType = {
    isLogged: boolean
    userId: number | null
    isInitialized: boolean
}
type ActionsType =
    ReturnType<typeof login>
    | ReturnType<typeof logout>
    | ReturnType<typeof setInitialized>

const initialState: InitialStateType = {
    isLogged: false,
    userId: null,
    isInitialized: false,
}

export const auth_reducer = (state: InitialStateType = initialState, action: ActionsType) => {
    switch (action.type) {

        case AuthActions.LOGIN:
            return {...state, isLogged: true, userId: action.userId}

        case AuthActions.LOGOUT:
            return {...state, isLogged: false, userId: null}

        case AuthActions.INITIALIZE:
            return {...state, isInitialized: true}

        default:
            return state
    }
}

export const login = (userId: number) => {
    return {
        type: AuthActions.LOGIN,
        userId,
    } as const
}
export const logout = () => {
    return {
        type: AuthActions.LOGOUT,
    } as const
}
export const setInitialized = () => {
    return {
        type: AuthActions.INITIALIZE,
    } as const
}

export const loginThunk = (email: string, password: string, rememberMe: boolean) => (dispatch: Dispatch) => {
    dispatch(setAppLoadingStatus('loading'))
    auth_api().login({email, password, rememberMe})
        .then(response => response.data)
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(login(data.data.userId))
                onSuccessRequest(dispatch)
            } else {
                onFailedRequest(dispatch, data.messages.join(','))
            }
        })
        .catch(err => {
            onFailedRequest(dispatch, err.message)
        })
}
export const logoutThunk = () => (dispatch: Dispatch) => {
    dispatch(setAppLoadingStatus('loading'))
    auth_api().logout()
        .then(response => response.data)
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(logout())
                onSuccessRequest(dispatch)
            } else {
                onFailedRequest(dispatch, data.messages.join(','))
            }
        })
        .catch(err => {
            onFailedRequest(dispatch, err.message)
        })
}
export const initializeThunk = () => (dispatch: Dispatch) => {
    dispatch(setAppLoadingStatus('loading'))
    auth_api().me()
        .then(response => response.data)
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(login(data.data.id))
                onSuccessRequest(dispatch)
            } else {
                onFailedRequest(dispatch, data.messages.join(','))
                dispatch(setAppError(''))
            }
            dispatch(setInitialized())
        })
        .catch(err => {
            onFailedRequest(dispatch, err.message)
        })
}