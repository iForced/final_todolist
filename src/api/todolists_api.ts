import axios from "axios";

type CommonResponseType = {
    id: string
    addedDate: string
    order: number
    title: string
}

const axiosInstance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
})

export const todolists_api = () => {
    return {
        getTodolists() {
            return axiosInstance.get<CommonResponseType>('/todo-lists')
        }
    }
}