<template>
  <div class="wrapper" ref="wrapper">
    <ul>
      <li><button>123</button></li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li><li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li><li>列表</li><li>列表</li><li>列表</li><li>列表</li><li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li><li>列表</li>

      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li><li>列表</li>

      <li>列表</li><li>列表</li>
      <li>列表</li>
      <li>列表</li>

    </ul>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'Category',
  data () {
    return {
      scroll: null
    }
  },
  created () {
    this.$nextTick(() => {
      console.log(document.querySelector('.wrapper'))
    })
  },
  mounted () {
    this.scroll = new BScroll(this.$refs.wrapper, {
      probeType: 2,
      pullUpLoad: true
    })
    this.scroll.on('scroll', position => {
      // console.log('position: ', position)
    })
    this.scroll.on('pullingUp', () => {
      console.log('上拉加载更多')
      this.scroll.finishPullUp() // 告知scroll上拉事件结束
    })
  }
}
</script>

<style scoped>
  .wrapper {
    height: 500px;
    background-color: red;
  }
</style>