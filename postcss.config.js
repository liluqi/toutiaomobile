// 此文件专门配置px转化rem
module.exports = {
  plugins: {
    // 给css样式加浏览器前缀
    autoprefixer: {},
    'postcss-pxtorem': {
      rootValue: 37.5, // 基准值
      propList: ['*']// 包括哪些文件
    }

  }
}
