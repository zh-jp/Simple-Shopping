<template>
  <div class="search">
    <van-nav-bar title="商品搜索" left-arrow @click-left="$router.go(-1)" />
    <van-search v-model="search" show-action placeholder="请输入关键字" clearable>
      <template #action>
        <div @click="onSearch(search)">搜索一下</div>
      </template>
    </van-search>

    <!-- 搜索历史 -->
    <div class="search-history" v-if="history.length > 0">
      <div class="title">
        <span>最近搜索</span>
        <van-icon name="delete-o" size="16" @click="clear" />
      </div>
      <div class="list">
        <div v-for="item in history" :key="item"
        class="list-item" @click="onSearch(item)">
        {{ item }}
        <div class="delIcon"><van-icon name="cross" @click.stop="deleteItem(item)" /></div>
      </div>
    </div>
    </div>
  </div>
</template>
<script>
import { getHistoryList, setHistoryList } from '@/utils/storage'
export default {
  name: 'searchPage',
  data () {
    return {
      search: '', // 输入框内容
      history: getHistoryList()
    }
  },
  methods: {
    onSearch (search) {
      search = search.trim()
      if (search === '') {
        return
      }
      const index = this.history.indexOf(search)
      // 如果已经包含在了搜索历史中，先将其删除
      if (index !== -1) {
        this.history.splice(index, 1)
      }
      this.history.unshift(search)
      setHistoryList(this.history)
      this.$router.push(`/searchList?search=${search}`)
    },
    clear () {
      this.history = []
      setHistoryList(this.history)
    },
    deleteItem (item) {
      const index = this.history.indexOf(item)
      if (index !== -1) {
        this.history.splice(index, 1)
        setHistoryList(this.history)
      }
    }
  }
}
</script>
<style lang='less' scoped>
.search {
  ::v-deep .van-search__action {
    background-color: #c21401;
    color: #fff;
    padding: 0 10px;
    border-radius: 0 5px 0 5px;
    margin-right: 10px;
  }

  .title {
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    align-items:center;
    padding: 0 15px;
  }
  .list {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 0 10px;
    gap: 5%;
  }
  .list-item {
    width: 30%;
    text-align: center;
    padding: 7px;
    line-height: 15px;
    border-radius: 50px;
    background: #fff9;
    font-size: 13px;
    border: 1px solid #efefef;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-bottom: 10px;
  }
  .delIcon {
    display: inline-block;
    justify-content: end;
    color: #696969;
    font-size: 15px;
    line-height: 15px;
  }
}
</style>
