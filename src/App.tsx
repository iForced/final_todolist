import React, {useEffect} from 'react';
import Todolists from "./components/Todolists/Todolists";
import {getTodolistsThunk, TodolistType} from "./redux/todolist_reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "./redux/strore";

const App = () => {

    const dispatch = useDispatch()
    const todolists = useSelector<AppStateType, Array<TodolistType>>(state => state.todolistReducer)

    useEffect(() => {
        dispatch(getTodolistsThunk())
    }, [dispatch])

    return (
        <div>
            <Todolists
                todolists={todolists}
            />
        </div>
    );
};

export default App;