import request from '@/utils/request'

// 获取默认收货地址Id
export const getDefaultId = () => {
  return request.get('/address/defaultId')
}

// 设置默认收货地址Id
export const setDefaultId = (addressId) => {
  return request.post('/address/setDefault', {
    addressId
  })
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

// 添加收货地址
export const addAddress = (name, phone, region, detail) => {
  return request.post('/address/add', {
    form: {
      name,
      phone,
      region,
      detail
    }
  })
}

// 获取省市区编号
export const getRegionTree = () => {
  return request.get('/region/tree')
}

// 编辑收货地址
export const editAddress = (addressId, name, phone, region, detail) => {
  return request.post('/address/edit', {
    addressId,
    form: {
      name,
      phone,
      region,
      detail
    }
  })
}
