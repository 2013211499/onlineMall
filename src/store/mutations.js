import {
  ADD_COUNTER,
  ADD_TO_CART,
  SELECT_ALL
} from './mutations-types'

export default {
    // mutations的唯一目的就是修改state中的状态
    // mutations中的每个方法尽可能完成的事件比较单一一点比较好
    // 功能尽量让mutations来做，因为devtools可以跟踪mutations
    [ADD_COUNTER] (state, payload) {
      payload.count ++
    },
    [ADD_TO_CART] (state, payload) {
      payload.checked = true
      state.cartList.push(payload)
    },
    [SELECT_ALL] (state, payload) {
      state.cartList.forEach(item => {
        item.checked = payload
      })
    }
}