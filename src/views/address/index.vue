<template>
  <div class="address">
    <van-nav-bar title="收货地址" fixed left-arrow @click-left="$router.go(-1)" />
    <div class="address-item" v-for="item in addressList" :key="item.address_id">
      <div class="top">
        <span><van-icon name="smile-o" />姓名：{{ item.name }}</span>
        <span><van-icon name="phone-o" />手机：{{ item.phone }}</span>
      </div>
      <hr>
      <div class="mid">{{ longAddress(item) }}</div>
      <div class="footer">
        <van-checkbox :value="item.isChecked" @click="toggleDefault(item)">默认地址</van-checkbox>
        <div class="edit">编辑地址</div>
      </div>

    </div>

    <div class="btn" @click="addAddress">添加收货地址</div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'addressPage',
  data () {
    return {
      addressList: [
        {
          address_id: 10012,
          name: '张小',
          phone: '18999292929',
          province_id: 782,
          city_id: 783,
          region_id: 785,
          detail: '北京路1号楼8888室',
          user_id: 10003,
          isChecked: true,
          region: {
            province: '上海',
            city: '上海市',
            region: '徐汇区'
          }
        },
        {
          address_id: 1001287,
          name: '王二',
          phone: '18999292929',
          province_id: 782,
          city_id: 783,
          region_id: 785,
          detail: '北京路1号楼8888室',
          user_id: 10003,
          isChecked: false,
          region: {
            province: '上海',
            city: '上海市',
            region: '徐汇区'
          }
        }
      ]
    }
  },
  computed: {
    ...mapGetters('address', ['longAddress'])

  },
  methods: {
    ...mapActions('address', ['setDefaultAddress']),
    toggleDefault (address) {
      if (address.isChecked) {
        return
      }
      console.log('methods:', address)
      this.setDefaultAddress({ address })
    },
    addAddress () {}

  }
}
</script>
<style lang="less" scoped>
.address {
  padding-top: 46px;
}

.address-item {
  height: 100px;
  border-style: dashed;
  margin: 3px 5px 10px 5px;
  padding: 5px 5px 0px 5px;

  .top {
    display: flex;
    font-size: 18px;
    justify-content: space-between;
  }

  .mid {}
  .footer {
    display: flex;
    justify-content: space-between;
    position: relative;
    bottom: -20px;
    .edit {
      color: #fff;
      background-color: #fe5630;
      border-radius: 18px;
      font-size: 16px;
      line-height: 30px;
      height: 30px;
      width: 90px;
      text-align: center;
    }
  }
}

.btn {
  position: fixed;
  bottom: 0;
  width: 100%;
  align-self: center;
  height: 40px;
  line-height: 40px;
  border-radius: 20px;
  text-align: center;
  color: rgb(255, 255, 255);
  background-color: #fe5630;
}
</style>
