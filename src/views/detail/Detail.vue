<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="itemClick" :current-index="currentIndex"/>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll"> 
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imgLoad="imgLoad"/>
      <detail-param-info ref="params" :param-info="paramInfo"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <goods-list ref="recommend" :goods="recommends"/>
    </scroll>
    <back-top @click.native="backTopClick" v-show="isShowBackTop"/>
    <detail-bottom-bar @addToCart="addToCart"/>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'

import Scroll from '@/components/common/scroll/Scroll'
import GoodsList from '@/components/content/goods/GoodsList'

import {getDetail, getRecommend, Goods, Shop, GoodsParam} from '@/network/detail'
import {debounce} from '@/common/utils'
import {itemListenerMixin, backTopMixin} from '@/common/mixins'
import {mapActions} from 'vuex'

export default {
  name: 'Detail',
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    Scroll,
    GoodsList,
    DetailBottomBar
  },
  data () {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      getThemeTopY: null,
      themesTopYs: [],
      currentIndex: 0
    }
  },
  mixins: [itemListenerMixin, backTopMixin],
  created () {
    // 保存iid
    this.iid = this.$route.params.iid
    // 请求详情数据
    getDetail(this.iid).then(res => {
      const data = res.result
      // console.log('data: ', data)
      // 1. 保存轮播图片
      this.topImages = data.itemInfo.topImages
      // 2. 获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      // 3. 获取店铺信息
      this.shop = new Shop(data.shopInfo)
      // 4. 保存详情数据
      this.detailInfo = data.detailInfo
      // 5. 获取参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
      // 6. 获取评论信息
      if (data.rate.list) {
        this.commentInfo = data.rate.list[0]
      }
      // this.$nextTick(() => {
      //   // 根据最新的数据，对应的DOM已经渲染出来了，但是图片依然是没有加载完成的
      //   // 即目前的offsetTop是不包含图片的
      //   this.themesTopYs.push(0)
      //   this.themesTopYs.push(this.$refs.params.$el.offsetTop)
      //   this.themesTopYs.push(this.$refs.comment.$el.offsetTop)
      //   this.themesTopYs.push(this.$refs.recommend.$el.offsetTop)
      //   console.log(this.themesTopYs)
      // })
      
      // 给getThemeTopY赋值
      this.getThemeTopY = debounce(() => {
        this.themesTopYs = []
        this.themesTopYs.push(0)
        this.themesTopYs.push(this.$refs.params.$el.offsetTop - 44)
        this.themesTopYs.push(this.$refs.comment.$el.offsetTop - 44)
        this.themesTopYs.push(this.$refs.recommend.$el.offsetTop - 44)
        this.themesTopYs.push(Number.MAX_VALUE)
        // console.log(this.themesTopYs)
      })
    })
    // 请求推荐数据
    getRecommend().then(res => {
      this.recommends = res.data.list
    })
  },
  mounted () {
    // let newRefresh = debounce(this.$refs.scroll.refresh, 1000)
    // this.$bus.$on('itemImageLoad', () => {
    //   newRefresh()
    // })
  },
  destroyed () {
    // console.log('被销毁了: ' + this.iid)
    this.$bus.$off('itemImageLoad', this.imageLoadListener)
  },
  methods: {
    ...mapActions(['addCart']),
    imgLoad () {
      this.$refs.scroll.refresh()
      this.getThemeTopY()
    },
    itemClick (index) {
      this.currentIndex = index
      this.$refs.scroll.scrollTo(0, -this.themesTopYs[index], 300)
    },
    contentScroll (position) {
      const posY = - position.y
      this.listenScrollTheme(-position.y)
      // 判断是否回到顶部（方法已通过mixin混入）
      this.listenBackTop(position)
    },
    listenScrollTheme (position) {
      let length = this.themesTopYs.length;
      for (let i = 0; i < length; i++) {
        let iPos = this.themesTopYs[i];
        if (position >= iPos && position < this.themesTopYs[i+1]) {
          if (this.currentIndex !== i) {
            this.currentIndex = i;
          }
          break  // break防止过多无用的后续循环计算 精髓之处
        }
      }
    },
    addToCart () {
      // 1. 获取商品信息
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid
      // 2. 将商品添加到购物车
      // this.$store.dispatch('addCart', product).then(res => {
      //   console.log(res)
      // })
      this.addCart(product).then(res => {
        console.log('res: ', res)
        this.$toast.show(res, 1000)
      })
    }
  }
}
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 1000;
    background-color: #fff;
    height: 100vh;
  }
  .content {
    height: calc(100% - 44px);
  }
  .detail-nav {
    position: relative;
    z-index: 1000;
    background-color: #fff;
  }
</style>