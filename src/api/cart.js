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
