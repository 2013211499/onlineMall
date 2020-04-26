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
      probeType: this.probeType,
      click: true
    })
    // 2. 监听滚动的位置
    if (this.probeType === 2 || this.probeType ===3) {
      this.scroll.on('scroll', position => {
        // console.log('position: ', position)
        this.$emit('scroll', position)
      })
    }
    // 3. 监听上拉事件
    if (this.pullUpLoad) {
      this.scroll.on('pullingUp', () => {
        // console.log('上拉加载更多')
        this.$emit('pullingUp')
        this.scroll.finishPullUp()
      })
    }
  },
  methods: {
    scrollTo (x, y, time=300) {
      // console.log('x:',x, 'y:',y, 'scroll:', this.scroll)
      this.refresh()
      this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x, y, time)
    },
    finishPullUp () {
      this.scroll && this.scroll.finishPullUp()
    },
    refresh () {
      this.scroll && this.scroll.refresh()
    },
    getScrollY () {
      return this.scroll ? this.scroll.y : 0
    }
  }
}
</script>

<style scoped>
</style>