<template>
  <div id="my-swiper">
    <div class="swiper" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
      <slot></slot>
    </div>
    <slot name="indicator"></slot>
    <div class="indicator">
      <slot name="indicator" v-if="showIndicator && slideCount>1" >
        <div v-for="(item, index) in slideCount"
             class="indi-item"
             :class="{active: index===currentIndex-1}"
             :key="index">
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Swiper',
  props: {
    interval: {
      type: Number,
      default: 3000
    },
    animDuration: {
      type: Number,
      default: 0
    },
    moveRatio: {
      type: Number,
      default: 0.25
    },
    showIndicator: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      slideCount: 0,        //swiper的元素个数
      totalWidth: 0,        //swiper的宽度
      swiperStyle: {},     //swiper样式
      currentIndex: 1,      //当前的index
      scrolling: false      //记录是否在滚动
    }
  },
  mounted () {
    // 1. 操作DOM, 在前后添加Slide
    setTimeout(() => {
      this.handleDom()
      // 2. 开启定时器
      this.startTimer()
    }, 200)
  },
  methods: {
    startTimer () {
      this.playTimer = setInterval(() => {
        this.currentIndex++
        this.scrollContent(-this.currentIndex * this.totalWidth)
      }, this.interval)
    },
    stopTimer () {
      clearInterval(this.playTimer)
    },
    scrollContent (currentPosition) {
      // 1. 设置滚动状态  
      this.scrolling = true
      // 2. 开始滚动动画  
      this.swiperStyle.transition = 'transform' + this.animDuration + 'ms'
      this.setTransform(currentPosition)
      // 3. 判断滚动到的位置
      this.checkPosition()
      // 4. 滚动完成
      this.scrolling = false
    },
    /**
     * 校验滚动位置
     */
    checkPosition () {
      setTimeout(() => {
        // 1. 校验正确位置
        this.swiperStyle.transition = '0ms'
        if (this.currentIndex >= this.slideCount + 1) {
          this.currentIndex = 1
          this.setTransform(-this.currentIndex * this.totalWidth)
        } else if (this.currentIndex <= 0) {
          this.currentIndex = this.slideCount
          this.setTransform(-this.currentIndex & this.totalWidth)
        }
        // 2. 结束移动后的回调
        this.$emit('transitionEnd', this.currentIndex-1)
      }, this.animDuration)
    },
    /**
     * 操作DOM,在DOM前后添加Slide
     */
    handleDom () {
      // 1. 获取要操作的元素
      let swiperEl = document.querySelector('.swiper')
      let slidesEls = swiperEl.getElementsByClassName('slide')
      // 2. 保存个数
      this.slideCount = slidesEls.length
      // 3. 个数大于1，则在前后分别添加一个slide
      if (this.slideCount > 1) {
        let cloneFirst = slidesEls[0].cloneNode(true)
        let cloneLast = slidesEls[this.slideCount - 1].cloneNode(true)  // cloneNode(true)深拷贝,包括节点事件
        swiperEl.insertBefore(cloneLast, slidesEls[0])
        swiperEl.appendChild(cloneFirst)
        this.totalWidth = swiperEl.offsetWidth
        this.swiperStyle = swiperEl.style
      }
      // 4. 让swiper元素显示第一个slide(目前显示的添加的最后一个元素)
      this.setTransform(-this.totalWidth)
    },
    setTransform (position) {
      this.swiperStyle.transform = `translate3d(${position}px, 0, 0)`
      this.swiperStyle['-webkit-transform'] = `translate3d(${position}px, 0, 0)`
      this.swiperStyle['-ms-transform'] = `translate3d(${position}px, 0, 0)`
    },
    touchStart (e) {
      if (this.scrolling) return
      this.stopTimer()
      this.startX = e.touches[0].pageX
    },
    touchMove (e) {
      this.currentX = e.touches[0].pageX
      this.distance = this.currentX - this.startX
      let currentPosition = -this.currentIndex * this.totalWidth
      let moveDistance = this.distance + currentPosition

      // 设置当前位置
      this.setTransform(moveDistance)
    },
    touchEnd (e) {
      let currentMove = Math.abs(this.distance)

      if (this.distance === 0) {
        return
      } else if (this.distance > 0 && currentMove > this.totalWidth * this.moveRatio) {
        this.currentIndex--       // 坐标原点在左上角 
      } else if (this.distance < 0 && currentMove > this.totalWidth * this.moveRatio) {
        this.currentIndex++
      }

      this.scrollContent(-this.currentIndex * this.totalWidth)
      this.startTimer()
    }
  }
}
</script>

<style scoped>
  #my-swiper {
    overflow: hidden;
    position: relative;
  }
  .swiper {
    display: flex;
  }
  .indicator {
    position: absolute;
    bottom: 8px;
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .indi-item {
    box-sizing: border-box;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background-color: #fff;
    line-height: 8px;
    text-align: center;
    font-size: 12px;
    margin: 0 5px;
  }
  .indi-item.active{
    background-color: rgba(212, 62,46, 1.0)
  }
</style>