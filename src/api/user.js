import request from '@/utils/request'

// 获取个人信息
export const getUserInfoDetail = () => {
  return request('/user/info')
}
