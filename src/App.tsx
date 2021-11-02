import React, {useCallback} from 'react';
import 'antd/dist/antd.css';
import s from './App.module.css'
import Todolists from "./components/Todolists/Todolists";
import {
    createTodolistThunk,
} from "./redux/todolist_reducer";
import {useDispatch, useSelector} from "react-redux";
import {Layout, Spin} from "antd";
import AddItemForm from "./components/AddItemForm/AddItemForm";
import {AppStateType} from "./redux/strore";
import {LoadingStatusesType} from "./redux/app_reducer";

const {Header, Footer, Sider, Content} = Layout;

const App = () => {

    const dispatch = useDispatch()

    const appLoadingStatus = useSelector<AppStateType, LoadingStatusesType>(state => state.appReducer.loadingStatus)

    const onTodolistAdd = useCallback((title: string) => {
        dispatch(createTodolistThunk(title))
    }, [dispatch])

    return (

        <Layout>
            <Header>
                <h1 className={s.headerTitle}>Todo List</h1>
            </Header>
            <Spin spinning={appLoadingStatus === 'loading'}>
                <Layout className={s.main}>
                    <Sider theme={'light'} className={s.sideBar} width={'300px'}>
                        <AddItemForm onAddItem={onTodolistAdd} formDisabled={appLoadingStatus === 'loading'}/>
                    </Sider>
                    <Content className={s.mainContent}>
                        <Todolists />
                    </Content>
                </Layout>
            </Spin>
            <Footer style={{textAlign: 'center'}}>Ilya Orsich | IT-Incubator</Footer>
        </Layout>
    );
};

export default App;