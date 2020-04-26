import axios from 'axios'

export function request (config) {
  // 1. 创建axios实例
  const instance = axios.create({
    baseURL: 'http://106.54.54.237:8000/api/h8',
    timeout: 5000
  })

  // 2. 拦截器
  instance.interceptors.request.use(config => {
    return config
  }, err => {
    console.log('intercepts request err: ', err)
  })
  instance.interceptors.response.use(result => {
    return result.data
  }, err => {
    console.log('intercepts response error: ', err)
  })

   return instance(config)
}