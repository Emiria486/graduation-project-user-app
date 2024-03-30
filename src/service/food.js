import {
    axiosInstance
} from './index'

export function getFoods(params) {
    return axiosInstance({
        url: "/food",
        method: "get",
        params
    })
}