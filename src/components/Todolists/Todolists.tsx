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

type PropsType = {
    todolists: Array<TodolistType>
}

const Todolists = (props: PropsType) => {

    const dispatch = useDispatch()

    return (
        <div>
            <button onClick={() => {
                dispatch(createTodolistThunk('alo2'))
                console.log(store.getState())
            }}>add list</button>
            <button onClick={() => dispatch(changeTodolistTitleThunk('', ''))}>delete list</button>
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
        </div>
    );
};

export default Todolists;