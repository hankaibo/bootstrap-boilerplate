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
var d3 = require('d3');
require('../common/d3-slider.js');
require('../common/d3-bubble.js');
require('../common/sb-admin-2.js');

d3.select("body")
  .selectAll("p")
  .data([4, 8, 15, 16, 23, 42])
  .enter().append("p")
  .text(function (d) { return "I’m number " + d + "!"; });

d3.select('#slider1').call(d3.slider());
// function bubble() {
//   var svg = d3.select('svg'),
//     width = +svg.attr('height');
//   var format = d3.format(',d');
//   var color = d3.scaleOrdinal(d3.schemeCategory20b);

//   var pack = d3.pack()
//     .size([width, width])
//     .padding(1);

//   d3.csv('/scripts/data/data.csv', function (d) {
//     d.value = +d.value;
//     if (d.value) { return d };
//   }, function (error, classes) {
//     if (error) { throw error };

//     var root = d3.hierarchy({ children: classes })
//       .sum(function (d) { console.log(d); return d.value; })
//       .each(function (d) {
//         if (id = d.data.id) {
//           var id, i = id.lastIndexOf('.');
//           d.id = id;
//           d.package = id.slice(0, 1);// 取这个值就是为了后面从颜色比例中取颜色而已
//           d.class = id.slice(i + 1);
//         }
//       });

//     var node = svg.selectAll('.node')
//       .data(pack(root).leaves())
//       .enter().append('g')
//       .attr('class', 'node')
//       .attr('transform', function (d) { return 'translate(' + d.x + ',' + d.y + ')'; });

//     node.append('circle')
//       .attr('id', function (d) { return d.id })
//       .attr('r', function (d) { return d.r })
//       .style('fill', function (d) {
//         // return color(d.package);
//         return color(Math.random());
//       });

//     node.append('cliPath')
//       .attr('id', function (d) { return 'clip-' + d.id; })
//       .append('use')
//       .attr('xlink:href', function (d) { return '#' + d.id });

//     node.append('text')
//       .attr('clip-path', function (d) { return 'url(#clip-)' + d.id + ')'; })
//       .selectAll('tspan')
//       .data(function (d) { return d.class.split(/(?=[A-Z][^A-Z])/g); })
//       .enter().append('tspan')
//       .attr('x', 0)
//       .attr('y', function (d, i, nodes) { return 13 + (i - nodes.length / 2 - 0.5) * 10 })
//       .text(function (d) { return d; });

//     node.append('title')
//       .text(function (d) { return d.id + '\n' + format(d.value); });
//   });
// }
// bubble();
// d3.select('#slider2').call(d3.slider().value([10, 25]));
// d3.select('#slider3').call(d3.slider().axis(true).value([10, 25]).on("slide", function(evt, value) {
//     d3.select('#slider3textmin').text(value[0]);
//     d3.select('#slider3textmax').text(value[1]);
// }));
// d3.select('#slider4').call(d3.slider().on("slide", function(evt, value) {
//     d3.select('#slider4text').text(value);
// }));
// d3.select('#slider5').call(d3.slider().axis(true));
// var axis = d3.svg.axis().orient("top").ticks(4);
// d3.select('#slider6').call(d3.slider().axis(axis));
// d3.select('#slider7').call(d3.slider().axis(true).min(2000).max(2100).step(5));
// d3.select('#slider8').call(d3.slider().value(50).orientation("vertical"));
// d3.select('#slider9').call(d3.slider().value([10, 30]).orientation("vertical"));
// d3.select('#slider2').call(d3.slider().scale(d3.scaleTime().domain([new Date(1984, 1, 1), new Date(2014, 1, 1)])).axis(d3.axisBottom()));
// d3.select('#slider11').call(d3.slider().scale(d3.time.scale().domain([new Date(1984, 1, 1), new Date(2014, 1, 1)])).axis(d3.svg.axis()).snap(true).value(new Date(2000, 1, 1)));
// essai = d3.slider().scale(d3.scale.ordinal().domain(["Gecko", "Webkit", "Blink", "Trident"]).rangePoints([0, 1], 0.5)).axis(d3.svg.axis()).snap(true).value("Gecko");
// d3.select('#slider12').call(essai);
