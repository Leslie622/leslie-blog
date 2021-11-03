module.exports = {
  publicPath:  process.env.NODE_ENV === 'production'?'/leslie-blog/':'/',
  configureWebpack: {
    resolve: {
      alias: {
        "assets": "@/assets",
        "components": "@/components",
        "router": "@/router",
        "store": "@/store",
        "views": "@/views",
        "util": "@/util",
        "api": "@/api"
      }
    }
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "~assets/css/global-variable/index.scss";`
      }
    }
  },
}

