// 约定一个通用键名
const INFO_KEY = 'shopping_info'
const HISTORY_KEY = 'shopping_search_history'

// 保存、设置、移除用户token
export const getInfo = () => {
  const defaultOBJ = { token: '', userId: '' }
  const result = localStorage.getItem(INFO_KEY)
  return result ? JSON.parse(result) : defaultOBJ
}

export const setInfo = (obj) => {
  localStorage.setItem(INFO_KEY, JSON.stringify(obj))
}
export const removeInfo = () => {
  localStorage.removeItem(INFO_KEY)
}

// 保存、设置搜索历史纪录
export const getHistoryList = () => {
  const result = localStorage.getItem(HISTORY_KEY)
  return result ? JSON.parse(result) : []
}

export const setHistoryList = (arr) => {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(arr))
}
