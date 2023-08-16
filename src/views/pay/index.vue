<template>
  <div class="pay">
    <van-nav-bar fixed title="订单结算台" @click="$router.go(-1)" />

    <!-- 收货地址栏 -->
    <div class="address">
      <div class="left-icon"><van-icon name="logistics" /></div>
      <div class="info" v-if="selectedAddress.address_id">
        <div class="info-content">
          <span class="name">{{ selectedAddress.name }}</span>
          <span class="mobile">{{ selectedAddress.phone }}</span>
        </div>
        <div class="info-address">{{ longAddress }}</div>
      </div>
      <div class="info" v-else>请选择配送地址</div>
      <div class="right-icon"><van-icon name="arrow" /></div>
    </div>

    <!-- 订单明细 -->
    <div class="pay-list" v-if="order.goodsList">
      <div class="list"></div>
    </div>
  </div>
</template>
<script>
import { getDefaultId, getDetail } from '@/api/address'

export default {
  name: 'payPage',
  data () {
    return {
      addressList: [],
      selectedAddress: {},
      order: {}
    }
  },
  methods: {
    async setAddress (addressId) {
      const { data: { detail } } = await getDetail(addressId)
      this.selectedAddress = detail
    },
    async defaultAddress () {
      const { addressId } = await getDefaultId()
      if (addressId) {
        this.setAddress(addressId)
      }
    }
  },
  created () {
    this.defaultAddress()
  },
  computed: {
    longAddress () {
      const region = this.selectedAddress.region
      return region.province + region.city + region.region +
      this.selectedAddress.detail
    }
  }
}
</script>
<style lang='less' scoped>
.pay {
  padding-top: 46px;
  padding-bottom: 46px;
}
.address {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 20px;
  font-size: 14px;
  color: #666;
  position: relative;
  background: url(@/assets/border-line.png) bottom repeat-x;
  .left-icon {
    margin-right: 20px;
  }
  .right-icon {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-7px);
  }

}
</style>
