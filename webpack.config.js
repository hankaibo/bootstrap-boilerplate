// Helper: root() is defined at the bottom
var path = require('path');
var webpack = require('webpack');

// Webpack Plugins
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
var autoprefixer = require('autoprefixer');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlwebpackPlugin = require('html-webpack-plugin');

/**
 * Env
 * Get npm lifecycle event to identify the environment
 */
var ENV = process.env.npm_lifecycle_event;
var isProd = ENV === 'build';

module.exports = function makeWebpackConfig() {

  var config = {};

  if (isProd) {
    config.devtool = 'source-map';
  } else {
    config.devtool = 'eval-source-map';
  }

  config.debug = !isProd;
  config.entry = {
    'blank': './src/js/sb-admin-2.js',
    'buttons': './src/js/sb-admin-2.js',
    'echarts': './src/js/sb-admin-2.js',
    'ent-info': './src/js/sb-admin-2.js',
    'forms': './src/js/sb-admin-2.js',
    'grid': './src/js/sb-admin-2.js',
    'icons': './src/js/sb-admin-2.js',
    'index': './src/js/sb-admin-2.js',
    'login': './src/js/sb-admin-2.js',
    'notifications': './src/js/sb-admin-2.js',
    'panels-wells': './src/js/sb-admin-2.js',
    'tables': './src/js/sb-admin-2.js',
    'typography': './src/js/sb-admin-2.js',
    'vendors': './src/js/vendor.js'
  };
  config.output = {
    path: root('dist'),
    filename: isProd ? 'js/[name].[hash].js' : 'js/[name].js'
  };
  config.resolve = {
    cache: true,
    root: root(),
    extensions: ['', '.js', '.json', '.css', '.scss'],
    alias: {
      'app': 'src/pages',
    }
  };
  config.module = {
    preLoaders: [],
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        include: root('src', 'js'),
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.scss$/,
        include: root('src', 'css'),
        loader: ['style', 'css?sourceMap', 'sass?sourceMap']
      }
    ],
    postLoaders: []
  };
  config.plugins = [
    new HtmlwebpackPlugin({
      template: root('src/pages', 'blank.html'),
      filename: 'blank.html',
      chunks: ['blank'],
      inject: 'body'
    }),
    new HtmlwebpackPlugin({
      template: root('src/pages', 'buttons.html'),
      filename: 'buttons.html',
      chunks: ['buttons'],
      inject: 'body'
    }),
    new HtmlwebpackPlugin({
      template: root('src/pages', 'echarts.html'),
      filename: 'echarts.html',
      chunks: ['echarts'],
      inject: 'body'
    }),
    new HtmlwebpackPlugin({
      template: root('src/pages', 'ent-info.html'),
      filename: 'ent-info.html',
      chunks: ['ent-info'],
      inject: 'body'
    }),
    new HtmlwebpackPlugin({
      template: root('src/pages', 'forms.html'),
      filename: 'forms.html',
      chunks: ['forms'],
      inject: 'body'
    }),
    new HtmlwebpackPlugin({
      template: root('src/pages', 'grid.html'),
      filename: 'grid.html',
      chunks: ['grid'],
      inject: 'body'
    }),
    new HtmlwebpackPlugin({
      template: root('src/pages', 'icons.html'),
      filename: 'icons.html',
      chunks: ['icons'],
      inject: 'body'
    }),
    new HtmlwebpackPlugin({
      template: root('src/pages', 'index.html'),
      filename: 'index.html',
      chunks: ['index'],
      inject: 'body'
    }),
    new HtmlwebpackPlugin({
      template: root('src/pages', 'login.html'),
      filename: 'login.html',
      chunks: ['login'],
      inject: 'body'
    }),
    new HtmlwebpackPlugin({
      template: root('src/pages', 'notifications.html'),
      filename: 'notifications.html',
      chunks: ['notifications'],
      inject: 'body'
    }),
    new HtmlwebpackPlugin({
      template: root('src/pages', 'panels-wells.html'),
      filename: 'panels-wells.html',
      chunks: ['panels-wells'],
      inject: 'body'
    }),
    new HtmlwebpackPlugin({
      template: root('src/pages', 'tables.html'),
      filename: 'tables.html',
      chunks: ['tables'],
      inject: 'body'
    }),
    new HtmlwebpackPlugin({
      template: root('src/pages', 'typography.html'),
      filename: 'typography.html',
      chunks: ['typography'],
      inject: 'body'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        ENV: JSON.stringify(ENV)
      }
    }),
    new CommonsChunkPlugin({
      name: ['vendors']
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    })
  ];

  if (isProd) {
    config.plugins.push(
      new webpack.NoErrorsPlugin(),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({ minimize: true })
      // new CopyWebpackPlugin([{
      //   from: root('src')
      // }])
    );
  }

  config.postcss = [
    autoprefixer({
      browsers: ['last 2 version']
    })
  ];
  if (!isProd) {
    config.devServer = {
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true
    };
  }

  return config;
} ();

// Helper functions
function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
}
