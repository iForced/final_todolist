import {applyMiddleware, combineReducers, createStore} from "redux";
import {todolist_reducer} from "./todolist_reducer";
import thunk from "redux-thunk";
import {tasks_reducer} from "./tasks_reducer";
import {app_reducer} from "./app_reducer";

export type AppStateType = ReturnType<typeof store.getState>

const rootReducer = combineReducers({
    todolistReducer: todolist_reducer,
    tasksReducer: tasks_reducer,
    appReducer: app_reducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

// @ts-ignore
window.state = store.getState()