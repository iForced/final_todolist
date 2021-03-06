import axios from "axios";
import {TodolistType} from "../redux/todolist_reducer";

type CommonResponseType<T = {}> = {
    data: T
    resultCode: number
    messages: Array<string>
}

type GetTodolistsResponseType = Array<TodolistType>

const axiosInstance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
    headers: {
        'API-KEY': 'ade1566d-0e8e-48e7-bd8d-2867a98c2f5f'
    }
})

export const todolists_api = () => {
    return {
        getTodolists() {
            return axiosInstance.get<GetTodolistsResponseType>('/todo-lists')
        },
        createTodolist(title: string) {
            return axiosInstance.post<CommonResponseType<{item: TodolistType}>>('/todo-lists', {title})
        },
        deleteTodolist(todolistId: string) {
            return axiosInstance.delete<CommonResponseType>(`/todo-lists/${todolistId}`)
        },
        changeTodolistTitle(todolistId: string, title: string) {
            return axiosInstance.put<CommonResponseType>(`/todo-lists/${todolistId}`, {title})
        }
    }
}