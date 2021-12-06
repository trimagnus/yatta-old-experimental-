const path = require('path');
const common = require('./webpack.common');
const {merge} = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: 'main.[hash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  plugins: [new MiniCssExtractPlugin({
    filename: '[name].[hash].css',
  })],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      }
    ],
  },
});