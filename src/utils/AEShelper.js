/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-24 09:37:19
 * @LastEditTime: 2024-03-24 09:42:53
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \user-app\src\utils\AEShelper.js
 * @Description: 头部注释配置模板
 */
import * as CryptoJS from "crypto-js"
export default class AESHelper {
    privateKey = "liuyongjie"
    /**
     * Description AES加密函数
     * @param {any} word:string 需要加密的字符串
     * @returns {string} 加密后的字符串
     */
    static encrypt(word) {
        const ciphertext = CryptoJS.AES.encrypt(
            word,
            this.privateKey
        ).toString()
        return ciphertext
    }
    /**
     * Description AES加密字符串解密
     * @param {any} word:string   加密后的字符串
     * @returns {string} 解密后的字符串
     */
    static decrypt(word) {
        let bytes = CryptoJS.AES.decrypt(word, this.privateKey)
        let originalText = bytes.toString(CryptoJS.enc.Utf8)
        return originalText
    }
}