/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-24 08:17:17
 * @LastEditTime: 2024-03-31 11:46:58
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \user-app\src\service\socket.js
 * @Description: websocket 向服务器发送订单消息
 */
import router from '../router'
import {
    Toast
} from 'vant'
const URL = 'ws://localhost:9527'
/**
 * Description 将订单数据上传到websocket服务器上
 * @param {any} data 订单数据对象
 * @returns {any}
 */
export function orderSocket(orderData) {
    const socket = new WebSocket(URL)
    // 向服务器发送订单数据
    socket.onopen = () => {
        console.log('WebSocket connected');
        socket.send(JSON.stringify(orderData))
    }
    // 接收服务器响应
    socket.onmessage = (event) => {
        console.log("WebSocket onmessage")
        const response = JSON.parse(event.data);
        console.log('Server Response:', response);
        // 根据服务器响应进行相应处理
        if (response.status) {
            router.push("/order")
            Toast.success(response.message)
        }
        // 关闭socket
        socket.close()
    }
    socket.onerror = (error) => {
        console.error('WebSocket error:', error);
    };
    socket.onclose = () => {
        console.log('WebSocket closed');
    };
}