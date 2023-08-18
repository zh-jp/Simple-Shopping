import request from '@/utils/request'

// 获取默认收货地址Id
export const getDefaultId = () => {
  return request.get('/address/defaultId')
}

// 获取收货地址详情
export const getDetail = (addressId) => {
  return request.get('/address/detail', {
    params: {
      addressId
    }
  })
}

// 获取收货地址列表
export const getAddressList = () => {
  return request.get('/address/list')
}
