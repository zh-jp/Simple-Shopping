<template>
    <div class="address">
        <van-nav-bar title="收货地址" fixed left-arrow @click-left="$router.go(-1)" />
        <div v-for="item in addressList" :key="item.address_id">
            <div class="top">
                <span><van-icon name="smile-o" />姓名：{{ item.name }}</span>
                <span><van-icon name="phone-o" />手机：{{ item.phone }}</span>
            </div>
            <div class="mid">{{ longAddress(item) }}</div>
        </div>

        <div class="btn">添加收货地址</div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'

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
          region: {
            province: '上海',
            city: '上海市',
            region: '徐汇区'
          }
        }]
    }
  },
  computed: {
    ...mapGetters('address', ['longAddress'])
  }
}
</script>
<style lang="less" scoped>
.address {
    padding-top: 45px;
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
