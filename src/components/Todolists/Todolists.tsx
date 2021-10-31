import React, {useCallback, useEffect} from 'react';
import s from './Todolists.module.css'
import {
    changeTodolistTitleThunk,
    deleteTodolistThunk,
    getTodolistsThunk,
    TodolistType
} from "../../redux/todolist_reducer";
import Todolist from "./Todolist/Todolist";
import {Space} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/strore";
import {TaskType} from "../../redux/tasks_reducer";

const Todolists = React.memo(function () {

    const dispatch = useDispatch()
    const todolists = useSelector<AppStateType, Array<TodolistType>>(state => state.todolistReducer)
    const tasks = useSelector<AppStateType, Array<TaskType>>(state => state.tasksReducer)

    useEffect(() => {
        dispatch(getTodolistsThunk())
    }, [dispatch])

    const onDeleteTodolist = useCallback((todolistId: string) => {
        dispatch(deleteTodolistThunk(todolistId))
    }, [dispatch])
    const onChangeTodolistTitle = useCallback((todolistId: string, title: string) => {
        dispatch(changeTodolistTitleThunk(todolistId, title))
    }, [dispatch])

    return (
        <Space wrap align={'center'} size={'small'}>
            {
                todolists.map(tl =>
                    <Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        addedDate={tl.addedDate}
                        order={tl.order}
                        deleteTodolist={onDeleteTodolist}
                        changeTodolistTitle={onChangeTodolistTitle}
                        tasks={tasks.filter(t => t.todoListId === tl.id)}
                    />)
            }
        </Space>
    );
})

export default Todolists;