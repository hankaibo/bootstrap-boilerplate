/**
 * @author:hankaibo
 */

var path = require('path');
var webpack = require('webpack');
var helpers = require('./helpers');

/*
 * Webpack Plugins
 */
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

/*
 * Webpack Constants
 */
var ENV = process.env.npm_lifecycle_event;
var isProd = ENV === 'build';

module.exports = function makeWebpackConfig() {
  var entries = helpers.getEntry('src/scripts/page/**/*.js', 'src/scripts/page/');
  var chunks = Object.keys(entries);
  var config = {};

  if (isProd) {
    config.devtool = 'source-map';
  } else {
    config.devtool = 'eval-source-map';
  }
  config.entry = entries;
  config.output = {
    path: helpers.root('dist'),
    publicPath: isProd ? '../' : 'http://localhost:8080/',
    filename: isProd ? 'scripts/[name].[hash].js' : 'scripts/[name].js',
    chunkFilename: isProd ? 'scripts/[id].[hash].chunk.js' : 'scripts/[id].chunk.js'
  };
  config.resolve = {
    extensions: ['.js', '.json', '.css', '.scss', '.html'],
  };
  config.module = {
    rules: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['css-loader', 'postcss-loader'] })
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['css-loader', 'postcss-loader', 'less-loader'] })
      },
      {
        test: /\.(scss|sass)$/,
        loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['css-loader', 'postcss-loader', 'sass-loader'] })
      },
      {
        test: /\.html$/,
        loader: 'raw-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader?name=fonts/[name].[hash].[ext]?'
      }
    ]
  };
  config.plugins = [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors', // 将公共模块提取，生成名为`vendors`的chunk
      chunks: chunks,
      minChunks: chunks.length
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      chunksSortMode: 'dependency'
    }),
    new ExtractTextPlugin({
      filename: 'styles/[name].[hash].css',
      disable: !isProd
    }), //单独使用link标签加载css并设置路径，相对于output配置中的publickPath
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [
          autoprefixer({
            browsers: ['last 2 version']
          })
        ]
      }
    })
  ];
  if (isProd) {
    config.plugins.push(
      new webpack.NoErrorsPlugin(),
      new webpack.optimize.UglifyJsPlugin({ sourceMap: true, mangle: { keep_fnames: true } })
    );
  }

  config.devServer = {
    contentBase: './src',
    historyApiFallback: true,
    quiet: false,
    stats: 'minimal'
  };

  var pages = Object.keys(helpers.getEntry('src/views/**/*.html', 'src/views/'));
  pages.forEach(function (pathname) {
    var conf = {
      filename: './views/' + pathname + '.html', //生成的html存放路径，相对于path
      template: 'src/views/' + pathname + '.html', //html模板路径
      inject: false, //js插入的位置，true/'head'/'body'/false
    };
    if (pathname in config.entry) {
      conf.favicon = 'src/img/bootstrap_64px.ico';
      conf.inject = 'body';
      conf.chunks = ['vendors', pathname];
      conf.hash = true;
    }
    config.plugins.push(new HtmlWebpackPlugin(conf));
  });

  return config;
}();
