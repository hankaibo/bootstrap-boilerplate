/**
 * 引入css文件
 * 支持css,less,scss三种格式
 */
require('bootstrap/dist/css/bootstrap.min.css');
require('metismenu/dist/metisMenu.min.css');
require('font-awesome/css/font-awesome.min.css');
require('../../styles/common/sb-admin-2.scss');
require('../../styles/page/ddd.css')

/**
 * 引入js
 */
require('jquery');
require('bootstrap');
require('metisMenu');
require('../common/sb-admin-2.js');
// require('../common/d3-demo.js');
var d3 = require('d3');

(function () {
  //
  var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height"),
    scale = width * .45;

  var projection = d3.geoProjection(flippedStereographic)
    .scale(scale)
    .clipAngle(130)
    .rotate([-90, -90])
    .translate([width / 2 + .5, height / 2 + .5])
    // .precision(.5);

  var ticksAzimuth = svg.append("g")
    .attr("class", "ticks ticks--azimuth");

  ticksAzimuth.selectAll("line")
    .data(d3.range(180))
    .enter().append("line")
    .each(function (d) {
      var p0 = projection([d, 0]),
        p1 = projection([d, d % 45 ? -1 : -2]);

      d3.select(this)
        .attr("x1", p0[0])
        .attr("y1", p0[1])
        .attr("x2", p1[0])
        .attr("y2", p1[1]);
    });

  ticksAzimuth.selectAll("text")
    .data(d3.range(0, 181, 45))
    .enter().append("text")
    .each(function (d) {
      var p = projection([d, -4]);

      d3.select(this)
        .attr("x", p[0])
        .attr("y", p[1]);
    })
    .attr("dy", ".35em")
    .text(function (d,i) { return i*25; });


  function flippedStereographic(λ, φ) {
    var cosλ = Math.cos(λ),
      cosφ = Math.cos(φ),
      k = 1 / (1 + cosλ * cosφ);
    return [
      k * cosφ * Math.sin(λ),
      -k * Math.sin(φ)
    ];
  }
})();


