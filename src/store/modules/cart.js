import { getCartList, updateCart, deleteCart } from '@/api/cart'
import { Toast } from 'vant'

export default {
  namespaced: true,
  state () {
    return {
      cartList: []
    }
  },
  mutations: {
    setCartList (state, newList) {
      state.cartList = newList
    },
    toggleCheck (state, goodsId) {
      const length = state.cartList.length
      for (let index = 0; index < length; index++) {
        if (state.cartList[index].goods_id === goodsId) {
          state.cartList[index].isChecked = !state.cartList[index].isChecked
          break
        }
      }
    },
    toggleAllCheck (state, value) {
      state.cartList.forEach(item => { item.isChecked = value })
    },
    changeCount (state, { goodsId, goodsNum }) {
      const length = state.cartList.length
      for (let index = 0; index < length; index++) {
        if (state.cartList[index].goods_id === goodsId) {
          state.cartList[index].goods_num = goodsNum
          break
        }
      }
    }
  },
  actions: {
    async getCartList (context) {
      const { data: { list } } = await getCartList()
      // 为购物车列表里每个商品添加勾选属性
      list.forEach(item => {
        item.isChecked = true
      })
      context.commit('setCartList', list)
    },
    async changeCount (context, { goodsId, goodsNum, goodsSkuId }) {
      context.commit('changeCount', { goodsId, goodsNum })
      await updateCart(goodsId, goodsNum, goodsSkuId)
    },
    async deleteSelect (context) {
      const selected = context.getters.cartSelect
      const cartIds = selected.map(item => item.id)
      await deleteCart(cartIds)
      Toast('删除成功')
      context.dispatch('getCartList')
    }
  },
  getters: {
    // 购物车商品总数
    cartTotal (state) {
      return state.cartList.reduce((sum, item) => sum + item.goods_num, 0)
    },
    // 是否全部勾选
    isAllChecked (state) {
      return state.cartList.every(item => item.isChecked)
    },
    // 购物车总消费额
    totalCount (state) {
      return state.cartList.reduce(
        (sum, item) => { return sum + item.goods_num * item.goods.goods_price_min },
        0).toFixed(2)
    },
    // 选中商品的总额
    totalSelect (state) {
      let sum = 0
      const length = state.cartList.length
      for (let index = 0; index < length; index++) {
        const obj = state.cartList[index]
        if (obj.isChecked) {
          sum += (obj.goods_num * obj.goods.goods_price_min)
        }
      }
      return sum
    },
    // 选中的商品
    cartSelect (state) {
      return state.cartList.filter(item => item.isChecked)
    }
  }

}
