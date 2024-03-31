/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-24 08:10:29
 * @LastEditTime: 2024-03-30 22:22:59
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \user-app\src\utils\format.js
 * @Description: 时间格式化文件
 */
/**
 * Description 返回周几格式字符串
 * @param {any} date
 * @returns {any}
 */
export function weekFormat(date) {
    switch (new Date(date).getDay()) {
        case 0:
            return '周日'
        case 1:
            return '周一'
        case 2:
            return '周二'
        case 3:
            return '周三'
        case 4:
            return '周四'
        case 5:
            return '周五'
        case 6:
            return '周六'
    }
}

/**
 * Description 返回x月x日格式字符串
 * @param {any} date
 * @returns {any}
 */
export function dateWithoutYear(date) {
    const time = new Date(date)
    let month = time.getMonth() + 1
    let day = time.getDate()

    if (month < 10) month = '0' + month
    if (day < 10) day = '0' + day

    return `${month}月${day}日`
}

/**
 * Description 返回yyyy-mm-dd hh:mm:ss格式字符串
 * @param {any} date
 * @returns {any}
 */
export function dateFormat(date) {
    const time = new Date(date)
    const year = time.getFullYear()
    let month = time.getMonth() + 1
    let day = time.getDate()
    let hour = time.getHours()
    let minutes = time.getMinutes()
    let second = time.getSeconds()

    if (month < 10) month = '0' + month
    if (day < 10) day = '0' + day
    if (hour < 10) hour = "0" + hour
    if (minutes < 10) minutes = "0" + minutes
    if (second < 10) second = "0" + second
    return `${year}-${month}-${day} ${hour}:${minutes}:${second}`
}

/**
 * Description 将时间字符串转换为时间戳F
 * @param {any} time
 * @returns {any}
 */
export function timeToTimestamp(time) {
    let timestamp = Date.parse(new Date(time).toString());
    return timestamp
}

/**
 * Description 基于create_time时间字符串和expirein过期时间number得到过期时间时间戳
 * @param {any} create_time
 * @param {any} expirein
 * @returns {any}
 */
export function get_expirein_time(create_time, expirein) {
    let createTime = new Date(create_time)
    // 计算过期时间
    const expirein_time = new Date(createTime.getTime() + expirein * 24 * 60 * 60 * 1000);
    // 转换为北京时间
    expirein_time.setHours(expirein_time.getHours() + 8);
    // 返回时间戳
    return expirein_time.getTime()
}