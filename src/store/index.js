import Vue from "vue";
import Vuex from "vuex"
Vue.use(Vuex)
export default new Vuex.Store({
    // 获得下单选择菜品
    state: {
        selectedFoods: JSON.parse(sessionStorage.getItem('selection'))
    },
    // 对菜品的炒作
    mutations: {
        // 对菜品列表进行变更
        changeSelectedFoods(state, selection) {
            sessionStorage.setItem('selection', JSON.stringify(selection))
            state.selectedFoods = selection
        },
        // 用户删除一项菜品
        deleteSelectedFoodByIndex(state, selection) {
            state.selectedFoods.splice(selection, 1)
            sessionStorage.setItem('selection', JSON.stringify(state.selectedFoods))
        }
    },
    getters: {
        // 获取总数
        totalNumber(state) {
            return state.selectedFoods.reduce((total, food) => total + food.step, 0);
        },
        // 获取总价
        totalPrice(state) {
            return state.selectedFoods.reduce((total, food) => total + food.step * food.price, 0);
        },
    },
    actions: {

    },
    modules: {}
})