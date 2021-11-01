import React from 'react';
import s from './Task.module.css'
import {TaskType} from "../../../redux/tasks_reducer";
import {DeleteFilled} from "@ant-design/icons";
import {Button} from "antd";
import EditableTExtField from "../../EditableTextField/EditableTExtField";

type PropsType = {
    taskData: TaskType
    deleteTask: (taskId: string) => void
    changeTitle: (taskId: string, newTitle: string) => void
}

const Task = React.memo(function (props: PropsType) {

    return (
        <div className={s.taskItem}>
            <input type="checkbox" checked={props.taskData.completed}/>
            <EditableTExtField value={props.taskData.title} id={props.taskData.id} onValueChange={props.changeTitle} />
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