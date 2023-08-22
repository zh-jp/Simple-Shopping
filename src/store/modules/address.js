import { getDefaultId, getAddressList, setDefaultId, getRegionTree, addAddress, getDetail } from '@/api/address'

export default {
  namespaced: true,
  state () {
    return {
      addressList: [],
      defaultId: '',
      regionTree: {}
    }
  },
  mutations: {
    setDefaultId (state, id) {
      state.defaultId = id
    },
    setAddressList (state, newList) {
      state.addressList = newList
    },
    setRegionTree (state, regionTree) {
      state.regionTree = regionTree
    },
    // 为地址增加Checked属性
    addCheckedAttr (state) {
      // 为列表里每个元素增加 isChecked 属性表示是否为默认地址
      const length = state.addressList.length
      // console.log(context.state.defaultId)
      for (let i = 0; i < length; i++) {
        state.addressList[i].isChecked = false
        if (state.addressList[i].address_id === state.defaultId) {
          state.addressList[i].isChecked = true
        }
      }
    }
  },
  actions: {
    async getAddressList (context) {
      const { data: { defaultId } } = await getDefaultId()
      const { data: { list } } = await getAddressList()
      context.commit('setAddressList', list)
      context.commit('setDefaultId', defaultId)
      context.commit('addCheckedAttr')
    },
    async setDefaultIdAction (context, id) {
      await setDefaultId(id)
      context.commit('setDefaultId', id)
      context.commit('addCheckedAttr')
    },
    async getRegionTree (context) {
      const { data: { list } } = await getRegionTree()
      context.commit('setRegionTree', list)
    },
    async addNewAddress (context, { name, phone, region, detail }) {
      await addAddress(name, phone, region, detail)
      context.dispatch('getAddressList')
    },
    async getAddressDetail (context, id) {
      const { data: { detail } } = await getDetail(id)
      return detail
    }
  },
  getters: {
    longAddress (state) {
      return function (address) {
        const region = address.region
        return region.province + region.city + region.region + address.detail
      }
    }
  }
}
