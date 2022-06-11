const path = require('path')

let url = 'http://172.169.90.78:8087'  //  服务




const minify = process.env.NODE_ENV === 'development' ? false : {
  collapseWhitespace: true,
  removeComments: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
  useShortDoctype: true,
  minifyCSS: true,
  minifyJS: true
}
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  devServer: {
    host: "localhost",
    disableHostCheck: true,
    port: 8080,
    open: true,
    proxy: {
      '/api': {
        target: url,
        ws: true,
        changeOrigin:true,
        pathRewrite: {
          '^/api': ''
        }
      },
    },
  },

  productionSourceMap: false,
  chainWebpack(config) {
    config.resolve.symlinks(true);
    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }
}
