import {debounce} from '@/common/utils'
import BackTop from '@/components/content/backTop/BackTop'
import {BACKTOP_DISTANCE} from '@/common/const'

export const itemListenerMixin = {
  data () {
    return {
      imageLoadListener: null
    }
  },
  mounted () {
    console.log('混入...')
    const refresh = debounce(this.$refs.scroll.refresh, 1000)
    this.imageLoadListener = () => {
      refresh()
    }
    this.$bus.$on('itemImageLoad',this.imageLoadListener)
  }
}

export const backTopMixin = {
  components: {
    BackTop
  },
  data () {
    return {
      isShowBackTop: false
    }
  },
  methods: {
    backTopClick () {
      this.$refs.scroll.scrollTo(0, 0)
    },
    listenBackTop (position) {
      this.isShowBackTop = -position.y > BACKTOP_DISTANCE
    }
  }
}