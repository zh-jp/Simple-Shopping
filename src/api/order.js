import request from '@/utils/request'

// 订单结算确认
export const checkOrder = (mode, obj) => {
  return request.get('/checkout/order', {
    params: {
      mode,
      delivery: 10, // 配送方式
      couponId: 0, // 优惠券
      isUsePoints: 0, // 使用用户积分的点数
      ...obj // 将创递来的参数对象动态展开
    }
  })
}

// 提交订单
export const submitOrder = (mode, obj) => {
  return request.post('/check/submit', {
    mode,
    delivery: 10,
    couponId: 10,
    isUsePoints: 0,
    ...obj
  })
}
