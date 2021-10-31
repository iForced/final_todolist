import React from 'react';
import s from './Todolist.module.css'
import {TodolistType} from "../../../redux/todolist_reducer";
import {Button, Card} from "antd";
import {DeleteFilled} from "@ant-design/icons";

type PropsType = TodolistType & {
    deleteTodolist: (todolistId: string) => void
}

const Todolist = (props: PropsType) => {

    const onDeleteTodolist = () => {
        props.deleteTodolist(props.id)
    }

    return (
        <Card
            style={{minWidth: '300px'}}
            title={props.title}
            extra={<Button
                shape={'circle'}
                icon={<DeleteFilled style={{color: 'red'}}/>}
                onClick={onDeleteTodolist}
            />}>
        </Card>
    );
};

export default Todolist;