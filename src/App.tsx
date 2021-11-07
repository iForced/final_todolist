import React, {useCallback, useEffect} from 'react';
import 'antd/dist/antd.css';
import s from './App.module.css'
import Todolists from "./components/Todolists/Todolists";
import {createTodolistThunk} from "./redux/todolist_reducer";
import {useDispatch, useSelector} from "react-redux";
import {Alert, Layout, Spin} from "antd";
import AddItemForm from "./components/AddItemForm/AddItemForm";
import {AppStateType} from "./redux/strore";
import {LoadingStatusesType} from "./redux/app_reducer";
import Login from "./components/Login/Login";
import {Route, Routes} from "react-router-dom";
import {initializeThunk} from "./redux/auth_reducer";

const {Header, Footer, Sider, Content} = Layout;

const App = React.memo(function () {

    const dispatch = useDispatch()

    const appLoadingStatus = useSelector<AppStateType, LoadingStatusesType>(state => state.appReducer.loadingStatus)
    const appError = useSelector<AppStateType, string>(state => state.appReducer.error)
    const isLogged = useSelector<AppStateType, boolean>(state => state.authReducer.isLogged)
    const isInitialized = useSelector<AppStateType, boolean>(state => state.authReducer.isInitialized)

    useEffect(() => {
        dispatch(initializeThunk())
    }, [])

    const onTodolistAdd = useCallback((title: string) => {
        dispatch(createTodolistThunk(title))
    }, [])

    if (!isInitialized) {
        return <Spin />
    }

    return (

        <Layout>
            <Header>
                <h1 className={s.headerTitle}>Todo List</h1>
            </Header>
            {appError &&
            <Alert
                message={appError}
                type="error"
                showIcon
                closable
            />}
            <Spin spinning={appLoadingStatus === 'loading'}>
                <Layout className={s.main}>
                    {isLogged &&
                    <Sider theme={'light'} className={s.sideBar} width={'300px'}>
                        <AddItemForm onAddItem={onTodolistAdd} formDisabled={appLoadingStatus === 'loading'}/>
                    </Sider>}
                    <Content className={s.mainContent}>
                        <Routes>
                            <Route path={'/login'} element={<Login/>}/>
                            <Route path={'/'} element={<Todolists/>}/>
                        </Routes>
                    </Content>
                </Layout>
            </Spin>
            <Footer style={{textAlign: 'center'}}>Ilya Orsich | IT-Incubator</Footer>
        </Layout>
    );
})

export default App;