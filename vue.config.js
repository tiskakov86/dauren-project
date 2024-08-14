module.exports = {
  chainWebpack: config => {
    config.plugin('html')
      .tap(args => {
        args[0].meta = {
          charset: 'UTF-8',
          viewport: 'width=device-width, initial-scale=1.0'
        };
        return args;
      });
  }
};