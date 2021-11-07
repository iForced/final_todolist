import React from 'react';
import s from './Login.module.css'
import {useFormik} from "formik";
import {Button, Checkbox, Input, Space} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {loginThunk} from "../../redux/auth_reducer";
import {AppStateType} from "../../redux/strore";
import {Navigate, useNavigate} from 'react-router-dom';

const Login = () => {

    const dispatch = useDispatch()
    const isLogged = useSelector<AppStateType, boolean>(state => state.authReducer.isLogged)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        onSubmit: (data) => {
            dispatch(loginThunk(data.email, data.password, data.rememberMe))
        }
    })

    const navigate = useNavigate()
    if (isLogged) {
        navigate('/')
    }

    return (
        <div className={s.formWrapper}>
            <div className={s.preloginText}>For enter to demo account use this email: ****, password: ***</div>
            <form onSubmit={formik.handleSubmit}>
                <Space direction={'vertical'}>
                    <Input
                        placeholder="Enter email"
                        {...formik.getFieldProps('email')}
                    />
                    <Input.Password
                        placeholder="Enter password"
                        {...formik.getFieldProps('password')}
                    />
                    <Checkbox
                        {...formik.getFieldProps('rememberMe')}
                    >Remember me
                    </Checkbox>
                    <Button htmlType={'submit'} type={'primary'}>Log in</Button>
                </Space>
            </form>
        </div>
    );
};

export default Login;