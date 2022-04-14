module.exports = {
  css: {
    // css预设器配置项
    loaderOptions: {
      scss: {
        prependData: `@import "~@/common/css/var.scss";@import "~@/common/css/mixin.scss";`
      }
    }
  }
};
