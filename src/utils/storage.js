// 约定一个通用键名
const INFO_KEY = 'shopping_info'
const HISTORY_KEY = 'shopping_search_history'
const CATEGORY_KEY = 'category_history'
const REGION_KEY = 'region_history'
const REGION_DIC = 'region_directory'

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

// 保存、设置、删除分类页数据
export const getCategoryList = () => {
  const result = localStorage.getItem(CATEGORY_KEY)
  return result ? JSON.parse(result) : []
}

export const setCategoryList = (arr) => {
  localStorage.setItem(CATEGORY_KEY, JSON.stringify(arr))
}

export const removeCategoryList = () => {
  localStorage.removeItem(CATEGORY_KEY)
}

// 保存、设置、删除地区信息
export const getRegionList = () => {
  const result = localStorage.getItem(REGION_KEY)
  return result ? JSON.parse(result) : []
}

export const setRegionList = (arr) => {
  localStorage.setItem(REGION_KEY, JSON.stringify(arr))
}

export const removeRegionList = () => {
  localStorage.removeItem(REGION_KEY)
}

// 保存、设置、删除地区数字字典
export const getRegionDic = () => {
  const result = localStorage.getItem(REGION_DIC)
  return result ? JSON.parse(result) : {}
}

export const setRegionDic = (obj) => {
  localStorage.setItem(REGION_DIC, JSON.stringify(obj))
}

export const removeItem = () => {
  localStorage.removeItem(REGION_DIC)
}
