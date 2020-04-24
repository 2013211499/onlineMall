<template>
  <div>
    <tab-bar class="footer">
      <tab-bar-item path="/home" activeColor="red">
        <img slot="item-icon" src="@/assets/img/home/home.svg" alt="">
        <img slot="item-icon_active" src="@/assets/img/home/home_active.svg" alt="">
        <div slot="item-text">首页</div>
      </tab-bar-item>
      <tab-bar-item path="/category" activeColor="red">
        <img slot="item-icon" src="@/assets/img/category/category.svg" alt="">
        <img slot="item-icon_active" src="@/assets/img/category/category_active.svg" alt="">
        <div slot="item-text">分类</div>
      </tab-bar-item>
      <tab-bar-item path="/cart" activeColor="red">
        <img slot="item-icon" src="@/assets/img/cart/cart.svg" alt="">
        <img slot="item-icon_active" src="@/assets/img/cart/cart_active.svg" alt="">
        <div slot="item-text">购物车</div>
      </tab-bar-item>
      <tab-bar-item path="/profile" activeColor="red">
        <img slot="item-icon" src="@/assets/img/profile/profile.svg" alt="">
        <img slot="item-icon_active" src="@/assets/img/profile/profile_active.svg" alt="">
        <div slot="item-text">我的</div>
      </tab-bar-item>
    </tab-bar>
  </div>
</template>

<script>
import TabBar from '@/components/common/tabbar/TabBar'
import TabBarItem from '@/components/common/tabbar/TabBarItem'
export default {
  name: 'MainTabBar',
  data () {
    return {
      
    }
  },
  components: {
    TabBar,
    TabBarItem
  }
}
</script>

<style scoped>
  .footer {
    z-index: 100;
  }
</style>