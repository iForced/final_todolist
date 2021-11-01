import React, {useCallback, useEffect} from 'react';
import s from './Todolist.module.css'
import {TodolistType} from "../../../redux/todolist_reducer";
import {Button, Card} from "antd";
import {DeleteFilled} from "@ant-design/icons";
import EditableTExtField from "../../EditableTextField/EditableTExtField";
import {
    changeTaskTitleThunk,
    createTaskThunk,
    deleteTaskThunk,
    getTasksThunk,
    TaskType
} from "../../../redux/tasks_reducer";
import {useDispatch} from "react-redux";
import AddItemForm from "../../AddItemForm/AddItemForm";
import Task from "../Task/Task";

type PropsType = TodolistType & {
    deleteTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
    tasks: Array<TaskType>
}

const Todolist = React.memo(function (props: PropsType) {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getTasksThunk(props.id))
    }, [dispatch])

    const onDeleteTodolist = useCallback(() => {
        props.deleteTodolist(props.id)
    }, [dispatch])
    const onAddTask = useCallback((title: string) => {
        dispatch(createTaskThunk(props.id, title))
    },[dispatch])
    const onDeleteTask = useCallback((taskId: string) => {
        dispatch(deleteTaskThunk(props.id, taskId))
    }, [dispatch])
    const onChangeTaskTitle = useCallback((taskId: string, newTitle: string) => {
        dispatch(changeTaskTitleThunk(props.id, taskId, newTitle))
    }, [dispatch])

    return (
        <Card
            className={s.todolists}
            style={{minWidth: '300px'}}
            title={<EditableTExtField value={props.title} id={props.id} onValueChange={props.changeTodolistTitle}/>}
            extra={<Button
                shape={'circle'}
                icon={<DeleteFilled style={{color: 'red'}}/>}
                onClick={onDeleteTodolist}
            />}>
            <AddItemForm onAddItem={onAddTask}/>
            <div className={s.tasks}>
                {
                    props.tasks.map(t => <Task key={t.id} taskData={t} deleteTask={onDeleteTask} changeTitle={onChangeTaskTitle} />)
                }
            </div>
        </Card>
    );
})

export default Todolist;