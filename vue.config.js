var path = require("path")
const {
  defineConfig
} = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath:"/",
  transpileDependencies: true,
  devServer: {
    port: 8080
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    }
  },
})