enum AuthActions {
    LOGIN = 'AUTH/LOGIN',
    LOGOUT = 'AUTH/LOGOUT',
}

type InitialStateType = {
    email: string
    password: string
    rememberMe: boolean
}
type ActionsType =
    ReturnType<typeof login>
    | ReturnType<typeof logout>

const initialState: InitialStateType = {
    email: '',
    password: '',
    rememberMe: false,
}


export const auth_reducer = (state: InitialStateType = initialState, action: ActionsType) => {
    switch (action.type) {

        case AuthActions.LOGIN:
            return {...state, email: action.email, password: action.password, rememberMe: action.rememberMe}

        case AuthActions.LOGOUT:
            return {...state, email: '', password: '', rememberMe: false}

        default:
            return state
    }
}

export const login = (email: string, password: string, rememberMe: boolean) => {
    return {
        type: AuthActions.LOGIN,
        email,
        password,
        rememberMe,
    } as const
}
export const logout = () => {
    return {
        type: AuthActions.LOGOUT,
    } as const
}