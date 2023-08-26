<template>
    <div class="editAddress">
        <van-nav-bar title="编辑收货地址" fixed left-arrow @click-left="$router.go(-1)" />
        <van-field v-model.trim="oldAddress.name" label="姓名" placeholder="请输入姓名" />
        <van-field v-model="oldAddress.phone" label="手机" placeholder="请输入手机" />
        <van-field v-model="fieldValue" is-link readonly label="地区" placeholder="请选择所在地区" @click="editRegion" />
        <van-popup v-model="showPanel" round position="bottom">
            <van-cascader v-model="cascaderValue" title="请选择所在地区" :options="regionOption" @close="showPanel = false"
                @finish="onFinish" />
        </van-popup>
        <van-field v-model="oldAddress.detail" label="详细地址" placeholder="详细地址" />
        <div class="btn-confirm" @click="confirmEdit">确定修改</div>
        <div class="btn-delete" @click="deleteAddress">删除地址</div>
    </div>
</template>
<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import { getRegionList, setRegionList, getRegionDic, setRegionDic } from '@/utils/storage'
import { editAddress, deleteAddress } from '@/api/address'

export default {
  name: 'addressEditPage',
  data () {
    return {
      addressId: '',
      showPanel: false,
      oldAddress: {},
      regionOption: [],
      regionDirectory: {},
      cascaderValue: '',
      fieldValue: ''
    }
  },
  methods: {
    ...mapActions('address', ['getAddressDetail', 'getRegionTree']),

    createOption () {
      for (const province in this.regionTree) {
        const element = this.regionTree[province]
        const obj = { text: element.name, value: element.id, children: [] }
        this.regionDirectory[element.name] = element.id
        const cities = element.city
        for (const city in cities) {
          const element = cities[city]
          const obj2 = { text: element.name, value: element.id, children: [] }
          this.regionDirectory[element.name] = element.id
          const regions = element.region
          for (const region in regions) {
            const element = regions[region]
            const obj3 = { text: element.name, value: element.id }
            this.regionDirectory[element.name] = element.id
            obj2.children.push(obj3)
          }
          obj.children.push(obj2)
        }
        this.regionOption.push(obj)
      }
    },
    async confirmEdit () {
      const { name, phone, region, detail } = this.oldAddress
      await editAddress(this.addressId, name, phone, region, detail)
      this.$toast('地址修改成功！')
      this.$router.go(-1)
    },
    editRegion () {
      this.showPanel = true
    },
    onFinish ({ selectedOptions }) {
      this.showPanel = false
      const newRegion = []
      selectedOptions.map((item) => newRegion.push({ value: item.value, label: item.text }))
      this.fieldValue = ''
      const length = newRegion.length
      for (let i = 0; i < length; i++) {
        this.fieldValue += newRegion[i].label + ' '
      }
      this.oldAddress.region = newRegion
    },
    async deleteAddress () {
      await deleteAddress(this.addressId)
      this.$toast('地址删除成功')
      this.$router.go(-1)
    }
  },
  async created () {
    this.addressId = this.$route.params.id
    this.oldAddress = await this.getAddressDetail(this.addressId)
    const res = this.longAddress(this.oldAddress)
    this.fieldValue = res.split(this.oldAddress.detail).join('')
    this.regionOption = getRegionList()
    this.regionDirectory = getRegionDic()
    if (this.regionOption.length === 0 || Object.keys(this.regionDirectory).length === 0) {
      await this.getRegionTree()
      this.createOption()
      setRegionList(this.regionOption)
      setRegionDic(this.regionDirectory)
    }
    const newRegion = []
    const oldRegion = this.oldAddress.region
    for (const key in oldRegion) {
      const label = oldRegion[key]
      const value = this.regionDirectory[label]
      newRegion.push({ label, value })
    }
    this.oldAddress.region = newRegion
  },
  computed: {
    ...mapState('address', ['regionTree']),
    ...mapGetters('address', ['longAddress'])
  }
}
</script>
<style lang="less" scoped>
.editAddress {
    padding-top: 46px;
}
.btn-confirm, .btn-delete {
    height: 40px;
    line-height: 40px;
    margin: 20px;
    border-radius: 20px;
    text-align: center;
    color: rgb(255, 255, 255);
    background-color: orange;
}
.btn-delete {
  background-color: #3f3f3f;
}
</style>
