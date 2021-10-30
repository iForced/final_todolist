import React from 'react';
import {createTodolistThunk, TodolistType} from "../../redux/todolist_reducer";
import Todolist from "./Todolist/Todolist";
import {useDispatch} from "react-redux";

type PropsType = {
    todolists: Array<TodolistType>
}

const Todolists = (props: PropsType) => {

    const dispatch = useDispatch()

    return (
        <div>
            <button onClick={() => dispatch(createTodolistThunk('alo'))}>add list</button>
            {
                props.todolists.map(tl =>{
                    return <Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        addedDate={tl.addedDate}
                        order={tl.order}
                    />})
            }
        </div>
    );
};

export default Todolists;