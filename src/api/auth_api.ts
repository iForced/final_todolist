import axios from "axios";

type CommonResponseType<T = {}> = {
    resultCode: number
    messages: Array<string>
    data: T
}

export type AuthDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}

const axiosInstance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
    headers: {
        'API-KEY': 'ade1566d-0e8e-48e7-bd8d-2867a98c2f5f'
    }
})

export const auth_api = () => {
    return {
        login(data: AuthDataType) {
            return axiosInstance.post<CommonResponseType<{userId: number}>>(`/auth/login`, data)
        },
        logout() {
            return axiosInstance.delete<CommonResponseType>(`/auth/login`)
        },
        me() {
            return axiosInstance.get<CommonResponseType<{id: number, email: string, login: string}>>(`/auth/me`)
        }
    }
}