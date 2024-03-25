/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-24 08:16:49
 * @LastEditTime: 2024-03-24 09:23:26
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \user-app\src\service\login.js
 * @Description: 登录api接口
 */
import {
    axiosInstance
} from './index'

export function userLogin(data) {
    return axiosInstance({
        url: "/login",
        method: "post",
        data
    })
}