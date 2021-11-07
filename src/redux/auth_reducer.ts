import {Dispatch} from "redux";
import {auth_api} from "../api/auth_api";
import {setAppError} from "./app_reducer";
import {onFailedRequest, onSuccessRequest} from "./todolist_reducer";

enum AuthActions {
    LOGIN = 'AUTH/LOGIN',
    LOGOUT = 'AUTH/LOGOUT',
}

type InitialStateType = {
    isLogged: boolean
    userId: number | null
}
type ActionsType =
    ReturnType<typeof login>
    | ReturnType<typeof logout>

const initialState: InitialStateType = {
    isLogged: false,
    userId: null,
}

export const auth_reducer = (state: InitialStateType = initialState, action: ActionsType) => {
    switch (action.type) {

        case AuthActions.LOGIN:
            return {...state, isLogged: true, userId: action.userId}

        case AuthActions.LOGOUT:
            return {...state, isLogged: false, userId: null}

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

export const loginThunk = (email: string, password: string, rememberMe: boolean) => (dispatch: Dispatch) => {
    auth_api().login({email, password, rememberMe})
        .then(response => response.data)
        .then(data => {
            debugger
            if (data.resultCode === 0) {
                dispatch(login(data.userId))
                onSuccessRequest(dispatch)
            } else {
                onFailedRequest(dispatch, data.messages.join(','))
            }
        })
        .catch(err => {
            onFailedRequest(dispatch, err.message)
        })
}