<template>
  <div class="home">
    <!-- 导航条 -->
    <van-nav-bar title="快捷商城" fixed />
    <van-search
    readonly
    shape="round"
    @click="$router.push('/search')"
    placeholder="请输入搜索关键词" />

    <!-- 轮播图 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in bannerList" :key="item.imgUrl">
        <img :src="item.imgUrl" alt="">
      </van-swipe-item>
    </van-swipe>
    <!-- 导航 -->
    <van-grid column-num="5" icon-size="40">
      <van-grid-item v-for="item in navList" :key="item.imgUrl"
      :icon="item.imgUrl"
      text="新品首发"
      @click="$router.push('/category')"
      />
    </van-grid>
    <!-- 主会场 -->
    <div class="main">
      <img src="@/assets/main.png" alt="">
    </div>
    <!-- 猜你喜欢 -->
    <div class="guess">
      <p class="guess-title">————猜 你 喜 欢————</p>
      <div class="goods-list">
        <GoodsItem v-for="item in proList" :key="item.goods_id"
        :item="item" />
      </div>
    </div>
  </div>
</template>
<script>
import GoodsItem from '@/components/GoodsItem.vue'
import { getHomeData } from '@/api/home'
export default {
  name: 'homePage',
  components: {
    GoodsItem
  },
  data () {
    return {
      bannerList: [],
      navList: [],
      proList: []
    }
  },
  async created () {
    const { data: { pageData } } = await getHomeData()
    this.bannerList = pageData.items[1].data
    this.navList = pageData.items[3].data
    this.proList = pageData.items[6].data
  }

}
</script>
<style lang='less' scoped>
.home {
  padding-top: 100px;
  .van-nav-bar {
  z-index: 999;
  background-color: #FA8072;

  ::v-deep .van-nav-bar__title {
    color: white;
    font-size: large;
  }
}
.van-search {
  z-index: 999;
  width: 100%;
  top: 45px;
  position: fixed;
}
.my-swipe .van-swipe-item {
  height: 185px;
  color: #fff;
  font-size: 20px;
  text-align: center;
  background-color: #39a9ed;
}
.my-swipe .van-swipe-item img {
  width: 100%;
  height: 185px;
}
.main img {
  display: block;
  width: 100%;
}
.guess .guess-title {
  height:40px;
  line-height: 40px;
  text-align: center;
  color: #8B0000;
}
.goods-list {
  background-color: #fff;
}
}

</style>
