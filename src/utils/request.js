import axios from 'axios'
import { Toast } from 'vant'
const instance = axios.create({
  baseURL: 'http://cba.itlike.com/public/index.php?s=/api/',
  timeout: 5000
})
// 自定义配置 - 请求/响应 拦截器
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么

  // 开启loading进行节流
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: 0
  })
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  const res = response.data
  if (res.status !== 200) {
    // Toast是单例的，后续调用会覆盖前者，同时仅存在一个
    // 给提示
    Toast(res.message)
    // 抛出异常
    return Promise.reject(res.message)
  } else {
    Toast.clear()
  }
  return response.data
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error)
})

// 导出配置实例
export default instance
