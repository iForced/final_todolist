import {applyMiddleware, combineReducers, createStore} from "redux";
import {todolist_reducer} from "./todolist_reducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    todolistReducer: todolist_reducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk))