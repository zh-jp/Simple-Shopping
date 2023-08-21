<template>
  <div class="address">
    <van-nav-bar title="收货地址" fixed left-arrow @click-left="$router.go(-1)" />
    <div class="address-item" v-for="item in addressList" :key="item.address_id" >
      <div class="top">
        <span><van-icon name="smile-o" />姓名：{{ item.name }}</span>
        <span><van-icon name="phone-o" />手机：{{ item.phone }}</span>
      </div>
      <hr>
      <div class="mid">{{ longAddress(item) }}</div>
      <div class="footer">
        <van-checkbox :value="item.isChecked" @click.stop="toggleDefault(item)">默认地址</van-checkbox>
        <div class="edit" @click="editAddress(item.address_id)">编辑地址</div>
      </div>

    </div>
    <div class="btn" @click="addAddress">添加收货地址</div>

  </div>
</template>
<script>
import { mapGetters, mapActions, mapState } from 'vuex'

export default {
  name: 'addressPage',
  data () {
    return {
      myAddress: []
    }
  },
  computed: {
    ...mapGetters('address', ['longAddress']),
    ...mapState('address', ['addressList'])

  },
  created () {
    this.getAddressList()
  },
  methods: {
    ...mapActions('address', ['getRegionTree', 'getAddressList', 'setDefaultIdAction']),
    toggleDefault (address) {
      if (address.isChecked) {
        return
      }
      this.setDefaultIdAction(address.address_id)
      this.getAddressList()
    },
    addAddress () {
      this.$router.push('/addAddress')
    },
    editAddress (id) {
      this.$router.push(`/editAddress/${id}`)
    }
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
