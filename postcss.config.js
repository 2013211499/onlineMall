module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport": {
      viewportWidth: 375,           //视窗的宽度，对应的是设计稿的宽度 retina高清屏 1个点=2px，iPhone6高度750*1334
      biewportHeight: 667,          //视窗的高度，对应设计稿的高度（也可以不设置）
      unitPrecision: 5,             // 指定‘px’转换成视窗单位值的小数位数（很多时候无法整除）
      viewportUnit: 'vw',          //指定‘px’转成的视窗单位，建议用vw
      selectorBlackList: ['ignore', 'tab-bar', 'tab-bar-item'],  // 指定不需要转换的类
      minPixelValue: 1,             // 小于或等于1px不转换为视窗单位
      mediaQuery: true,            // 允许在媒体查询中转换’px‘
      exclude: [/^TabBar/]
    }
  }
}