import React, {useCallback, useEffect} from 'react';
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

const Todolists = React.memo(function () {

    const dispatch = useDispatch()
    const todolists = useSelector<AppStateType, Array<TodolistType>>(state => state.todolistReducer)

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
                    />)
            }
        </Space>
    );
})

export default Todolists;