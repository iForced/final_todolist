import React, {ChangeEvent} from 'react';
import s from './Task.module.css'
import {TaskType} from "../../../redux/tasks_reducer";
import {DeleteFilled} from "@ant-design/icons";
import {Button} from "antd";
import EditableTextField from "../../EditableTextField/EditableTextField";
import {TaskStatuses} from "../../../api/tasks_api";

type PropsType = {
    taskData: TaskType
    deleteTask: (taskId: string) => void
    changeTitle: (taskId: string, newTitle: string) => void
    changeStatus: (taskId: string, newStatus: TaskStatuses) => void
}

const Task = React.memo(function (props: PropsType) {

    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const newStatus = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New
        props.changeStatus(props.taskData.id, newStatus)
    }

    return (
        <div className={s.taskItem}>
            <input type="checkbox" checked={props.taskData.status === TaskStatuses.Completed} onChange={onChangeStatusHandler}/>
            <EditableTextField value={props.taskData.title} id={props.taskData.id} onValueChange={props.changeTitle} />
            <Button
                shape={'circle'}
                size={'small'}
                icon={<DeleteFilled style={{color: 'red'}}/>}
                onClick={() => props.deleteTask(props.taskData.id)}
            />
        </div>
    );
})

export default Task;