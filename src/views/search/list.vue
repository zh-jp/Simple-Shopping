<template>
  <div class="search">
    <van-nav-bar title="商品列表" fixed left-arrow @click-left="$router.go(-1)" />
    <van-search readonly
    shape="round" background="#ffffff" :value="querySearch || '搜索商品'" show-action>
      <template #action>
        <van-icon class="tool" name="apps-o" @click="$router.push('/category')" />
      </template>
    </van-search>

    <!-- 排序按钮 -->
    <van-row class="sort-btn">
      <van-col span="8" class="sort-item" @click="changeSortType('all')">综合</van-col>
      <van-col span="8" class="sort-item" @click="changeSortType('sales')">销量</van-col>
      <van-col span="8" class="sort-item" @click="changeSortType('price')">价格</van-col>
    </van-row>

    <div class="goods-list">
      <GoodsItem v-for="item in proList" :key="item.goods_id" :item="item" />
    </div>
  </div>
</template>
<script>
import GoodsItem from '@/components/GoodsItem.vue'
import { getProductList } from '@/api/product'

export default {
  name: 'SearchList',
  components: {
    GoodsItem
  },
  data () {
    return {
      proList: [],
      page: 1,
      sortType: 'all'
    }
  },
  computed: {
    querySearch () {
      return this.$route.query.search
    }
  },
  methods: {
    // 更改搜索排序类型
    changeSortType (type) {
      this.sortType = type
      this.getProList()
    },
    async getProList () {
      const { data: { list } } = await getProductList({
        sortType: this.sortType,
        categoryId: this.$route.query.categoryId,
        goodsName: this.querySearch,
        page: this.page
      })
      this.proList = list.data
    }

  },
  async created () {
    this.getProList()
  }
}
</script>
<style lang="less" scoped>
.search {
  padding-top: 45px;

  .tool {
    font-size: 24px;
    height: 40px;
    line-height: 40px;
  }

  .sort-btn {
    display: flex;
    height: 36px;
    list-style: 36px;

    .sort-item {
      text-align: center;
      flex: 1;
      font-size: 16px;
      border: 1cm black;
    }
  }

  .goods-list {
    background-color: white;
  }
}
</style>
