<template>
  <div class="productDetail">
    <!-- 轮播图 -->
    <van-nav-bar title="商品详情" fixed left-arrow @click-left="$router.go(-1)" />
    <van-swipe class="my-swipe" :autoplay="3000" @change="onChange">
      <van-swipe-item v-for="item  in images" :key="item.external_url">
        <img :src="item.external_url" alt="">
      </van-swipe-item>
      <!-- 自定义轮播图指示器 -->
      <template #indicator>
        <div class="custom-indicator">{{ current + 1 }}/{{ images.length }}</div>
      </template>
    </van-swipe>
    <!-- 商品说明 -->
    <div class="info">
      <div class="title">
        <div class="price">
          <span class="new"> ￥ {{ detail.goods_price_min }}</span>
          <span class="old"> ￥ {{ detail.goods_price_max }}</span>
        </div>
        <div class="sellcount"> 已售 {{ detail.goods_sales }}</div>
      </div>
      <div class="msg text-ellipsis-2">{{ detail.goods_name }}</div>
    </div>
  </div>
</template>
<script>
import { getProductDetail } from '@/api/product'

export default {
  name: 'productDetailPage',
  data () {
    return {
      detail: [],
      images: [],
      current: 0
    }
  },
  computed: {
    goodsId () {
      return this.$route.params.id
    }
  },
  methods: {
    async getDetail () {
      const { data: { detail } } = await getProductDetail(this.goodsId)
      this.detail = detail
      this.images = detail.goods_images
    },
    onChange (index) {
      this.current = index
    }
  },
  created () {
    this.getDetail()
  }
}
</script>
<style lang='less' scoped>
.productDetail {
  padding-top: 45px;
  img {
    display: block;
    width: 100%;
  }
}
</style>
