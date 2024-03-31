/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-31 17:41:45
 * @LastEditTime: 2024-03-31 18:57:50
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \user-app\src\utils\formRules.js
 * @Description: 表格输入校验规则
 */
const emailReg = new RegExp(/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/)
const phoneReg = new RegExp(/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/)
export const emailValidator = (value) => {
    return emailReg.test(value)
}
export const phoneValidator = (value) => {
    return phoneReg.test(value)
}
export const repeatPasswordValidator = (value, repeatValue) => {
    return value === repeatValue
}