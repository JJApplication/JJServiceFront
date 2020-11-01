module.exports = {
  productionSourceMap: false,
  assetsDir: 'static',
  css: {
    extract: true
  },
  devServer: {
    port: 8080,
    proxy: {
      '/api': {
        // target: 'http://127.0.0.1:10086',
        changeOrigin: true,
        ws: false,
        pathRewrite: {
          '^/api': '/api'
        },
      },

    },
  },
  configureWebpack:{
    externals:{
      'vue': 'Vue',
      "vrouter": 'VueRouter',
      'axios': 'axios',
    }
  }
};