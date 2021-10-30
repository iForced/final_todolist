import React from 'react';
import {TodolistType} from "../../../redux/todolist_reducer";

type PropsType = TodolistType

const Todolist = (props: PropsType) => {
    return (
        <div>
            <div>{props.title}</div>
            <div>{props.id}</div>
            <div>{props.addedDate}</div>
        </div>
    );
};

export default Todolist;