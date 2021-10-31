import React, {useCallback} from 'react';
import 'antd/dist/antd.css';
import s from './App.module.css'
import Todolists from "./components/Todolists/Todolists";
import {
    createTodolistThunk,
} from "./redux/todolist_reducer";
import {useDispatch} from "react-redux";
import {Layout} from "antd";
import AddItemForm from "./components/AddItemForm/AddItemForm";

const {Header, Footer, Sider, Content} = Layout;

const App = () => {

    const dispatch = useDispatch()

    const onTodolistAdd = useCallback((title: string) => {
        dispatch(createTodolistThunk(title))
    }, [dispatch])

    return (

        <Layout>
            <Header>
                <h1 className={s.headerTitle}>Todo List</h1>
            </Header>
            <Layout className={s.main}>
                <Sider theme={'light'} className={s.sideBar} width={'300px'}>
                    <AddItemForm onAddItem={onTodolistAdd}/>
                </Sider>
                <Content className={s.mainContent}>
                    <Todolists />
                </Content>
            </Layout>
            <Footer style={{textAlign: 'center'}}>Ilya Orsich | IT-Incubator</Footer>
        </Layout>
    );
};

export default App;