/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-24 08:16:41
 * @LastEditTime: 2024-03-24 09:11:06
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \user-app\src\service\index.js
 * @Description: 对axios拦截器进行配置
 */
import axios from "axios";
import {
    Toast
} from 'vant'
export const API_BASE_URL = "http://127.0.0.1:4396/app"

export const RESOURCES_BASE_URL = 'http://127.0.0.1:4396/static/App'

export function axiosInstance(config) {
    const instance = axios.create({
        baseURL: API_BASE_URL,
        timeout: 5000
    })
    instance.interceptors.request.use(config => {
        const token = localStorage.getItem('token')

        if (token) {
            config.headers.authorization = 'Bearer ' + token
        }

        return config
    })
    instance.interceptors.response.use(response => {
        if (!response.data.status) {
            Toast({
                message: response.data.message,
                icon: 'cross'
            })
        }
        return response.data
    }, error => {
        const status = error.response.status
        if (status === 401) {
            Toast({
                message: error.response.data.message,
                icon: 'cross'
            })
            if (localStorage.getItem('token')) {
                localStorage.removeItem('token')
            }
        } else if (status === 500) {
            Toast({
                message: "服务器出错",
                icon: 'cross'
            })
        } else if (status === 400) {
            Toast({
                message: "客户端请求错误",
                icon: 'cross'
            })
        }
    })
    return instance(config)
}