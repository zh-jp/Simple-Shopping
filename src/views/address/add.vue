<template>
    <div class="addAddress">
        <van-nav-bar title="新增收货地址" fixed left-arrow @click-left="$router.go(-1)" />

        <van-field v-model.trim="newName" label="姓名" placeholder="请输入姓名" />
        <van-field v-model="newPhone" label="手机" placeholder="请输入手机" />
        <van-field v-model="fieldValue" is-link readonly label="地区" placeholder="请选择所在地区" @click="editRegion" />
        <van-popup v-model="showPanel" round position="bottom">
            <van-cascader v-model="cascaderValue" title="请选择所在地区" :options="regionOption" @close="showPanel = false"
                @finish="onFinish" />
        </van-popup>
        <van-field v-model="newDetail" label="详细地址" placeholder="详细地址" />
        <div class="btn-confirm" @click="confirmAdd">确定添加</div>

    </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import { getRegionList, setRegionList } from '@/utils/storage'

export default {
  name: 'addressAddPage',
  data () {
    return {
      showPanel: false,
      fieldValue: '',
      cascaderValue: '',
      newName: '',
      newPhone: '',
      newRegion: [],
      newDetail: '',
      regionOption: []
    }
  },
  computed: {
    ...mapState('address', ['regionTree'])
  },
  methods: {
    ...mapActions('address', ['getRegionTree', 'addNewAddress']),
    onFinish ({ selectedOptions }) {
      this.showPanel = false
      selectedOptions.map((item) => this.newRegion.push({ value: item.value, label: item.text }))
      this.fieldValue = ''
      const length = this.newRegion.length
      for (let i = 0; i < length; i++) {
        this.fieldValue += this.newRegion[i].label + ' '
      }
    },
    createOption () {
      for (const province in this.regionTree) {
        const element = this.regionTree[province]
        const obj = { text: element.name, value: element.id, children: [] }
        const cities = element.city
        for (const city in cities) {
          const element = cities[city]
          const obj2 = { text: element.name, value: element.id, children: [] }
          const regions = element.region
          for (const region in regions) {
            const element = regions[region]
            const obj3 = { text: element.name, value: element.id }
            obj2.children.push(obj3)
          }
          obj.children.push(obj2)
        }
        this.regionOption.push(obj)
      }
    },
    editRegion () {
      this.showPanel = true
    },
    valueInfo () {
      if (!this.newName) {
        this.$toast('请输入姓名')
        return false
      }
      if (!/^1[3-9]\d{9}$/.test(this.newPhone)) {
        this.$toast('请输入正确的手机号')
        return false
      }
      if (!this.fieldValue) {
        this.$toast('请选择收货地区')
        return false
      }
      if (!this.newDetail) {
        this.$toast('请输入正确的详细地址')
        return false
      }
      return true
    },
    confirmAdd () {
      if (this.valueInfo()) {
        const obj = { name: this.newName, phone: this.newPhone, region: this.newRegion, detail: this.newDetail }
        this.addNewAddress(obj).then((result) => this.$toast('地址添加成功'))
        this.$router.go(-1)
      }
    }
  },
  created () {
    this.regionOption = getRegionList()
    if (this.regionOption.length === 0) {
      this.getRegionTree()
      this.createOption()
      setRegionList(this.regionOption)
    }
  }
}
</script>
<style lang="less" scoped>
.addAddress {
    padding-top: 46px;
}

.btn-confirm {
    height: 40px;
    line-height: 40px;
    margin: 20px;
    border-radius: 20px;
    text-align: center;
    color: rgb(255, 255, 255);
    background-color: orange;
}
</style>
