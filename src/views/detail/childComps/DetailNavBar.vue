<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="@/assets/img/common/back.svg" alt=""/>
      </div>
      <div slot="center" class="title">
        <div v-for="(title, index) in titles" 
          :key="index"
          class="title-item"
          :class="{active: currentIndex===index}"
          @click="itemClick(index)">
          {{title}}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar'
export default {
  name: 'DetailNavBar',
  components: {
    NavBar
  },
  props: {
    currentIndex: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      titles: ['商品', '参数', '评论', '推荐']
    }
  },
  methods: {
    itemClick (index) {
      // this.currentIndex = index
      this.$emit('titleClick', index)
    },
    backClick () {
      this.$router.back()
    }
  }
}
</script>

<style scoped>
  .title {
    display: flex;
    font-size: 16px;
  }
  .title-item {
    flex: 1
  }
  .active {
    color: red;
  }
  .back {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>