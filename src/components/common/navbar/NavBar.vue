<template>
  <div class="nav-bar">
    <div class="nav-bar-left">
      <slot name="left"></slot>
    </div>
    <div class="nav-bar-center">
      <slot name="center"></slot>
    </div>
    <div class="nav-bar-right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavBar'
}
</script>

<style lang="stylus" scoped>
  .nav-bar
    display: flex
    height: 44px
    line-height: 44px // 导航栏一般高度44px
    text-align: center
    box-shadow: 0 1px 1px rgba(100, 100, 100, 0.1)
  .nav-bar-left, .nav-bar-right
    width: 60px
    display: flex
    align-items: center
    justify-content : center
  .nav-bar-center
    flex: 1
</style>