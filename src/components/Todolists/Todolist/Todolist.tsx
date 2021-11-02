import React, {useCallback, useEffect} from 'react';
import s from './Todolist.module.css'
import {changeTodolistFilter, FilterValuesType, TodolistType} from "../../../redux/todolist_reducer";
import {Button, Card} from "antd";
import {DeleteFilled} from "@ant-design/icons";
import EditableTExtField from "../../EditableTextField/EditableTExtField";
import {
    updateTaskThunk,
    createTaskThunk,
    deleteTaskThunk,
    getTasksThunk,
    TaskType
} from "../../../redux/tasks_reducer";
import {useDispatch} from "react-redux";
import AddItemForm from "../../AddItemForm/AddItemForm";
import Task from "../Task/Task";
import {TaskStatuses} from "../../../api/tasks_api";
import MyButton from "../../MyButton/MyButton";

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
    const onChangeTodolistFilter = useCallback((newFilter: FilterValuesType) => {
        dispatch(changeTodolistFilter(props.id, newFilter))
    }, [dispatch])
    const onAddTask = useCallback((title: string) => {
        dispatch(createTaskThunk(props.id, title))
    }, [dispatch])
    const onDeleteTask = useCallback((taskId: string) => {
        dispatch(deleteTaskThunk(props.id, taskId))
    }, [dispatch])
    const onChangeTaskTitle = useCallback((taskId: string, newTitle: string) => {
        dispatch(updateTaskThunk(props.id, taskId, {title: newTitle}))
    }, [dispatch])
    const onChangeTaskStatus = useCallback((taskId: string, newStatus: TaskStatuses) => {
        dispatch(updateTaskThunk(props.id, taskId, {status: newStatus}))
    }, [dispatch])

    const tasksByFilterValue = props.tasks.filter(t => {
        switch (props.filter) {

            case "active":
                return t.status === 0

            case "completed":
                return t.status === 2

            default:
                return t
        }
    })

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
            <AddItemForm onAddItem={onAddTask} formDisabled={false}/>
            <div className={s.tasks}>
                {
                    tasksByFilterValue.map(t =>
                        <Task
                            key={t.id}
                            taskData={t}
                            deleteTask={onDeleteTask}
                            changeTitle={onChangeTaskTitle}
                            changeStatus={onChangeTaskStatus}
                        />)
                }
            </div>
            <div className={s.buttons + ' ' + (!props.tasks.length && s.hideButtons)}>
                <MyButton name={'all'} filterValue={props.filter} changeFilter={onChangeTodolistFilter} />
                <MyButton name={'active'} filterValue={props.filter} changeFilter={onChangeTodolistFilter} />
                <MyButton name={'completed'} filterValue={props.filter} changeFilter={onChangeTodolistFilter} />
            </div>
        </Card>
    );
})

export default Todolist;