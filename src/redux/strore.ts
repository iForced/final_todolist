import {applyMiddleware, combineReducers, createStore} from "redux";
import {todolist_reducer} from "./todolist_reducer";
import thunk from "redux-thunk";

export type AppStateType = ReturnType<typeof store.getState>

const rootReducer = combineReducers({
    todolistReducer: todolist_reducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

// @ts-ignore
window.state = store.getState()