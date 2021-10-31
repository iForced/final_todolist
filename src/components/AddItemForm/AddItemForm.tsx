import React, {ChangeEvent, useState} from 'react';
import s from './AddItemForm.module.css'
import {Button, Input} from "antd";

type PropsType = {
    onAddItem: (title: string) => void
}

const AddItemForm = React.memo(function (props: PropsType) {

    const [value, setValue] = useState<string>('')

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }
    const onAdd = () => {
        props.onAddItem(value)
    }

    return (
        <div>
            <div className={s.addForm}>
                <Input placeholder={'Enter title'} value={value} onChange={onInputChange} />
                <Button type={'primary'} onClick={onAdd}>Add</Button>
            </div>
        </div>
    );
})

export default AddItemForm;