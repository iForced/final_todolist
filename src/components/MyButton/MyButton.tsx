import React from 'react';
import {Button} from "antd";
import {FilterValuesType} from "../../redux/todolist_reducer";

type PropsType = {
    name: FilterValuesType
    filterValue: FilterValuesType
    changeFilter: (newFilter: FilterValuesType) => void
}

const MyButton = React.memo(function (props: PropsType) {
    return (
        <div>
            <Button
                type={props.name === props.filterValue ? 'primary' : 'default'}
                onClick={() => props.changeFilter(props.name)}
            >{props.name.toLocaleUpperCase()}
            </Button>
        </div>
    );
})

export default MyButton;