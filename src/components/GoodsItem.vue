<template>
 <div v-if="item.goods_id"
    class="goods-item"
    @click="$router.push(`/productDetail/${item.goods_id}`)">
    <div class="left">
        <img class="pic" :src="item.goods_image" alt="" />
    </div>
    <div class="right">
        <p class="tit text-ellipsis-2">{{ item.goods_name }}</p>
        <p class="count">已售{{ item.goods_sales }} 件</p>
        <p class="price">
            <span class="new">￥{{ item.goods_price_min }}</span>
            <span class="old">￥{{ item.goods_price_max }}</span>
        </p>
    </div>
 </div>
</template>
<script>

export default {
  name: 'GoodsItem',
  props: {
    item: {
      type: Object,
      // 默认值为对象时，要写成函数的形式
      default: () => {
        return {}
      }
    }
  }
}
</script>
<style>
.goods-item {
    height: 148px;
    margin-bottom: 10px;
    padding: 5px;
    background-color: #fff;
    display: flex;
    .left {
        width: 127px;

        .pic {
            display: block;
            width: 100%;
        }
    }
    .right{
        flex: 1;
        font-size: 14px;
        line-height: 1.3;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        .count {
            color: #999;
            font-size: 12px;
        }
        .price {
            color: #999;
            font-size: 16px;
            .new {
                color: #f03c3c;
                margin-left: 10px;
            }
            .old {
                text-decoration: line-through;
                font-size: 12px;
            }
        }
    }
}
</style>
