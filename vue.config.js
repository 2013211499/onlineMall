// vue.config.js 是一个可选的配置文件
// 如果项目的 (和 package.json 同级的) 根目录中存在这个文件，那么它会被 @vue/cli-service 自动加载

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'components': '@/components',
        'common': 'components/common',
        'content': 'components/content',
        'network': '@/network',
        'views': '@/views'
      }
    }
  }
}


