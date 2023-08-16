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
          <span class="new"> ￥{{ detail.goods_price_min }}</span>
          <span class="old"> ￥{{ detail.goods_price_max }}</span>
        </div>
        <div class="sellcount"> 已售 {{ detail.goods_sales }}</div>
      </div>
      <div class="msg text-ellipsis-2">{{ detail.goods_name }}</div>
    </div>

    <!-- 商品服务 -->
    <div class="service">
      <div class="left-words">
        <span><van-icon name="passed" />七天无理由退货</span>
        <span><van-icon name="passed" />48小时发货</span>
      </div>
      <div class="right-icon"><van-icon name="arrow" /></div>
    </div>

    <!-- 商品评价  -->
    <div class="comment">
      <div class="comment-title">
        <div class="left">商品评价({{ num_of_comments }}条)</div>
        <div class="right">查看更多<van-icon name="arrow" /></div>
      </div>
      <div class="comment-list">
        <div class="comment-item" v-for="item in commentList" :key="item.comment_id">
          <div class="top">
            <img :src="item.user.avatar_url || defaultImg" alt="">
            <div class="name">{{ item.user.nick_name }}</div>
            <van-rate readonly :size=16 :value="item.score / 2" color="#ffd21e" void-icon="star" void-color="#eee" />
          </div>
          <div class="content">{{ item.content }}</div>
          <div class="time">{{ item.create_time }}</div>
        </div>
      </div>
    </div>

    <!-- 商品描述 -->
    <div class="desc" v-html="detail.content"></div>

    <!-- 底部 -->
    <div class="footer">
      <div class="icon-home" @click="$router.push('/')">
        <van-icon name="wap-home-o" />
        <span>首页</span>
      </div>
      <div class="icon-cart" @click="$router.push('/cart')">
        <!-- badge表示角标 -->
        <van-icon name="shopping-cart-o" :badge="cartTotal > 0 ? cartTotal: null" />
        <span>购物车</span>
      </div>
      <div class="btn-add" @click="addFn">加入购物车</div>
      <div class="btn-buy" @click="buyNow">立刻购买</div>
    </div>

    <!-- 点击加入购物车 / 立即购买的公共弹窗 -->
    <van-action-sheet v-model="showPanel" :title="mode === 'cart' ? '加入购入车' : '立即购买'">
      <div class="product">
        <div class="product-title">
          <div class="left"><img :src="detail.goods_image" alt=""></div>
          <div class="right">
            <div class="price">
              <span>￥</span>
              <span class="nowPrice">{{ detail.goods_price_min }}</span>
            </div>
            <div class="count">
              <span>库存</span>
              <span>{{ detail.stock_total }}</span>
            </div>
          </div>
        </div>
        <div class="num-box">
          <span>数量</span>
          <CountBox v-model="addCount" />
          <!-- 使用v-model是因为其本质上是 :value与 @input的结合 -->
        </div>

        <!-- 有库存才显示提交按钮 -->
        <div class="showBtn" v-if="detail.stock_total > 0">
          <div class="btn" v-if="mode === 'cart'" @click="addToCart">加入购物车</div>
          <div class="btn now" v-else-if="mode === 'buyNow'" @click="goBuyNow">立刻购买</div>
        </div>
        <div class="btn-none" v-if="detail.stock_total < 1">该商品已抢完</div>
      </div>
    </van-action-sheet>

  </div>
</template>
<script>
import { getProductDetail, getProductComments } from '@/api/product'
import defaultImg from '@/assets/default-avatar.png'
import CountBox from '@/components/CountBox.vue'
import { addCart, getCartTotal } from '@/api/cart'

export default {
  name: 'productDetailPage',
  data () {
    return {
      detail: [],
      images: [],
      current: 0,
      num_of_comments: 0,
      defaultImg,
      commentList: [],
      mode: 'cart', // 标记弹窗状态
      showPanel: false, // 标记弹窗状态
      addCount: 1, // 购物数字框绑定的数据
      cartTotal: 0 // 购物车商品总数，用于渲染角标
    }
  },
  components: {
    CountBox
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
    },
    async getComment () {
      const { data: { list, total } } = await getProductComments(this.goodsId, 3)
      this.num_of_comments = total
      this.commentList = list
    },
    addFn () {
      this.mode = 'cart'
      this.showPanel = true
    },
    buyNow () {
      this.mode = 'buyNow'
      this.showPanel = true
    },
    async addToCart () {
      if (!this.$store.getters.token) {
        this.$dialog.confirm({
          title: '温馨提示',
          message: '使用该功能前，请先登录！',
          confirmButtonText: '前往登录',
          cancelButtonText: '再随便逛逛'
        }).then(() => {
          // this.$route.fullPath（会包含查询参数）
          this.$router.push({
            path: '/login',
            query: {
              backUrl: this.$route.fullPath
            }
          })
        }).catch(() => {})
        return
      }
      const { data: { cartTotal } } = await addCart(this.goodsId, this.addCount, this.detail.skuList[0].goods_sku_id)
      this.cartTotal = cartTotal
      this.showPanel = false
      this.$toast('加入购物车成功！')
    },
    goBuyNow () {

    }
  },
  async created () {
    this.getDetail()
    this.getComment()
    const { data: { cartTotal } } = await getCartTotal()
    this.cartTotal = cartTotal
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

  .custom-indicator {
    position: absolute;
    right: 10px;
    bottom: 10px;
    padding: 5px 10px;
    font-size: 12px;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 15px;
  }

  .info {
    padding: 10px;

    .title {
      display: flex;
      justify-content: space-between;

      .price {
        .new {
          color: #fa2209;
          font-size: 20px;
        }

        .old {
          color: #959595;
          font-size: 16px;
          text-decoration: line-through;
          margin-left: 5px;
        }
      }

      .sellcount {
        color: #959595;
        font-size: 16px;
        position: relative;
        top: 4px;
      }
    }

    .msg {
      font-size: 16px;
      line-height: 24px;
      margin-top: 5px;
    }
  }

  .service {
    display: flex;
    justify-content: space-between;
    line-height: 40px;
    margin-top: 10px;
    font-size: 16px;
    background-color: #fafafa;

    .left-words {
      span {
        margin-right: 10px;
      }

      .van-icon {
        margin-right: 4px;
        color: #fa2209;
      }
    }
  }

  .comment {
    padding: 10px;

    .comment-title {
      display: flex;
      justify-content: space-between;

      .right {
        color: #959595;
      }
    }

    .comment-list {
      .comment-item {
        font-size: 16px;
        line-height: 20px;

        .top {
          height: 25px;
          display: flex;
          align-items: center;
          margin-top: 15px;

          img {
            width: 20px;
            height: 20px;
          }

          .name {
            margin: 0 5px;
          }
        }

        .time {
          font-size: 14px;
          color: #999;
        }
      }
    }
  }

  .desc {
    width: 100%;
    overflow: scroll;
    margin-bottom: 55px;

    ::v-deep img {
      display: block;
      width: 100% !important;
    }
  }

  .footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 55px;
    background-color: #fff;
    border-top: 1px solid #ccc;
    display: flex;
    justify-content: space-evenly;
    align-items: center;

    .icon-home,
    .icon-cart {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 14px;

      .van-icon {
        font-size: 24px;
      }
    }

    .btn-add,
    .btn-buy {
      height: 36px;
      line-height: 36px;
      width: 120px;
      border-radius: 18px;
      background-color: #ffa900;
      text-align: center;
      color: #fff;
      font-size: 14px;
    }

    .btn-buy {
      background-color: #fe5630;
    }

  }

  .product {
    .product-title {
      display: flex;

      .left {
        width: 90px;
        height: 90px;
      }

      .right {
        flex: 1;
        padding: 10px;

        .price {
          font-size: 14px;
          color: #fe560a;

          .nowPrice {
            font-size: 24px;
            margin: 0 5px;
          }
        }

        .count {
          font-size: 14px;
          color: #999;
        }
      }
    }

    .num-box {
      display: flex;
      justify-content: space-between;
      padding: 10px;
      align-items: center;
    }

    .btn,
    .btn-none {
      height: 40px;
      line-height: 40px;
      margin: 20px;
      border-radius: 20px;
      text-align: center;
      color: rgb(255, 255, 255);
      background-color: orange;
    }

    .btn.now {
      background-color: #fe5630;
    }

    .btn-none {
      background-color: #ccc;
    }
  }
}</style>
