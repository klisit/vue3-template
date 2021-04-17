module.exports = {
  // Add you postcss configuration here
  // Learn more about it at https://github.com/webpack-contrib/postcss-loader#config-files
  plugins: [
    ['autoprefixer'],
    {
      'postcss-pxtorem': {
        // rootValue: 37.5,
        rootValue({ file }) {
          return file.indexOf('vant') !== -1 ? 37.5 : 75
        },
        propList: ['*'],
        selectorBlackList: ['.norem'], // 过滤
      },
    },
  ],
}
