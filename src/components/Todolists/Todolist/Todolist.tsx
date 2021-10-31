import React from 'react';
import {TodolistType} from "../../../redux/todolist_reducer";
import {Card} from "antd";

type PropsType = TodolistType

const Todolist = (props: PropsType) => {
    return (
        <Card style={{minWidth: '300px'}} title={props.title}>

        </Card>
    );
};

export default Todolist;