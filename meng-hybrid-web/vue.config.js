const { defineConfig } = require('@vue/cli-service')
const path = require("path")

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
    } else {
      // 为开发环境修改配置...
      return {
        resolve: {
          alias: {
            '@js': path.resolve(__dirname, './src/assets/js'),
            '@css': path.resolve(__dirname, './src/assets/css'),
            '@imgs': path.resolve(__dirname, './src/assets/imgs'),
            '@c': path.resolve(__dirname, './src/components')
          }
        }
      }
    }
  }
})
