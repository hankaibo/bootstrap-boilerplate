/**
 *@author:hankaibo
 */

var path = require('path');
var glob = require('glob');
var webpack = require('webpack');
var helpers = require('./helpers');

/*
 * Webpack Plugins
 */
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

/*
 * Webpack Constants
 */
var ENV = process.env.npm_lifecycle_event;
var isProd = ENV === 'build';

module.exports = function makeWebpackConfig() {
  var entries = getEntry('src/scripts/page/**/*.js', 'src/scripts/page/');
  var chunks = Object.keys(entries);
  var config = {};

  if (isProd) {
    config.devtool = 'source-map';
  } else {
    config.devtool = 'eval-source-map';
  }
  config.debug = !isProd;
  config.entry = entries;
  config.output = {
    path: helpers.root('dist'),
    publicPath: '/static/',
    filename: isProd ? 'scripts/[name].[hash].js' : 'scripts/[name].js',
    chunkFilename: 'scripts/[id].chunk.js?[chunkhash]'
  };
  config.module = {
    loaders: [
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css') },
      { test: /\.less$/, loader: ExtractTextPlugin.extract('css!less') },
      { test: /\.scss$/, loader: ExtractTextPlugin.extract('css!sass') },
      { test: /\.html$/, loader: "html?-minimize" },
      { test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader?name=./fonts/[name].[ext]' },
      { test: /\.(png|jpe?g|gif)$/, loader: 'url-loader?limit=8192&name=img/[name]-[hash].[ext]' }
    ]
  };
  config.plugins = [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors', // 将公共模块提取，生成名为`vendors`的chunk
      chunks: ['index', 'blank'], //提取哪些模块共有的部分
      minChunks: chunks.length
    }),
    new ExtractTextPlugin('styles/[name].css'), //单独使用link标签加载css并设置路径，相对于output配置中的publickPath
  ];
  if (isProd) {
    config.plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    );
  }
  config.devServer = {
    contentBase: './src',
    quiet: true,
    hot: true, //热启动
  }

  var pages = Object.keys(getEntry('src/views/**/*.html', 'src/views/'));
  console.log('222222222222222222' + pages);
  pages.forEach(function (pathname) {
    var conf = {
      filename: helpers.root('dist/') + pathname + '.html', //生成的html存放路径，相对于path
      template: 'src/views/' + pathname + '.html', //html模板路径
      inject: false,  //js插入的位置，true/'head'/'body'/false
    };
    if (pathname in config.entry) {
      conf.inject = 'body';
      conf.chunks = ['vendors', pathname];
      conf.hash = true;
    }
    config.plugins.push(new HtmlWebpackPlugin(conf));
  });


  return config;
} ();


function getEntry(globPath, pathDir) {
  var files = glob.sync(globPath);
  var entries = {}, entry, dirname, basename, pathname, extname;

  for (var i = 0; i < files.length; i++) {
    entry = files[i];
    dirname = path.dirname(entry);
    extname = path.extname(entry);
    basename = path.basename(entry, extname);
    pathname = path.join(dirname, basename);

    var re = /\\/gi;
    var unpathname = pathname.replace(re, '/');
    pathname = pathDir ? unpathname.replace(new RegExp('^' + pathDir), '') : unpathname;
    console.log('newpathname:' + pathname);
    entries[pathname] = ['./' + entry];
  }
  return entries;
}




