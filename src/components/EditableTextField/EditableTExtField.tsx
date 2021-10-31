import React, {ChangeEvent, useState} from 'react';
import {Input} from "antd";

type PropsType = {
    value: string
    id: string
    onValueChange: (todolistId: string, title: string) => void
}

const EditableTExtField = (props: PropsType) => {

    const [editMode, setEditMode] = useState<boolean>(false)
    const [value, setValue] = useState<string>(props.value)

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }
    const editOn = () => {
        setEditMode(true)
    }
    const editOff = () => {
        props.onValueChange(props.id, value)
        setEditMode(false)
    }

    return (
        <div>
            {
                editMode
                    ? <Input
                        value={value}
                        onChange={onChangeTitle}
                        onBlur={editOff}
                        onPressEnter={editOff}
                        autoFocus
                    />
                    : <span onDoubleClick={editOn}>{props.value}</span>
            }
        </div>
    );
};

export default EditableTExtField;