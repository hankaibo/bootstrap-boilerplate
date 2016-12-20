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
require('../common/d3-demo.js');

var d3 = require('d3');
var ringDouble = require('../common/d3-ring-double');

var value = [
  { id: 0, img: '../../img/sun.png', name: '山东如意集团', mark: 0 },
  { id: 1, img: '../../img/2.png', name: '山东济宁如意毛纺织股份有限公司', mark: 1 },
  { id: 2, img: '../../img/2.png', name: '澳大利亚麦德国际贸易有限公司', mark: 1 },
  { id: 3, img: '../../img/2.png', name: '山东济宁如意进出口有限公司', mark: 1 },
  { id: 4, img: '../../img/2.png', name: '济宁如意投资有限公司', mark: 1 },
  { id: 5, img: '../../img/2.png', name: '济宁如意印染有限公司', mark: 1 },
  { id: 6, img: '../../img/6.png', name: '济宁如意技术咨询有限公司', mark: 1 },
  { id: 7, img: '../../img/2.png', name: '济宁路嘉纳服装有限公司', mark: 1 },
  { id: 8, img: '../../img/2.png', name: '重庆三峡技术纺织有限公司', mark: 1 },
  { id: 9, img: '../../img/2.png', name: '济宁鲁意高新纤维材料有限公司', mark: 1 },
  { id: 10, img: '../../img/2.png', name: '济宁如意针织有限责任公司', mark: 1 },
  { id: 11, img: '../../img/1.png', name: '山东樱花投资控股有限公司', mark: 1 },
  { id: 12, img: '../../img/2.png', name: '山东济宁如意毛纺织股份有限公司', mark: 1 },
  { id: 13, img: '../../img/2.png', name: '金乡金樱棉业有限公司', mark: 1 },
  { id: 14, img: '../../img/2.png', name: '张家港保税区新乐毛纺织造有限公司', mark: 1 },
  { id: 15, img: '../../img/1.png', name: '青岛保税区如意投资有限公司', mark: 1 },
  { id: 16, img: '../../img/1.png', name: '山东邹城建信村镇银行有限公司', mark: 1 },
  { id: 17, img: '../../img/2.png', name: '伊藤忠（中国）集团有限公司', mark: 1 },
  { id: 18, img: '../../img/2.png', name: '临邑澳泰纺织有限公司', mark: 1 },
  { id: 19, img: '../../img/2.png', name: '伊藤忠商株式会社', mark: 1 },
  { id: 20, img: '../../img/2.png', name: '重庆市万州区如意置业有限公司', mark: 1 },
  { id: 21, img: '../../img/2.png', name: '济宁银行股份有限公司', mark: 2 },
  { id: 22, img: '../../img/1.png', name: '新疆嘉和毛纺织有限公司', mark: 2 },
  { id: 23, img: '../../img/2.png', name: '中国东方资管理公司', mark: 2 },
  { id: 24, img: '../../img/2.png', name: '山东如意毛纺织集团总公司进出口总公司', mark: 2 },
  { id: 25, img: '../../img/2.png', name: '内部职工股', mark: 2 },
  { id: 26, img: '../../img/2.png', name: '国家股', mark: 2 },
  { id: 27, img: '../../img/2.png', name: '山东如意置业有限公司', mark: 2 },
  { id: 28, img: '../../img/3.png', name: '澳大利亚麦德国际贸易有限公司', mark: 2 },
  { id: 29, img: '../../img/4.png', name: '郓城圣达如意印染有限公司', mark: 2 },
  { id: 30, img: '../../img/2.png', name: '山东如意数码科技印染有限公司', mark: 2 },
  { id: 31, img: '../../img/2.png', name: '济宁如意印染进出口有限公司', mark: 2 },
  { id: 32, img: '../../img/2.png', name: '邯郸金宝隆印染有限公司', mark: 2 },
  { id: 33, img: '../../img/2.png', name: '航天通信控股集团股份有限公司', mark: 2 },
  { id: 34, img: '../../img/user.png', name: '孙俊贵', mark: 2 },
  { id: 35, img: '../../img/2.png', name: '济宁如意印染有限公司工会委员会', mark: 2 },
  { id: 36, img: '../../img/user.png', name: '顾金照', mark: 2 },
  { id: 37, img: '../../img/user.png', name: '杜爱国', mark: 2 },
  { id: 38, img: '../../img/2.png', name: '宁夏如意国际贸易有限公司', mark: 2 },
  { id: 39, img: '../../img/2.png', name: '青岛如意恒成国际物流有限公司', mark: 2 },
  { id: 40, img: '../../img/2.png', name: '意大利路嘉纳股份公司', mark: 2 },
  { id: 41, img: '../../img/2.png', name: '山东樱花纺织集团有限公司', mark: 2 },
  { id: 42, img: '../../img/2.png', name: '济宁世通物流有限公司', mark: 2 },
  { id: 43, img: '../../img/2.png', name: '济宁永生重工机械制造有限公司', mark: 2 },
  { id: 44, img: '../../img/2.png', name: '山东好德国际能源发展有限公司', mark: 2 },
  { id: 45, img: '../../img/1.png', name: '山东宏河矿业集团有限公司', mark: 2 },
  { id: 46, img: '../../img/2.png', name: '山东省天安矿业有限公司', mark: 2 },
  { id: 47, img: '../../img/5.png', name: '山东天圆汇通科技有限公司', mark: 2 },
  { id: 48, img: '../../img/7.png', name: '兖州煤业股份有限公司', mark: 2 },
  { id: 49, img: '../../img/2.png', name: '中国建设银行股份有限公司', mark: 2 },
  { id: 50, img: '../../img/2.png', name: '重庆市万州区鲁诚商贸有限公司', mark: 2 },
  { id: 51, img: '../../img/2.png', name: '三星物产香港有限公司', mark: 2 },
  { id: 52, img: '../../img/2.png', name: '三星物产株式会社', mark: 2 },
  { id: 53, img: '../../img/2.png', name: '汶上如意技术纺织有限公司', mark: 2 },
  { id: 54, img: '../../img/user.png', name: '李瑞忠', mark: 2 },
  { id: 55, img: '../../img/user.png', name: '沈波', mark: 2 },
  { id: 56, img: '../../img/user.png', name: '王戈', mark: 2 },
  { id: 57, img: '../../img/1.png', name: '济宁市众信服装有限公司', mark: 2 },
  { id: 58, img: '../../img/1.png', name: '澳大利亚麦德公司', mark: 2 },
  { id: 59, img: '../../img/1.png', name: '山东省鲁信投资控股有限公司', mark: 2 },
  { id: 60, img: '../../img/1.png', name: '济宁如意房地产开发有限公司', mark: 2 },
  { id: 61, img: '../../img/1.png', name: '山东振鲁国际旅游航空服务有限公司', mark: 2 },
  { id: 62, img: '../../img/1.png', name: '济宁如意物业管理有限公司', mark: 2 },
  { id: 63, img: '../../img/1.png', name: '银川滨河如意服装有限公司', mark: 2 },
  { id: 64, img: '../../img/1.png', name: '济宁市国有资产管理委员会', mark: 2 },
  { id: 65, img: '../../img/1.png', name: '中国东方资产管理公司', mark: 2 },
  { id: 66, img: '../../img/2.png', name: '无锡市新乐一碳毛纺有限公司', mark: 2 }
];
var links = [
  { source: 0, target: 1 },
  { source: 0, target: 2 },
  { source: 0, target: 3 },
  { source: 0, target: 4 },
  { source: 0, target: 5 },
  { source: 0, target: 6 },
  { source: 0, target: 7 },
  { source: 0, target: 8 },
  { source: 0, target: 9 },
  { source: 0, target: 10 },
  { source: 0, target: 11 },
  { source: 0, target: 12 },
  { source: 0, target: 13 },
  { source: 0, target: 14 },
  { source: 0, target: 15 },
  { source: 0, target: 16 },
  { source: 0, target: 17 },
  { source: 0, target: 18 },
  { source: 0, target: 19 },
  { source: 0, target: 20 },

  { source: 1, target: 21 },
  { source: 1, target: 22 },
  { source: 1, target: 23},
  { source: 2, target: 24 },
  { source: 2, target: 25 },
  { source: 2, target: 26 },
  { source: 3, target: 27 },
  { source: 3, target: 28 },
  { source: 3, target: 29 },
  { source: 4, target: 30 },
  { source: 4, target: 31 },
  { source: 4, target: 32 },
  { source: 5, target: 33 },
  { source: 5, target: 34 },
  { source: 5, target: 35 },
  { source: 6, target: 36 },
  { source: 6, target: 37 },
  { source: 6, target: 38 },
  { source: 7, target: 39 },
  { source: 7, target: 40 },
  { source: 7, target: 41 },
  { source: 8, target: 42 },
  { source: 8, target: 43},
  { source: 8, target: 44 },
  { source: 9, target: 45 },
  { source: 9, target: 46 },
  { source: 9, target: 47 },
  { source: 10, target: 48 },
  { source: 10, target: 49 },
  { source: 10, target: 50 },
  { source: 11, target: 51 },
  { source: 11, target: 52 },
  { source: 11, target: 53 },
  { source: 12, target: 54 },
  { source: 12, target: 55 },
  { source: 12, target: 56 },
  { source: 13, target: 57 },
  { source: 13, target: 58 },
  { source: 13, target: 59 },
  { source: 14, target: 60 },
  { source: 14, target: 61 },
  { source: 15, target: 62 },
  { source: 15, target: 63 },
  { source: 16, target: 64 },
  { source: 16, target: 65 },
  { source: 17, target: 66 }
];

var circle1 = ringDouble()
  .width(1280)
  .height(930)
  .backgroundColor('#DFDFDF')  //背景色
  .value(value) // 小球数据，默认无
  .link(links) // 小球之间连接线，默认无

  .backgroundColorIn('#B1C2C4')
  .orbitColor(['#5185dd', '#4199ca']) // 小球外切轨道的颜色，默认['#5185dd', '#4199ca']
  .orbitWidth(1) // 小球外切轨道的宽度，默认1
  .trackBall(20) // 小球外切轨道显示多少个小球，默认12
  .ballSize([60, 60]) // 小球的半径从小到大，默认[12,24]
  .ballTextOutSize(12) // 小球外文字大小，默认12
  .ballTextOutColor('#000') // 小球外文字颜色
  .firstQuadrantTextAnchor('start')
  .secondQuadrantTextAnchor('start')
  .thirdQuadrantTextAnchor('end')
  .fourthQuadrantTextAnchor('end')

  .backgroundColorOut('#C7CFD0')
  .orbitColorOut(['#5185dd', '#4199ca']) //
  .orbitWidthOut(1) //
  .trackBallOut(50) //
  .ballSizeOut([60, 60]) //
  .ballTextOutSizeOut(12) //
  .ballTextOutColorOut('#000')
  .firstQuadrantTextAnchorOut('start')
  .secondQuadrantTextAnchorOut('start')
  .thirdQuadrantTextAnchorOut('end')
  .fourthQuadrantTextAnchorOut('end')

  .lightEffectImg('../../img/50_12.png')
  .lightEffectWidth(50)
  .lightEffectHeight(12);


d3.select('.d3-circle').call(circle1);

// var nodes = [
//   { name: "GuiLin" },
//   { name: "GuangZhou" },
//   { name: "XiaMen" },
//   { name: "HangZhou" },
//   { name: "ShangHai" },
//   { name: "QingDao" },
//   { name: "TianJin" },
//   { name: "BeiJing" },
//   { name: "ChangChun" },
//   { name: "XiAn" },
//   { name: "WuluMuQi" },
//   { name: "LaSa" },
//   { name: "ChengDu" }
// ];
// var edges = [
//   { source: 0, target: 1 },
//   { source: 0, target: 2 },
//   { source: 0, target: 3 },
//   { source: 0, target: 4 },
//   { source: 0, target: 5 },
//   { source: 0, target: 6 },
//   { source: 0, target: 7 },
//   { source: 0, target: 8 },
//   { source: 0, target: 9 },
//   { source: 0, target: 10 },
//   { source: 0, target: 11 },
//   { source: 0, target: 12 }
// ];

// var width = 1000;
// var height = 600;

// console.log(edges);

// var svg = d3.select('.d3-force-1').append('svg')
//   .attr('width', width)
//   .attr('height', height);

// var force = d3.forceSimulation(nodes)
//   .force('link', d3.forceLink(edges).distance(100))
//   .force('charge', d3.forceManyBody())
//   .force('center', d3.forceCenter(width / 2, height / 2));

// var color = d3.scaleOrdinal(d3.schemeCategory20);
// //
// var svg_edges = svg.selectAll('path.line')
//   .data(edges)
//   .enter()
//   .append('path')
//   .style('stroke', function (d, i) {
//     return color(i + 1);
//   })
//   .attr('class', 'line')
//   .attr('id', function (d, i) {
//     return 'line' + i;
//   })
//   .style('stroke-width', 1);
// var svg_mark = svg.selectAll('circle.mark')
//   .data(edges)
//   .enter()
//   .append('circle')
//   .attr('r', 12)
//   .attr('class', 'mark')
//   .style('fill', function (d, i) {
//     return color(i + 1);
//   });
// var mpath = svg_mark.append('animateMotion')
//   .attr('path', function (d) {
//     return 'M0,0L' + (d.target.x - d.source.x) + ',' + (d.target.y - d.source.y);
//   })
//   .attr('dur', '3s')
//   .attr('begin', '0s')
//   .attr('repeatCount', 'indefinite');

// var svg_nodes = svg.selectAll('circle.node')
//   .data(nodes)
//   .enter()
//   .append('circle')
//   .attr('r', 10)
//   .attr('class', 'node')
//   .style('fill', function (d, i) {
//     return color(i);
//   })
// // .call(force.drag());

// force.on('tick', function () {
//   svg_mark.attr('transform', function (d) {
//     return 'translate(' + d.source.x + ',' + d.source.y + ')';
//   });
//   mpath.attr('path', function (d) {
//     return 'M0,0L' + (d.target.x - d.source.x) + ',' + (d.target.y - d.source.y);
//   })

//   svg_nodes.attr('cx', function (d) {
//     return d.x;
//   });

//   svg_nodes.attr('cy', function (d) {
//     return d.y;
//   });
// })


// var svg = d3.select(".ddd").select('svg'),
//   width = +svg.attr("width"),
//   height = +svg.attr("height"),
//   color = d3.scaleOrdinal(d3.schemeCategory10);


// var a = { id: "a" },
//   b = { id: "b" },
//   c = { id: "c" },
//   nodes = [a, b, c],
//   links = [];

// var simulation = d3.forceSimulation(nodes)
//   .force("charge", d3.forceManyBody().strength(-1000))
//   .force("link", d3.forceLink(links).distance(200))
//   .force("x", d3.forceX())
//   .force("y", d3.forceY())
//   .alphaTarget(1)
//   .on("tick", ticked);

// var g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")"),
//   link = g.append("g").attr("stroke", "#000").attr("stroke-width", 1.5).selectAll(".link"),
//   node = g.append("g").attr("stroke", "#fff").attr("stroke-width", 1.5).selectAll(".node");

// restart();

// d3.timeout(function () {
//   links.push({ source: a, target: b }); // Add a-b.
//   links.push({ source: b, target: c }); // Add b-c.
//   links.push({ source: c, target: a }); // Add c-a.
//   restart();
// }, 1000);

// d3.interval(function () {
//   nodes.pop(); // Remove c.
//   links.pop(); // Remove c-a.
//   links.pop(); // Remove b-c.
//   restart();
// }, 2000, d3.now());

// d3.interval(function () {
//   nodes.push(c); // Re-add c.
//   links.push({ source: b, target: c }); // Re-add b-c.
//   links.push({ source: c, target: a }); // Re-add c-a.
//   restart();
// }, 2000, d3.now() + 1000);

// function restart() {

//   // Apply the general update pattern to the nodes.
//   node = node.data(nodes, function (d) { return d.id; });

//   node.exit().transition()
//     .attr("r", 0)
//     .remove();

//   node = node.enter().append("circle")
//     .attr("fill", function (d) { return color(d.id); })
//     .call(function (node) { node.transition().attr("r", 8); })
//     .merge(node);

//   // Apply the general update pattern to the links.
//   link = link.data(links, function (d) { return d.source.id + "-" + d.target.id; });

//   // Keep the exiting links connected to the moving remaining nodes.
//   link.exit().transition()
//     .attr("stroke-opacity", 0)
//     .attrTween("x1", function (d) { return function () { return d.source.x; }; })
//     .attrTween("x2", function (d) { return function () { return d.target.x; }; })
//     .attrTween("y1", function (d) { return function () { return d.source.y; }; })
//     .attrTween("y2", function (d) { return function () { return d.target.y; }; })
//     .remove();

//   link = link.enter().append("line")
//     .call(function (link) {
//       link
//         .attr('stroke', '#00beff')
//         .attr('stroke-width', 1.5)
//         .attr('stroke-dasharray', '1000,1000')
//         .transition()
//         .duration(2000)
//         .styleTween("stroke-dashoffset", function () {
//           return d3.interpolateNumber(1000, 0);
//         });
//     })
//     .merge(link);

//   // Update and restart the simulation.
//   simulation.nodes(nodes);
//   simulation.force("link").links(links);
//   simulation.alpha(1).restart();
// }

// function ticked() {
//   node.attr("cx", function (d) { return d.x; })
//     .attr("cy", function (d) { return d.y; })

//   link.attr("x1", function (d) { return d.source.x; })
//     .attr("y1", function (d) { return d.source.y; })
//     .attr("x2", function (d) { return d.target.x; })
//     .attr("y2", function (d) { return d.target.y; });
// }


















// // var progressRadial1 = d3.progressRadial()
// //   .backgroundColor('#4f4f4f')
// //   .startPosition(2);

// // d3.select('.d3-progress-radial').call(progressRadial1);

// // d3.select('#main').call(d3.progressCircular, .25);
// // d3.select('.d3-progress-circular').select('form').on('input', function () {
// //   d3.select('#main').call(d3.progressCircular, +this.output.value);
// // });

// // // { id: 1, ranking: 1, name: '猛龙' },
// var value = [
//   { id: 1, ranking: 1, name: '猛龙' },
//   { id: 2, ranking: 2, name: '火箭' },
//   { id: 3, ranking: 3, name: '凯尔特' },
//   { id: 4, ranking: 4, name: '超音速' },
//   { id: 5, ranking: 5, name: '马刺' },
//   { id: 6, ranking: 6, name: '太阳' },
//   { id: 7, ranking: 7, name: '森林' },
//   { id: 8, ranking: 8, name: '开拓者' },
//   { id: 9, ranking: 9, name: '勇士' },
//   { id: 10, ranking: 10, name: '奇才' },
//   { id: 11, ranking: 11, name: '山猫' },
//   { id: 12, ranking: 12, name: '雄鹿' },
//   { id: 13, ranking: 13, name: '公牛' },
//   { id: 14, ranking: 14, name: '骑士' },
//   { id: 15, ranking: 15, name: '灰熊' },
//   { id: 16, ranking: 16, name: '快船' },
//   { id: 17, ranking: 17, name: '鹰' },
//   { id: 18, ranking: 18, name: '网' },
//   { id: 19, ranking: 19, name: '热' },
//   { id: 20, ranking: 20, name: '黄蜂' },
//   { id: 21, ranking: 21, name: '爵士' },
//   { id: 22, ranking: 22, name: '国王' },
//   { id: 23, ranking: 23, name: '尼克斯' },
//   { id: 24, ranking: 24, name: '湖人' },
//   { id: 25, ranking: 25, name: '魔术' },
//   { id: 26, ranking: 26, name: '小牛' },
//   { id: 27, ranking: 27, name: '76人' },
//   { id: 28, ranking: 28, name: '掘金' },
//   { id: 29, ranking: 29, name: '步行者' },
//   { id: 30, ranking: 30, name: '活塞' },
// ]

// var circle1 = d3.circle()
//   .value(value.slice(0, 30)) // 小球数据，默认无
//   .orbitColor(['#5185dd', '#4199ca']) // 小球外切轨道的颜色，默认['#5185dd', '#4199ca']
//   .orbitWidth(1) // 小球外切轨道的宽度，默认1
//   .trackBall(30) // 小球外切轨道显示多少个小球，默认12
//   .ballSize([15, 35]) // 小球的半径从小到大，默认[12,24]
//   .isEquant(false) // 是否等分分布小圆，默认true
//   .ballTextOutSize(14) // 小球外文字大小，默认12
//   .textPathArc([2 * Math.PI * .85, 2 * Math.PI])
//   .textAfterEdge('NBA各队') // 左上角外文字，默认空
//   .textAfterEdgeStartOffset('15%') // 左上角外文字开始点，默认0
//   .textBeforeEdge('国际球员数量')
//   .textBeforeEdgeStartOffset('14%');

// d3.select('.d3-circle-1').call(circle1);

// var circle2 = d3.circle()
//   .width(720) // 长度，默认720
//   .height(720) // 宽度，默认720
//   .backgroundColor('#fff') // 画布的背景色，默认#fff
//   .value(value.slice(0, 30)) // 小球数据，默认无
//   .isClockwise(false) // 小球排列顺序，默认true，顺时针
//   .orbitColor(['#5185dd', '#4199ca']) // 小球外切轨道的颜色，默认['#5185dd', '#4199ca']
//   .orbitWidth(2) // 小球外切轨道的宽度，默认1
//   .trackBall(30) // 小球外切轨道显示多少个小球，默认12
//   .ballSize([15, 35]) // 小球的半径从小到大，默认[12,24]
//   .isEquant(false) // 是否等分分布小圆，默认true
//   .ballTextOutSize(14) // 小球外文字大小，默认12
//   .firstQuadrantDominantBaseline('text-before-edge') // 第一象限文字基线，默认值'text-before-edge'
//   .firstQuadrantTextAnchor('end') // 第一象限文字起点，默认值'end'
//   .secondQuadrantDominantBaseline('text-after-edge') // 第二象限文字基线，默认值'text-after-edge'
//   .secondQuadrantTextAnchor('end')// 第二象限文字起点，默认值'end'
//   .thirdQuadrantDominantBaseline('text-after-edge')// 第三象限文字基线，默认值'text-after-edge'
//   .thirdQuadrantTextAnchor('start')// 第三象限文字起点，默认值'start'
//   .fourthQuadrantDominantBaseline('text-before-edge')// 第四象限文字基线，默认值'text-before-edge'
//   .fourthQuadrantTextAnchor('start')// 第四象限文字起点，默认值'start'
//   .textPathArc([0, .25 * Math.PI]) // 文字路径起止，默认[2 * Math.PI * .75, 2 * Math.PI]
//   .textAfterEdge('NBA各队') // 左上角外文字，默认空
//   .textAfterEdgeColor('#1e518f') // 左上角外文字颜色，默认#000
//   .textAfterEdgeSize(30) // 左上角外文字大小，默认24
//   .textAfterEdgeStartOffset('14%') // 左上角外文字开始点，默认0
//   .textAfterEdgeDominantBaseline('text-after-edge') // 左上角外文字的基线？这个属性没清楚。默认'text-after-edge'
//   .textBeforeEdge('国际球员数量') //
//   .textBeforeEdgeColor('#1e518f') // 左上角内文字颜色，默认#000
//   .textBeforeEdgeSize(18) // 左上角内文字大小，默认18
//   .textBeforeEdgeStartOffset('15%') // 左上角内文字开始点，默认0
//   .textBeforeEdgeDominantBaseline('text-before-edge'); // 左上角内文字的基线？这个属性没清楚。默认'text-before-edge'
// d3.select('.d3-circle-2').call(circle2);
