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

const Todolists = React.memo(function () {

    const dispatch = useDispatch()
    const todolists = useSelector<AppStateType, Array<TodolistType>>(state => state.todolistReducer)

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
                        />
                    </Spin>)
            }
        </Space>
    );
})

export default Todolists;