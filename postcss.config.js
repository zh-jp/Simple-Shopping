// postcss.config.js
module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      // 对应vw适配的标准屏宽度，iPhoneX
      viewportWidth: 375
    }
  }
}
