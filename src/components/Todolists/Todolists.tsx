import React, {useCallback, useEffect} from 'react';
import s from './Todolists.module.css'
import {
    changeTodolistTitleThunk,
    deleteTodolistThunk,
    getTodolistsThunk,
    TodolistType
} from "../../redux/todolist_reducer";
import Todolist from "./Todolist/Todolist";
import {Space, Spin} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/strore";
import {TaskType} from "../../redux/tasks_reducer";

const Todolists = React.memo(function () {

    const dispatch = useDispatch()
    const todolists = useSelector<AppStateType, Array<TodolistType>>(state => state.todolistReducer)
    const tasks = useSelector<AppStateType, Array<TaskType>>(state => state.tasksReducer)

    useEffect(() => {
        dispatch(getTodolistsThunk())
    }, [])

    const onDeleteTodolist = useCallback((todolistId: string) => {
        dispatch(deleteTodolistThunk(todolistId))
    }, [])
    const onChangeTodolistTitle = useCallback((todolistId: string, title: string) => {
        dispatch(changeTodolistTitleThunk(todolistId, title))
    }, [])

    return (
        <Space wrap align={'center'} size={'small'}>
            {
                todolists.map(tl =>
                    <Spin key={tl.id} spinning={tl.loadingStatus === 'loading'}>
                        <Todolist
                            loadingStatus={tl.loadingStatus}
                            key={tl.id}
                            id={tl.id}
                            title={tl.title}
                            addedDate={tl.addedDate}
                            order={tl.order}
                            filter={tl.filter || 'all'}
                            deleteTodolist={onDeleteTodolist}
                            changeTodolistTitle={onChangeTodolistTitle}
                            tasks={tasks.filter(t => t.todoListId === tl.id)}
                        />
                    </Spin>)
            }
        </Space>
    );
})

export default Todolists;