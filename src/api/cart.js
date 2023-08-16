import request from '@/utils/request'

// 加入购物车
// 参数分别为：商品Id，商品数量， 商品规格
export const addCart = (goodsId, goodsNum, goodsSkuId) => {
  return request.post('/cart/add', {
    goodsId,
    goodsNum,
    goodsSkuId
  })
}

// 获取购物车列表
export const getCartList = () => {
  return request.get('/cart/list')
}

// 获取购物车商品总数
export const getCartTotal = () => {
  return request.get('/cart/total')
}

// 更新购物车商品
export const updateCart = (goodsId, goodsNum, goodsSkuId) => {
  return request.post('/cart/update', {
    goodsId,
    goodsNum,
    goodsSkuId
  })
}

// 删除购物车商品
export const deleteCart = (cartIds) => {
  return request.post('/cart/clear', {
    cartIds
  })
}
