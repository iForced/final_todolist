import {Dispatch} from "redux";
import {tasks_api, DataForUpdateTaskType, TaskStatuses, TaskPriorities} from "../api/tasks_api";
import {AppStateType} from "./strore";
import {setTodolistLoadingStatus} from "./todolist_reducer";
import {setAppError} from "./app_reducer";

enum TasksActions {
    SET_TASKS = 'TASK/SET_TASKS',
    ADD_TASK = 'TASK/ADD_TASK',
    DELETE_TASK = 'TASK/DELETE_TASK',
    UPDATE_TASK = 'TASK/UPDATE_TASK',
}
export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

type InitialStateType = {
    [key: string]: Array<TaskType>
}
type ActionsType =
    ReturnType<typeof setTasks>
    | ReturnType<typeof addTask>
    | ReturnType<typeof deleteTask>
    | ReturnType<typeof updateTask>

const initialState: InitialStateType = {}

export const tasks_reducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {

        case TasksActions.SET_TASKS:
            return {...state, [action.todolistId]: [...action.tasks]}

        case TasksActions.ADD_TASK:
            return {...state, [action.todolistId]: [...state[action.todolistId], action.task]}

        case TasksActions.DELETE_TASK:
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}

        case TasksActions.UPDATE_TASK:
            return {...state, [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {...t, ...action.taskData} : t)}

        default:
            return state
    }
}

const onSuccessTasksRequest = (dispatch: Dispatch, todolistId: string) => {
    dispatch(setAppError(''))
    dispatch(setTodolistLoadingStatus(todolistId, 'success'))
}
const onFailedTasksRequest = (dispatch: Dispatch, todolistId: string, error: string) => {
    dispatch(setAppError(error))
    dispatch(setTodolistLoadingStatus(todolistId, 'fail'))
}

export const setTasks = (todolistId: string, tasks: Array<TaskType>) => {
    return {
        type: TasksActions.SET_TASKS,
        todolistId,
        tasks,
    } as const
}
export const addTask = (todolistId: string, task: TaskType) => {
    return {
        type: TasksActions.ADD_TASK,
        todolistId,
        task,
    } as const
}
export const deleteTask = (todolistId: string, taskId: string) => {
    return {
        type: TasksActions.DELETE_TASK,
        todolistId,
        taskId,
    } as const
}
export const updateTask = (todolistId: string, taskId: string, taskData: DataForUpdateTaskType) => {
    return {
        type: TasksActions.UPDATE_TASK,
        todolistId,
        taskId,
        taskData,
    } as const
}
export const getTasksThunk = (todolistId: string) => (dispatch: Dispatch) => {
    tasks_api().getTasks(todolistId)
        .then(response => response.data)
        .then(data => {
            dispatch(setTasks(todolistId, data.items))
        })
        .catch(err => {
            onFailedTasksRequest(dispatch, todolistId, err.message)
        })
}
export const createTaskThunk = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setTodolistLoadingStatus(todolistId, 'loading'))
    tasks_api().createTask(todolistId, title)
        .then(response => response.data)
        .then(data => {
            if (data.resultCode === 0) {
                onSuccessTasksRequest(dispatch, todolistId)
                dispatch(addTask(todolistId, data.data.item))
            } else {
                onFailedTasksRequest(dispatch, todolistId, data.messages.join(','))
            }
        })
        .catch(err => {
            onFailedTasksRequest(dispatch, todolistId, err.message)
        })
}
export const deleteTaskThunk = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    dispatch(setTodolistLoadingStatus(todolistId, 'loading'))
    tasks_api().deleteTask(todolistId, taskId)
        .then(response => response.data)
        .then(data => {
            if (data.resultCode === 0) {
                onSuccessTasksRequest(dispatch, todolistId)
                dispatch(deleteTask(todolistId, taskId))
            } else {
                onFailedTasksRequest(dispatch, todolistId, data.messages.join(','))
            }
        })
        .catch(err => {
            onFailedTasksRequest(dispatch, todolistId, err.message)
        })
}
export type DataForUpdateDomainTaskType = {
    title?: string
    description?: string
    completed?: boolean
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
export const updateTaskThunk = (todolistId: string, taskId: string, taskData: DataForUpdateDomainTaskType) => (dispatch: Dispatch, getState: () => AppStateType) => {

    const task = getState().tasksReducer[todolistId].find(t => t.todoListId === todolistId && t.id === taskId)

    if (!task) return

    const updatedTask: DataForUpdateTaskType = {
        ...task, ...taskData
    }
    dispatch(setTodolistLoadingStatus(todolistId, 'loading'))
    tasks_api().updateTask(todolistId, taskId, updatedTask)
        .then(response => response.data)
        .then(data => {
            if (data.resultCode === 0) {
                onSuccessTasksRequest(dispatch, todolistId)
                dispatch(updateTask(todolistId, taskId, data.data.item))
            } else {
                onFailedTasksRequest(dispatch, todolistId, data.messages.join(','))
            }
        })
        .catch(err => {
            onFailedTasksRequest(dispatch, todolistId, err.message)
        })
}