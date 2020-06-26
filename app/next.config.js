module.exports = {
  env: {
    ROOT: __dirname
  },
  webpackDevMiddleware: config => {
    config.watchOptions.poll = 500
    return config
  }
}
