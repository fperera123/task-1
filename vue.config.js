const path = require("path");

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/apps/railways/web/'
    : '/',
  outputDir: './dist/web',
  css: {
    loaderOptions: {
      sass: {
        sassOptions: {
          includePaths: ["./node_modules", "./src/assets"],
        },
        additionalData: `
        @import "./src/assets//scss/variables/_variables.scss";
      `
      },
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        "@themeConfig": path.resolve(__dirname, "themeConfig.js"),
        "@core": path.resolve(__dirname, "src/@core"),
        "@leecom": path.resolve(__dirname, "src/@leecom"),
        "@validations": path.resolve(__dirname, "src/@core/utils/validations/validations.js"),
        "@axios": path.resolve(__dirname, "src/libs/axios"),
      },
    },
  },
  chainWebpack: config => {
    config.module
      .rule("vue")
      .use("vue-loader")
      .loader("vue-loader")
      .tap(options => {
        // eslint-disable-next-line no-param-reassign
        options.transformAssetUrls = {
          img: "src",
          image: "xlink:href",
          "b-avatar": "src",
          "b-img": "src",
          "b-img-lazy": ["src", "blank-src"],
          "b-card": "img-src",
          "b-card-img": "src",
          "b-card-img-lazy": ["src", "blank-src"],
          "b-carousel-slide": "img-src",
          "b-embed": "src",
        };
        return options;
      });
    config.module.rules.delete('eslint');

    config.plugin('define')
      .tap(args => {
        let v = JSON.stringify(require('./version.json').version)
        args[0]['process.env']['VERSION'] = v
        return args
      })
  },
  transpileDependencies: ["vue-echarts", "resize-detector"],
};