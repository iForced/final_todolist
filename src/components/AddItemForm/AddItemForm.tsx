import React, {ChangeEvent, useState} from 'react';
import s from './AddItemForm.module.css'
import {Button, Input} from "antd";

type PropsType = {
    onAddItem: (title: string) => void
    formDisabled: boolean
}

const AddItemForm = React.memo(function (props: PropsType) {

    const [value, setValue] = useState<string>('')
    const [error, setError] = useState<string>('')

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setError('')
        setValue(e.currentTarget.value)
    }
    const onAdd = () => {
        if (value.trim()) {
            props.onAddItem(value.trim())
            setValue('')
        } else {
            setError('Enter title')
        }
    }

    return (
        <div>
            <div className={s.addForm + ' ' + (error && s.errorForm)}>
                <Input
                    placeholder={'Enter title'}
                    value={value}
                    onChange={onInputChange}
                    onPressEnter={onAdd}
                    disabled={props.formDisabled}
                />
                <Button type={'primary'} onClick={onAdd} disabled={props.formDisabled}>Add</Button>
            </div>
            <div className={s.error}>
                {error ? error : ''}
            </div>
        </div>
    );
})

export default AddItemForm;