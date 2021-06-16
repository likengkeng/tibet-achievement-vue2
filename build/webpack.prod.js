const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.base.js');
// 压缩CSS插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const project = process.env.PROJECT || 'pc';
const isAnalysis = process.env.ANALYZE_BUNDLE === 'true';

var plugins = [
  new CleanWebpackPlugin({
    // cleanOnceBeforeBuildPatterns: [`dist/${project}/`]
  }), //删除打包的目录
  new MiniCssExtractPlugin({
    // Options similar to the same options in webpackOptions.output
    // both options are optional
    filename: `${project}/css/[name].[contenthash].css`,
    chunkFilename: `${project}/css/[name].[contenthash].css`,
  }),
];

if (isAnalysis) {
  plugins.push(new BundleAnalyzerPlugin()); //http://127.0.0.1:8888 分析bundle
}

const cssLoader = [
  'css-loader',
  'postcss-loader',
  'sass-loader',
];

module.exports = merge(common, {
  optimization: {
    // 分离chunks
    splitChunks: {
      chunks: 'all', // 所有的 chunks 代码公共的部分分离出来成为一个单独的文件
      cacheGroups: {
        vendor: {
          name: 'vendor',
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          chunks: 'initial', // 只打包初始时依赖的第三方
        },
      },
    },
    minimize: false, // 是否压缩
    minimizer: [
      new CssMinimizerPlugin(),
    ],
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        oneOf: [
          {
            test: /^App\.vue$/,
            resourceQuery: /\?vue/,
            use: [MiniCssExtractPlugin.loader, ...cssLoader],
          },
          {
            use: ['vue-style-loader', ...cssLoader],
          }
        ],
      },
    ],
  },
  plugins: plugins,
  mode: 'production',
  output: {
    filename: 'js/[name].[contenthash].js',
    path: path.resolve(__dirname, `../dist/${project}`),
    publicPath: './',
  },
})
