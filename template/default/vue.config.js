const path = require('path');
const AssetsReplacePlugin = require('./plugins/assets-replace-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const pageJson = require('./src/pages.json');

function resolve(dir) {
  return path.resolve(__dirname, dir);
}
function getDistPath() {
  return process.env.NODE_ENV === 'production' ? 'dist/build' : 'dist/dev';
}
function buildSubPackageCopyPlugin(subPackages) {
  const patterns = subPackages.reduce((pre, curVal) => {
    const { root } = curVal;
    return pre.concat({
      from: resolve(`src/${root}/wxcomponents`),
      to: resolve(getDistPath() + `/mp-weixin/${root}/wxcomponents`),
      toType: 'dir'
    });
  }, []);
  return new CopyWebpackPlugin(patterns);
}

function pluginsCreator() {
  const plugins = [];

  // app_id 替换
  plugins.push(
    new AssetsReplacePlugin({
      assetsName: 'project.config.json',
      target: /\[APP_ID\]/g,
      value: process.env.VUE_APP_MP_APP_ID
    })
  );

  // 分包组件 copy
  const { subPackages = [] } = pageJson;
  if (subPackages.length) {
    plugins.push(buildSubPackageCopyPlugin(subPackages));
  }

  return plugins;
}

const VUE_CONFIG = {
  chainWebpack: (config) => {
    process.env.ANALYZER && config.plugin('webpack-bundle-analyzer').use(BundleAnalyzerPlugin);
  },
  configureWebpack: () => {
    return {
      plugins: pluginsCreator(),
      resolve: {
        alias: {
          '@components': resolve('src/components')
        }
      }
    };
  }
};

module.exports = VUE_CONFIG;
