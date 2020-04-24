<template>
  <div class="wrapper" ref="scrollWrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'Scroll',
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      scroll: null
    }
  },
  mounted () {
    // 1. 创建BScroll对象
    this.scroll = new BScroll(this.$refs.scrollWrapper, {
      pullUpLoad: this.pullUpLoad,
      probeType: this.probeType
    })
    // 2. 监听滚动的位置
    this.scroll.on('scroll', position => {
      // console.log('position: ', position)
      this.$emit('scroll', position)
    })
    // 3. 监听上拉事件
    this.scroll.on('pullingUp', () => {
      // console.log('上拉加载更多')
      this.$emit('pullingUp')
      this.scroll.finishPullUp()
    })
  },
  methods: {
    scrollTo (x, y, time=300) {
      this.scroll.scrollTo(x, y, time)
    },
    finishPullUp () {
      this.scroll.finishPullUp()
    }
  }
}
</script>

<style scoped>
</style>