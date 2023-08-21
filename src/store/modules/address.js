import { getDefaultId, getDetail, getAddressList, setDefaultId, getRegionTree, addAddress } from '@/api/address'

export default {
  namespaced: true,
  state () {
    return {
      addressList: [],
      defaultId: '',
      defaultAddress: {},
      regionTree: {}
    }
  },
  mutations: {
    setDefaultAddress (state, address) {
      state.defaultId = address.address_id
      state.defaultAddress = address
    },
    setAddressList (state, newList) {
      state.addressList = newList
    },
    setRegionTree (state, regionTree) {
      state.regionTree = regionTree
    }
  },
  actions: {
    async getDefaultAddress (context) {
      const { data: { addressId } } = await getDefaultId()
      const { data: { detail } } = await getDetail(addressId)
      context.commit('setDefaultAddress', detail)
    },
    async getAddressList (context) {
      const { data: { list } } = await getAddressList()
      // 为列表里每个元素增加 isChecked 属性表示是否为默认地址
      const length = list.length
      for (let i = 0; i < length; i++) {
        list[i].isChecked = false
        if (list[i].address_id === context.state.defaultId) {
          list[i].isChecked = true
        }
      }
      context.commit('setAddressList', list)
    },
    async setDefaultAddress (context, { address }) {
      await setDefaultId(address.address_id)
      context.commit('setDefaultAddress', address)
      context.dispatch('getAddressList')
    },
    async getRegionTree (context) {
      const { data: { list } } = await getRegionTree()
      context.commit('setRegionTree', list)
    },
    async addNewAddress (context, { name, phone, region, detail }) {
      await addAddress(name, phone, region, detail)
      context.dispatch('getAddressList')
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
