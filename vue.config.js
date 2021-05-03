module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  chainWebpack: config => {
    config.module.rules.delete('eslint');
  },
  configureWebpack: {
    devtool: 'source-map'
  }
}
