import {
    axiosInstance
} from './index'

export function getUserInfo() {
    return axiosInstance({
        url: "/user_info",
        method: "get",
    })
}

export function updateUserInfo(data) {
    return axiosInstance({
        url: '/user_info',
        method: 'put',
        data
    })
}

export function isPaymentPassExist() {
    return axiosInstance({
        url: "/user-payment-pass/exist",
        method: 'get'
    })
}

export function validatePaymentPass(data) {
    return axiosInstance({
        url: "/user-payment-pass/validate",
        method: 'post',
        data
    })
}

export function updatePaymentPass(data) {
    return axiosInstance({
        url: "/user-payment-pass/update",
        method: 'put',
        data
    })
}

export function updateWallet(data) {
    return axiosInstance({
        url: "/user-wallet",
        method: 'put',
        data
    })
}