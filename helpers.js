//
var fs = require('fs');
var path = require('path');

// plugins
var HtmlWebpackPlugin = require('html-webpack-plugin');

// variable
var results = [];
var htmlPlugins=[];

// Helper functions
function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
}
function walk(dir, done) {
  fs.readdir(dir, function (err, list) {
    if (err) return done(err);
    var pending = list.length;
    if (!pending) return done(null, results);
    list.forEach(function (file) {
      file = path.resolve(dir, file);
      fs.statSync(file, function (err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function (err, res) {
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

walk(root('src/pages'), function (err, htmls) {
  for (var key in htmls) {
    htmlPlugins.push(new HtmlWebpackPlugin({
      filename: htmls[key].substr(htmls[key].indexOf('src') + 4),
      template: htmls[key],
      inject: true
    }))
  }
});

exports.root=root;
exports.htmlPlugins=htmlPlugins;
