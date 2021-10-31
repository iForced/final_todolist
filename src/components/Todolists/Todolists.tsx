import React from 'react';
import {
    changeTodolistTitleThunk,
    createTodolistThunk,
    deleteTodolistThunk,
    TodolistType
} from "../../redux/todolist_reducer";
import Todolist from "./Todolist/Todolist";
import {useDispatch} from "react-redux";
import {store} from "../../redux/strore";
import AddItemForm from "../AddItemForm/AddItemForm";
import {Space} from "antd";

type PropsType = {
    todolists: Array<TodolistType>
}

const Todolists = (props: PropsType) => {

    // const dispatch = useDispatch()

    return (
        <Space wrap align={'center'} size={'small'} >
            {
                props.todolists.map(tl =>
                    <Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        addedDate={tl.addedDate}
                        order={tl.order}
                    />)
            }
        </Space>
    );
};

export default Todolists;