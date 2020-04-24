<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <scroll class="content" 
        ref="scroll"
        :probe-type="3"
        @scroll="contentScroll"
        :pullUpLoad="true"
        @pullingUp="loadMoreData">
      <home-swiper :banners="banners"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view/>
      <tab-control class="tab-control" 
          :titles="['流行', '新款', '精选']"
          @tabClick="tabClick"/>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backTopClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'

import NavBar from '@/components/common/navbar/NavBar'
import TabControl from '@/components/content/tabControl/TabControl'
import GoodsList from '@/components/content/goods/GoodsList'
import Scroll from '@/components/common/scroll/Scroll'
import BackTop from '@/components/content/backTop/BackTop'

import {getHomeMultidata, getHomeGoods} from '@/network/home'

export default {
  name: 'Home',
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data () {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      currentType: 'pop',
      isShowBackTop: false
    }
  },
  created () {
    // 1. 请求多个数据
    this.getHomeMultidata()
    // 2. 请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  methods: {
    /**
     * 网络请求相关方法
     */
    getHomeMultidata () {
      getHomeMultidata().then(res => {
        console.log('getHomeMultidata res: ', res)
        this.banners = res.data.banner.list || []
        console.log('banners:', this.banners)
        this.recommends = res.data.recommend.list || []
      })
    },
    getHomeGoods (type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        console.log(`getHomeGoods[${type}]: `, res)
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1
        this.$refs.scroll.finishPullUp()
      })
    },
    /**
     * 事件监听相关方法
     */
    tabClick (index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
    },
    backTopClick () {
      // this.$refs.scroll.scroll.scrollTo(0, 0, 1000)
      this.$refs.scroll.scrollTo(0, 0)
      // console.log('click: ', this.$refs.scroll.scroll.scrollTo)
    },
    contentScroll (position) {
      this.isShowBackTop = -position.y > 1000
    },
    loadMoreData () {
      this.getHomeGoods(this.currentType)
    }
  },
  computed: {
    showGoods () {
      return this.goods[this.currentType].list
    }
  }
}
</script>

<style scoped>
  #home {
    position: relative;
    height: 100vh;
  }
  .home-nav {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 999;
    background-color: var(--color-tint);
    color: white;
  }
  .tab-control {
    position: sticky;
    top: 44px;
  }
  .content {
    position: absolute;
    top: 44px;
    bottom: 49px;
  }
</style>