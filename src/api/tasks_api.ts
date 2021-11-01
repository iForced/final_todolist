import axios from "axios";
import {TaskType} from "../redux/tasks_reducer";

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3,
}
export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    High = 2,
    Urgently = 3,
    Later = 4,
}

type CommonResponseType<T = {}> = {
    data: T
    resultCode: number
    messages: Array<string>
}
type GetTasksResponseType = {
    items: Array<TaskType>
    totalCount: number
    error: string
}
export type DataForUpdateTaskType = {
    title: string
    description: string
    completed: boolean
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}

const axiosInstance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
    headers: {
        'API-KEY': 'ade1566d-0e8e-48e7-bd8d-2867a98c2f5f'
    }
})

export const tasks_api = () => {
    return {
        getTasks(todolistId: string) {
            return axiosInstance.get<GetTasksResponseType>(`/todo-lists/${todolistId}/tasks`)
        },
        createTask(todolistId: string, title: string) {
            return axiosInstance.post<CommonResponseType<{item: TaskType}>>(`/todo-lists/${todolistId}/tasks`, {title})
        },
        deleteTask(todolistId: string, taskId: string) {
            return axiosInstance.delete<CommonResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
        },
        changeTaskTitle(todolistId: string, taskId: string, taskData: DataForUpdateTaskType) {
            return axiosInstance.put<CommonResponseType<{item: TaskType}>>(`/todo-lists/${todolistId}/tasks/${taskId}`, {...taskData})
        }
    }
}