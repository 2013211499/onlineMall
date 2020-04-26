import Toast from './Toast'

const obj = {}

obj.install = function (vue) {
  // document.body.appendChild(Toast.$el)
  // 1. 创建组件构造器
  const toastConstructor = vue.extend(Toast)
  // 2. new的方式，根据组件构造器，创建一个组件对象
  const toast = new toastConstructor()
  // 3. 将组件对象手动挂载到某一个元素上
  toast.$mount(document.createElement('div'))
  // 4. toast.$el 对应的就是div
  document.body.appendChild(toast.$el)
  //vue.prototype.$toast = Toast
  vue.prototype.$toast = toast
}

export default obj