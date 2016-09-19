// Helper: root() is defined at the bottom
var path = require('path');
var webpack = require('webpack');

// Webpack Plugins
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var DashboardPlugin = require('webpack-dashboard/plugin');

/**
 * Env
 * Get npm lifecycle event to identify the environment
 */
var ENV = process.env.npm_lifecycle_event;
var isProd = ENV === 'build';

module.exports = function makeWebpackConfig() {
  /**
   * Config
   * Reference: http://webpack.github.io/docs/configuration.html
   * This is the object where all configuration gets set
   */
  var config = {};

  /**
   * Devtool
   * Reference: http://webpack.github.io/docs/configuration.html#devtool
   * Type of sourcemap to use per build type
   */
  if (isProd) {
    config.devtool = 'source-map';
  } else {
    config.devtool = 'eval-source-map';
  }

  // add debug messages
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
    'app': './src/js/sb-admin-2.js',
    'vendor': './src/js/vendor.js'
  };
  config.output = {
    path: root('dist'),
    publicPath: isProd ? '/' : 'http://localhost:8080/',
    filename: isProd ? 'js/[name].[hash].js' : 'js/[name].js',
    chunkFilename: isProd ? '[id].[hash].chunk.js' : '[id].chunk.js'
  };

  /**
   * Resolve
   * Reference: http://webpack.github.io/docs/configuration.html#resolve
   */
  config.resolve = {
    cache: true,
    root: root(),
    // only discover files that have those extensions
    extensions: ['', '.js', '.json', '.css', '.scss'],
    alias: {
      'app': 'src/pages',
    }
  };

  /**
   * Loaders
   * Reference: http://webpack.github.io/docs/configuration.html#module-loaders
   * List: http://webpack.github.io/docs/list-of-loaders.html
   * This handles most of the magic responsible for converting modules
   */
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
      // support for .scss files
      // all css in src/style will be bundled in an external css file
      {
        test: /\.scss$/,
        exclude: root('src', 'js'),
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap!postcss!sass')
      },
      // all css required in src/app files will be merged in js files
      {
        test: /\.scss$/,
        exclude: root('src', 'css'),
        loader: 'raw!postcss!sass'
      }
    ],
    postLoaders: []
  };
  /**
   * Plugins
   * Reference: http://webpack.github.io/docs/configuration.html#plugins
   * List: http://webpack.github.io/docs/list-of-plugins.html
   */
  config.plugins = [
    new HtmlwebpackPlugin({
      template: root('src/pages', 'blank.html'),
      filename: 'blank.html',
      chunks: ['app', 'vendors'],
      inject: 'body'
    }),
    new HtmlwebpackPlugin({
      template: root('src/pages', 'buttons.html'),
      filename: 'buttons.html',
      chunks: ['app', 'vendors'],
      inject: 'body'
    }),
    new HtmlwebpackPlugin({
      template: root('src/pages', 'echarts.html'),
      filename: 'echarts.html',
      chunks: ['app', 'vendors'],
      inject: 'body'
    }),
    new HtmlwebpackPlugin({
      template: root('src/pages', 'ent-info.html'),
      filename: 'ent-info.html',
      chunks: ['app', 'vendors'],
      inject: 'body'
    }),
    new HtmlwebpackPlugin({
      template: root('src/pages', 'forms.html'),
      filename: 'forms.html',
      chunks: ['app', 'vendors'],
      inject: 'body'
    }),
    new HtmlwebpackPlugin({
      template: root('src/pages', 'grid.html'),
      filename: 'grid.html',
      chunks: ['app', 'vendors'],
      inject: 'body'
    }),
    new HtmlwebpackPlugin({
      template: root('src/pages', 'icons.html'),
      filename: 'icons.html',
      chunks: ['app', 'vendors'],
      inject: 'body'
    }),
    new HtmlwebpackPlugin({
      template: root('src/pages', 'index.html'),
      filename: 'index.html',
      chunks: ['app', 'vendors'],
      inject: 'body'
    }),
    new HtmlwebpackPlugin({
      template: root('src/pages', 'login.html'),
      filename: 'login.html',
      chunks: ['app', 'vendors'],
      inject: 'body'
    }),
    new HtmlwebpackPlugin({
      template: root('src/pages', 'notifications.html'),
      filename: 'notifications.html',
      chunks: ['app', 'vendors'],
      inject: 'body'
    }),
    new HtmlwebpackPlugin({
      template: root('src/pages', 'panels.html'),
      filename: 'panels.html',
      chunks: ['app', 'vendors'],
      inject: 'body'
    }),
    new HtmlwebpackPlugin({
      template: root('src/pages', 'tables.html'),
      filename: 'tables.html',
      chunks: ['app', 'vendors'],
      inject: 'body'
    }),
    new HtmlwebpackPlugin({
      template: root('src/pages', 'typography.html'),
      filename: 'typography.html',
      chunks: ['app', 'vendors'],
      inject: 'body'
    }),
    // Define env variables to help with builds
    // Reference: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
    new webpack.DefinePlugin({
      // Environment helpers
      'process.env': {
        ENV: JSON.stringify(ENV)
      }
    }),
    new DashboardPlugin(),
    new CommonsChunkPlugin({
      name: ['vendor']
    }),
    // Extract css files
    // Reference: https://github.com/webpack/extract-text-webpack-plugin
    // Disabled when in test mode or not in build mode
    new ExtractTextPlugin('css/[name].[hash].css', { disable: !isProd }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    })
  ];

  // Add build specific plugins
  if (isProd) {
    config.plugins.push(
      // Reference: http://webpack.github.io/docs/list-of-plugins.html#noerrorsplugin
      // Only emit files when there are no errors
      new webpack.NoErrorsPlugin(),

      // Reference: http://webpack.github.io/docs/list-of-plugins.html#dedupeplugin
      // Dedupe modules in the output
      new webpack.optimize.DedupePlugin(),

      // Reference: http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
      // Minify all javascript, switch loaders to minimizing mode
      new webpack.optimize.UglifyJsPlugin({ mangle: { keep_fnames: true } }),

      // Copy assets from the public folder
      // Reference: https://github.com/kevlened/copy-webpack-plugin
      new CopyWebpackPlugin([{
        from: root('src')
      }])
    );
  }

  /**
   * PostCSS
   * Reference: https://github.com/postcss/autoprefixer-core
   * Add vendor prefixes to your css
   */
  config.postcss = [
    autoprefixer({
      browsers: ['last 2 version']
    })
  ];

  /**
   * Sass
   * Reference: https://github.com/jtangelder/sass-loader
   * Transforms .scss files to .css
   */
  config.sassLoader = {
    //includePaths: [path.resolve(__dirname, "node_modules/foundation-sites/scss")]
  };
  /**
   * Dev server configuration
   * Reference: http://webpack.github.io/docs/configuration.html#devserver
   * Reference: http://webpack.github.io/docs/webpack-dev-server.html
   */
  config.devServer = {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true
  };

  return config;
} ();

// Helper functions
function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
}
