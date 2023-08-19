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
import { getAddressList } from '@/api/address'
import { checkOrder, submitOrder } from '@/api/order'

export default {
  name: 'payPage',
  data () {
    return {
      addressList: [],
      order: {}
    }
  },
  methods: {
    // async setAddress (addressId) {
    //   const { data: { detail } } = await getDetail(addressId)
    //   this.selectedAddress = detail
    // },
    // async defaultAddress () {
    //   const { addressId } = await getDefaultId()
    //   if (addressId) {
    //     this.setAddress(addressId)
    //   }
    // },
    async getAddressList () {
      const { data: { list } } = await getAddressList()
      this.addressList = list
    },
    async getOrderList () {
      // 购物车结算
      if (this.mode === 'cart') {
        const { data: { order, personal } } = await checkOrder(this.mode, {
          cartIds: this.cartIds
        })
        this.order = order
        this.personal = personal
      } else if (this.mode === 'buyNow') { // 立刻购买结算
        const { data: { order, personal } } = await checkOrder(this.mode, {
          goodsId: this.goodsId,
          goodsSkuId: this.goodsSkuId,
          goodsNum: this.goodsNum
        })
        this.order = order
        this.personal = personal
      }
    },
    async submitOrder () {
      if (this.mode === 'cart') {
        await submitOrder(this.mode, {
          cartIds: this.cartIds,
          remark: this.remark
        })
      } else if (this.mode === 'buyNow') {
        await submitOrder(this.mode, {
          goodsId: this.goodsId,
          goodsSkuId: this.goodsSkuId,
          goodsNum: this.goodsNum
        })
      }
      this.$toast.success('成功')
      this.$toast.replace('/myOrder')
    }
  },
  async created () {
    this.getAddressList()
    // this.getOrderList()
  },
  computed: {
    selectedAddress () {
      if (this.addressList.length < 1) {
        return JSON.parse('{"region": {"province":"江苏省","city":"南京市", "region":"栖霞区"},"detail": "北京路1号楼8888室", "address_id": "123", "name":"王小明","phone":"15967777777"}')
      }
      return this.addressList[0] || {}
    },
    longAddress () {
      const region = this.selectedAddress.region
      return region.province + region.city + region.region +
      this.selectedAddress.detail
    },
    mode () { return this.$route.query.mode },
    cartIds () { return this.$route.query.cartIds },
    goodsId () { return this.$route.query.goodsId },
    goodsSkuId () { return this.$route.query.goodsSkuId },
    goodsNum () { return this.$route.query.goodsNum }
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
