/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-24 08:10:29
 * @LastEditTime: 2024-03-24 08:14:53
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \user-app\src\utils\format.js
 * @Description: 时间格式化文件
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

export function dateWithoutYear(date) {
    const time = new Date(date)
    let month = time.getMonth() + 1
    let day = time.getDate()

    if (month < 10) month = '0' + month
    if (day < 10) day = '0' + day

    return `${month}月${day}日`
}

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