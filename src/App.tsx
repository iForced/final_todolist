import React, {useCallback, useEffect} from 'react';
import 'antd/dist/antd.css';
import s from './App.module.css'
import Todolists from "./components/Todolists/Todolists";
import {
    changeTodolistTitleThunk,
    createTodolistThunk,
    deleteTodolistThunk,
    getTodolistsThunk,
    TodolistType
} from "./redux/todolist_reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "./redux/strore";
import {Layout} from "antd";
import AddItemForm from "./components/AddItemForm/AddItemForm";

const {Header, Footer, Sider, Content} = Layout;

const App = () => {

    const dispatch = useDispatch()
    const todolists = useSelector<AppStateType, Array<TodolistType>>(state => state.todolistReducer)

    useEffect(() => {
        dispatch(getTodolistsThunk())
    }, [dispatch])

    const onTodolistAdd = useCallback((title: string) => {
        dispatch(createTodolistThunk(title))
    }, [dispatch])
    const onDeleteTodolist = useCallback((todolistId: string) => {
        dispatch(deleteTodolistThunk(todolistId))
    }, [dispatch])
    const onChangeTodolistTitle = useCallback((todolistId: string, title: string) => {
        dispatch(changeTodolistTitleThunk(todolistId, title))
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
                    <Todolists
                        todolists={todolists}
                        deleteTodolist={onDeleteTodolist}
                        changeTodolistTitle={onChangeTodolistTitle}
                    />
                </Content>
            </Layout>
            <Footer style={{textAlign: 'center'}}>Ilya Orsich | IT-Incubator</Footer>
        </Layout>
    );
};

export default App;