var path = require('path');
var webpack = require('webpack');
var node_modules_dir = path.resolve(__dirname, 'node_modules');
var fs = require('fs');

var HtmlWebpackPlugin=require('html-webpack-plugin');

module.exports = {
  entry: {
    app: path.resolve(__dirname, './src/js/entry.js'),
    blank: path.resolve(__dirname, './src/js/blank.js'),
    vendors: ['jquery', 'bootstrap']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].js'
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.less$/, loader: 'style!css!less' },
      { test: /\.scss$/, loader: 'style!css!sass' },
      { test: /\.(png|jpe?g)$/, loader: 'url?limit=25000' },
      { test: /\.woff$/, loader: 'url?limit=100000' }
    ]
  },
  plugins: [
    new webpack.BannerPlugin('hello world'),
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
    }),
    new HtmlWebpackPlugin({
      filename: 'pages/blank.html',
      template: path.resolve(__dirname, './src/pages/blank.html'),
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: 'pages/butons.html',
      template: path.resolve(__dirname, './src/pages/buttons.html'),
      inject: true
    })
  ]
}


var walk = function(dir, done) {
  var results = [];
  fs.readdir(dir, function(err, list) {
    if (err) return done(err);
    var pending = list.length;
    if (!pending) return done(null, results);
    list.forEach(function(file) {
      file = path.resolve(dir, file);
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function(err, res) {
            results = results.concat(res);
            if (!--pending) done(null, results);
          });
        } else {
          results.push(file);
          if (!--pending) done(null, results);
        }
      });
    });
  });
};
var htmls=walk('./src/pages', function(err, results) {
  if (err) throw err;
  console.log(results);
  console.log(path.resolve(__dirname, './src/pages/buttons.html'));
  console.log(__dirname);
});
console.log(htmls+'----------');

var entries = {};
var HtmlPlugin = [];
for (var key in htmls) {
    entries[key] = htmls[key].replace('.html', '.js')
    HtmlPlugin.push(new HtmlWebpackPlugin({
      filename: (key == 'index\\index' ? 'index.html' : key + '.html'),
      template: htmls[key],
      inject: true,
        chunks: [key]
    }))
}
