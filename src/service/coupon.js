/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-24 08:15:38
 * @LastEditTime: 2024-03-24 09:22:31
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \user-app\src\service\coupon.js
 * @Description: 优惠劵api接口
 */
import {
    axiosInstance
} from "./index"

export function getIssueCoupons() {
    return axiosInstance({
        url: "/issue-coupons",
        method: "get",
    })
}

export function getUserCoupons() {
    return axiosInstance({
        url: "/user-coupons",
        method: "get"
    })
}

export function addUserCoupon(data) {
    return axiosInstance({
        url: "/user_coupons",
        method: 'post',
        data
    })
}