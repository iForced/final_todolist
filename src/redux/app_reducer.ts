export type LoadingStatusesType = 'idle' | 'loading' | 'success' | 'fail'
type InitialStateType = {
    loadingStatus: LoadingStatusesType
    error: string
}
type ActionsType = ReturnType<typeof setAppLoadingStatus> | ReturnType<typeof setError>
enum AppActions {
    SET_LOADING_STATUS = 'APP/SET_LOADING_STATUS',
    SET_ERROR = 'APP/SET_ERROR',
}
const initialState: InitialStateType = {
    loadingStatus: 'idle',
    error: ''
}

export const app_reducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {

        case AppActions.SET_LOADING_STATUS:
            return {...state, loadingStatus: action.newStatus}

        case AppActions.SET_ERROR:
            return {...state, error: action.error}

        default:
            return state
    }
}

export const setAppLoadingStatus = (newStatus: LoadingStatusesType) => {
    return {
        type: AppActions.SET_LOADING_STATUS,
        newStatus,
    } as const
}
export const setError = (error: string) => {
    return {
        type: AppActions.SET_ERROR,
        error,
    } as const
}