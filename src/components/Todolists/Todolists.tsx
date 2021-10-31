import React from 'react';
import {
    TodolistType
} from "../../redux/todolist_reducer";
import Todolist from "./Todolist/Todolist";
import {Space} from "antd";

type PropsType = {
    todolists: Array<TodolistType>
    deleteTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
}

const Todolists = (props: PropsType) => {

    return (
        <Space wrap align={'center'} size={'small'}>
            {
                props.todolists.map(tl =>
                    <Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        addedDate={tl.addedDate}
                        order={tl.order}
                        deleteTodolist={props.deleteTodolist}
                        changeTodolistTitle={props.changeTodolistTitle}
                    />)
            }
        </Space>
    );
};

export default Todolists;