<template>
  <div class="recommend">
    <div v-for="(item, index) in recommends" :key="index" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt=""/>
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecommentView',
  props: {
    recommends: {
      type: Array,
      dafault () {
        return []
      }
    }
  }
}
</script>

<style scoped>
  .recommend {
    padding: 10px 0;
    border-bottom: 5px solid #eee;
    font-size: 12px;
    display: flex;
    text-align: center;
  }
  .recommend-item {
    flex: 1
  }
  .recommend-item img {
    width: 90%;
  }
  .recommend-item div {
    margin-top: 8px;
  }
</style>