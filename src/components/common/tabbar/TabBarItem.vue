<template>
  <div class="tab-bar-item" @click="itemClick">
    <!--因为slot插槽会被整个替换 所以属性放在外层div上-->
    <div v-if="!isActive" >
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon_active"></slot>
    </div>
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabBarItem',
  props: {
    path: String,
    activeColor: {
      type: String,
      default: 'red'
    }
  },
  data () {
    return {
    }
  },
  computed: {
    isActive () {
      return this.$route.path.indexOf(this.path) !== -1
    },
    activeStyle () {
      return this.isActive ? {color: this.activeColor} : {}
    }
  },
  methods: {
    itemClick () {
      this.$router.replace(this.path).catch(e => e)
    }
  }
}
</script>

<style>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}
.tab-bar-item img {
  margin-top: 3px;
  margin-bottom: 2px;
  vertical-align: middle;
  width: 24px;
  height: 24px;
}
</style>