import React from 'react';
import s from './Task.module.css'
import {TaskType} from "../../../redux/tasks_reducer";
import {DeleteFilled} from "@ant-design/icons";
import {Button} from "antd";

type PropsType = {
    taskData: TaskType
    deleteTask: (taskId: string) => void
}

const Task = React.memo(function (props: PropsType) {

    return (
        <div className={s.taskItem}>
            <input type="checkbox" checked={props.taskData.completed}/>
            <div>{props.taskData.title}</div>
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