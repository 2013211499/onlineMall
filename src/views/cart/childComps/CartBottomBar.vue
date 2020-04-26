<template>
  <div class="bottom-bar">
    <div class="check-content">
      <CheckButton class="select-all" @checkBtnClick="checkBtnClick" :value="isSelectAll"/>
      <span>全选</span>
    </div>
    <div class="total-wrapper">
      <span class="total-price">合计: ¥{{totalPrice}}</span>
    </div>
    <div class="calculate-wrapper">
      去计算 ( {{checkLength}} )
    </div>
  </div>
</template>

<script>
import CheckButton from './CheckButton'
import {mapGetters} from 'vuex'
import {SELECT_ALL} from '@/store/mutations-types'
export default {
  name: 'CartBottomBar',
  components: {
    CheckButton
  },
  data () {
    return {
      selectAllState: true
    }
  },
  methods: {
    checkBtnClick () {
      this.selectAllState = false
      if (this.isSelectAll) {
        this.selectAllState = true
      }
      this.$store.commit(SELECT_ALL, !this.selectAllState)
    }
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice () {
      return this.cartList.filter(item => {
        return item.checked
      }).reduce((preValue, item) => {
        return preValue + item.price * item.count
      }, 0).toFixed(2)
    },
    checkLength () {
      return this.cartList.filter(item => {
        return item.checked
      }).length
    },
    isSelectAll () {
      if (this.cartList.length === 0) return false
      // return !(this.cartList.filter(item => !item.checked).length)
      return !(this.cartList.find(item => !item.checked)) //找到即停止 效率更高
    }
  }
}
</script>

<style scoped>
  .bottom-bar {
    height: 40px;
    display: flex;
    align-items: center;
    background-color: #eee;
    font-size: 14px;
  }
  .check-content {
    display: flex;
    margin-left: 10px;
    width: 60px;
  }
  .select-all {
    margin-right: 8px;
  }
  .total-wrapper {
    flex: 1;
    display: flex;
    justify-content: center;
  }
  .calculate-wrapper {
    display: flex;
    width: 100px;
    height: 100%;
    color: white;
    background-color: orange;
    align-items: center;
    justify-content: center;
  }
</style>