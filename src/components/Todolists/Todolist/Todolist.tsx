import React from 'react';
import s from './Todolist.module.css'
import {TodolistType} from "../../../redux/todolist_reducer";
import {Button, Card, Input} from "antd";
import {DeleteFilled} from "@ant-design/icons";
import EditableTExtField from "../../EditableTextField/EditableTExtField";

type PropsType = TodolistType & {
    deleteTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
}

const Todolist = React.memo(function (props: PropsType) {

    const onDeleteTodolist = () => {
        props.deleteTodolist(props.id)
    }

    return (
        <Card
            style={{minWidth: '300px'}}
            title={<EditableTExtField value={props.title} id={props.id} onValueChange={props.changeTodolistTitle} />}
            extra={<Button
                shape={'circle'}
                icon={<DeleteFilled style={{color: 'red'}}/>}
                onClick={onDeleteTodolist}
            />}>
        </Card>
    );
})

export default Todolist;