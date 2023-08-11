<template>
  <div class="category">
    <van-nav-bar title="全部分类" fixed />
    <van-search readonly shape="round" background="#FFECEC" placeholder="请输入搜索关键字" @click="$router.push('/search')" />
    <!-- 分类列表 -->
    <div class="list-box">
      <div class="left">
        <ul>
          <li v-for="(item, index) in list" :key="item.category_id">
            <a :class="{ active: index === activeIndex }" @click="activeIndex = index" href="javascript:;">{{ item.name
            }}</a>
          </li>
        </ul>
      </div>
        <div class="right">
          <div @click="$router.push(`/searchList?categoryId=${item.category_id}`)"
            v-for="item in list[activeIndex]?.children"
            :key="item.category_id"
            class="cate-goods">
            <img :src="item.image?.external_url" alt="">
            <p>{{ item.name }}</p>
          </div>

      </div>
    </div>
  </div>
</template>
<script>
import { getCategoryData } from '@/api/category'
import { getCategoryList, setCategoryList } from '@/utils/storage'

export default {
  name: 'categoryPage',
  data () {
    return {
      list: getCategoryList(),
      activeIndex: 0
    }
  },
  methods: {
    async getCategoryList () {
      const { data: { list } } = await getCategoryData()
      this.list = list
      setCategoryList(this.list)
    }
  },
  created () {
    if (this.list.length === 0) {
      this.getCategoryList()
    }
  }
}
</script>
<style lang='less' scoped>
.van-nav-bar {
  background-color: #FF5151;
  z-index: 999;

  ::v-deep .van-nav-bar__title {
    color: white;
    font-size: large;
  }
}

.van-search {
  position: fixed;
  width: 100%;
  top: 45px;
  z-index: 999;
}

.category {
  padding-top: 100px;
  padding-bottom: 50px;
  height: 100vh;

  .list-box {
    height: 100%;
    display: flex;

    .left {
      width: 85px;
      height: 100%;
      background-color: #f3f3f3;
      overflow: auto;

      a {
        display: block;
        height: 45px;
        line-height: 45px;
        text-align: center;
        color: #444444;
        font-size: 14px;

        &.active {
          color: #FF5151;
          background-color: #fff;
        }
      }
    }
    .right {
      flex: 1;
      height: 100%;
      background-color: #ffffff;
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-content: flex-start;
      overflow: auto;

      .cate-goods {
        width: 33.3%;
        margin-bottom: 10px;

        img {
          width: 70px;
          height: 70px;
          display: block;
          margin: 5px auto;
        }
        p {
          text-align: center;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
