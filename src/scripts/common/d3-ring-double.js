/**
 * @author hankaibo
 */
var d3 = require('d3');
module.exports = function () {
  'use strict';
  // Public variables with default settings
  var width = 720;
  var height = 720;
  var backgroundColor = '#fff';

  var value;
  var link;

  var centerImgHeight = 60;
  var centerImgWidth = 60;
  var centerTxtOutSize = 12;
  var centerTextOutColor = '#fff';
  var centerTextDominantBaseline = 'text-before-edge';
  var centerTextAnchor = 'middle';

  var imgHeight = 30;
  var imgWidth = 30;
  var isClockwise = true;
  var orbitColor = ['#5185dd', '#4199ca'];
  var orbitWidth = 1;
  var trackBall = 12;
  var ballSize = [12, 24];
  var isEquant = true;
  var ballTextOutSize = 12;
  var ballTextOutColor = '#fff';
  var firstQuadrantDominantBaseline = 'text-before-edge';
  var firstQuadrantTextAnchor = 'end';
  var secondQuadrantDominantBaseline = 'text-after-edge';
  var secondQuadrantTextAnchor = 'end';
  var thirdQuadrantDominantBaseline = 'text-after-edge';
  var thirdQuadrantTextAnchor = 'start';
  var fourthQuadrantDominantBaseline = 'text-before-edge';
  var fourthQuadrantTextAnchor = 'start';
  var radiusIn = 150;
  var backgroundColorIn = '#132528';

  var isClockwiseOut = true;
  var orbitColorOut = ['#5185dd', '#4199ca'];
  var orbitWidthOut = 1;
  var trackBallOut = 12;
  var ballSizeOut = [12, 24];
  var isEquantOut = true;
  var ballTextOutSizeOut = 12;
  var ballTextOutColorOut = '#fff';
  var firstQuadrantDominantBaselineOut = 'text-before-edge';
  var firstQuadrantTextAnchorOut = 'end';
  var secondQuadrantDominantBaselineOut = 'text-after-edge';
  var secondQuadrantTextAnchorOut = 'end';
  var thirdQuadrantDominantBaselineOut = 'text-after-edge';
  var thirdQuadrantTextAnchorOut = 'start';
  var fourthQuadrantDominantBaselineOut = 'text-before-edge';
  var fourthQuadrantTextAnchorOut = 'start';
  var radiusOut = 300;
  var backgroundColorOut = "#141d1f";

  // Private variables
  var centerValue = [];
  var valueOut = [];
  var valueIn = [];
  var linkOut = [];
  var linkIn = [];
  var arrayX1 = [];
  var arrayY1 = [];
  var arrayX2 = [];
  var arrayY2 = [];

  var a;
  var b;
  var c;
  var cosc;
  var hudu = 0;
  var X;
  var Y;
  var x;
  var y;
  var xyNodeIn = [];
  var xyNodeOut = [];
  var PI2 = 2 * Math.PI;

  function chart(selection) {
    selection.each(function () {
      // 计算页面的宽度和高度
      var scrollWidth = document.body.scrollWidth;
      var scrollHeight = document.body.scrollHeight;
      var maxRadius = d3.max([scrollHeight, scrollWidth]);
      // 内环和外环的颜色和其上小圆半径大小比例尺
      var orbitColorScaleIn = d3.scaleLinear()
        .domain([0, trackBall])
        .range([orbitColor[0], orbitColor[1]]);
      var ballSizeScaleIn = d3.scaleLinear()
        .domain([0, trackBall])
        .rangeRound([ballSize[1], ballSize[0]]);
      var orbitColorScaleOut = d3.scaleLinear()
        .domain([0, trackBallOut])
        .range([orbitColorOut[0], orbitColorOut[1]]);
      var ballSizeScaleOut = d3.scaleLinear()
        .domain([0, trackBallOut])
        .rangeRound([ballSizeOut[1], ballSizeOut[0]]);
      // 分离出合适的数组
      value.forEach(function (element, index) {
        if (element.mark == 0) {
          centerValue.push(element)
        } else if (element.mark == 1) {
          valueIn.push(element);
        } else if (element.mark == 2) {
          valueOut.push(element)
        }
      });
      link.forEach(function (element, index) {
        valueIn.forEach(function (ele, ind) {
          if (ele.id == element.target) {
            linkIn.push(element);
          }
        });
        valueOut.forEach(function (ele, ind) {
          if (ele.id == element.target) {
            linkOut.push(element);
          }
        });

      });

      // svg区域
      var svg = d3.select(this).append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');
      // 箭头
      createArrow(svg);
      // 缩放
      // init drag, zoom and rotate
      // dragZoomRotateControl(d3.select(this))
      //   .scaleExtent([0.25, 8])
      //   .duration(0)
      //   .on("zoom", function () {
      //     // _this.rotation(d3.event.rotation);
      //     svg.attr("transform", d3.event.transform);
      //   });

      // 背景
      createBackground(svg, centerImgWidth / 2, radiusIn, backgroundColorIn, 1);
      d3.timeout(function () {
        createBackground(svg, radiusIn, radiusOut, backgroundColorOut, 2);
        svg.selectAll('.backgroundColorArc').sort(function (a, b) {
          return 1;
        });
      }, 4000);
      d3.timeout(function () {
        createBackground(svg, radiusOut, maxRadius, backgroundColor, 3);
        svg.selectAll('.backgroundColorArc').sort(function (a, b) {
          return 1;
        });
      }, 8000);
      // 中心区域图
      createRectArea(svg, centerValue, centerTxtOutSize, centerTextOutColor);
      // 内外环轨道
      createOrbit(svg, radiusIn, orbitColorScaleIn, trackBall, orbitWidth);
      createOrbit(svg, radiusOut, orbitColorScaleOut, trackBallOut, orbitWidthOut);
      // 内外环轨道小圆
      if (value) {
        createCircle(svg, valueIn, trackBall, radiusIn, 'node-in', 'nodeText-in', ballSizeScaleIn, ballTextOutSize, ballTextOutColor);
        createCircle(svg, valueOut, trackBallOut, radiusOut, 'node-out', 'nodeText-out', ballSizeScaleOut, ballTextOutSizeOut, ballTextOutColorOut);
      }
      // 内外环轨道之间连接线
      // createLine('node-in', 'node-out','node-in-line', linkIn, valueIn.length, ballSizeScaleIn);
      d3.timeout(function () {
        // createLineOut();
        createLine('node-in','node-out', 'node-out-line', linkOut, valueOut.length, ballSizeScaleOut);
      }, 4000);

      // 创建外层线
      function createLineOut() {
        svg.selectAll('g.node-out').each(function (d, i) {
          var xy = d3.select(this).attr('transform').substr(10).replace(')', '').split(',');
          var id = d3.select(this).attr('id');
          var fooLine = svg.append("line")
            .attr("stroke-width", 1.5)
            .attr("stroke", "#157d8e")
            .attr('stroke-dasharray', '1000,1000');
          switch (id) {
            case 'node-out_1':
              foobar(i, fooLine, xyNodeIn[0][0], xyNodeIn[0][1], xy[0], xy[1]);
              break;
            case 'node-out_2':
              foobar(i, fooLine, xyNodeIn[1][0], xyNodeIn[1][1], xy[0], xy[1]);
              break;
            case 'node-out_3':
              foobar(i, fooLine, xyNodeIn[1][0], xyNodeIn[1][1], xy[0], xy[1]);
              break;
            case 'node-out_4':
              foobar(i, fooLine, xyNodeIn[1][0], xyNodeIn[1][1], xy[0], xy[1]);
              break;
            case 'node-out_5':
              foobar(i, fooLine, xyNodeIn[1][0], xyNodeIn[1][1], xy[0], xy[1]);
              break;
            case 'node-out_6':
              foobar(i, fooLine, xyNodeIn[1][0], xyNodeIn[1][1], xy[0], xy[1]);
              break;
            case 'node-out_7':
              foobar(i, fooLine, xyNodeIn[1][0], xyNodeIn[1][1], xy[0], xy[1]);
              break;
            case 'node-out_8':
              foobar(i, fooLine, xyNodeIn[3][0], xyNodeIn[3][1], xy[0], xy[1]);
              break;
            case 'node-out_9':
              foobar(i, fooLine, xyNodeIn[3][0], xyNodeIn[3][1], xy[0], xy[1]);
              break;
            case 'node-out_10':
              foobar(i, fooLine, xyNodeIn[5][0], xyNodeIn[5][1], xy[0], xy[1]);
              break;
            case 'node-out_11':
              foobar(i, fooLine, xyNodeIn[5][0], xyNodeIn[5][1], xy[0], xy[1]);
              break;
            case 'node-out_12':
              foobar(i, fooLine, xyNodeIn[5][0], xyNodeIn[5][1], xy[0], xy[1]);
              break;
            case 'node-out_13':
              foobar(i, fooLine, xyNodeIn[5][0], xyNodeIn[5][1], xy[0], xy[1]);
              break;
            case 'node-out_14':
              foobar(i, fooLine, xyNodeIn[5][0], xyNodeIn[5][1], xy[0], xy[1]);
              break;
            case 'node-out_15':
              foobar(i, fooLine, xyNodeIn[5][0], xyNodeIn[5][1], xy[0], xy[1]);
              break;
            case 'node-out_16':
              foobar(i, fooLine, xyNodeIn[5][0], xyNodeIn[5][1], xy[0], xy[1]);
              break;
            case 'node-out_17':
              foobar(i, fooLine, xyNodeIn[5][0], xyNodeIn[5][1], xy[0], xy[1]);
              break;
            case 'node-out_18':
              foobar(i, fooLine, xyNodeIn[7][0], xyNodeIn[7][1], xy[0], xy[1]);
              break;
            case 'node-out_19':
              foobar(i, fooLine, xyNodeIn[8][0], xyNodeIn[8][1], xy[0], xy[1]);
              break;
            case 'node-out_20':
              foobar(i, fooLine, xyNodeIn[8][0], xyNodeIn[8][1], xy[0], xy[1]);
              break;
            case 'node-out_21':
              foobar(i, fooLine, xyNodeIn[8][0], xyNodeIn[8][1], xy[0], xy[1]);
              break;
            case 'node-out_22':
              foobar(i, fooLine, xyNodeIn[8][0], xyNodeIn[8][1], xy[0], xy[1]);
              break;
            case 'node-out_23':
              foobar(i, fooLine, xyNodeIn[8][0], xyNodeIn[8][1], xy[0], xy[1]);
              break;
            case 'node-out_24':
              foobar(i, fooLine, xyNodeIn[9][0], xyNodeIn[9][1], xy[0], xy[1]);
              break;
            case 'node-out_25':
              foobar(i, fooLine, xyNodeIn[10][0], xyNodeIn[10][1], xy[0], xy[1]);
              break;
            case 'node-out_26':
              foobar(i, fooLine, xyNodeIn[10][0], xyNodeIn[10][1], xy[0], xy[1]);
              break;
            case 'node-out_27':
              foobar(i, fooLine, xyNodeIn[11][0], xyNodeIn[11][1], xy[0], xy[1]);
              break;
            case 'node-out_28':
              foobar(i, fooLine, xyNodeIn[12][0], xyNodeIn[12][1], xy[0], xy[1]);
              break;
            case 'node-out_29':
              foobar(i, fooLine, xyNodeIn[12][0], xyNodeIn[12][1], xy[0], xy[1]);
              break;
            case 'node-out_30':
              foobar(i, fooLine, xyNodeIn[12][0], xyNodeIn[12][1], xy[0], xy[1]);
              break;
            case 'node-out_31':
              foobar(i, fooLine, xyNodeIn[12][0], xyNodeIn[12][1], xy[0], xy[1]);
              break;
            case 'node-out_32':
              foobar(i, fooLine, xyNodeIn[12][0], xyNodeIn[12][1], xy[0], xy[1]);
              break;
            case 'node-out_33':
              foobar(i, fooLine, xyNodeIn[12][0], xyNodeIn[12][1], xy[0], xy[1]);
              break;
            case 'node-out_34':
              foobar(i, fooLine, xyNodeIn[13][0], xyNodeIn[13][1], xy[0], xy[1]);
              break;
            case 'node-out_35':
              foobar(i, fooLine, xyNodeIn[13][0], xyNodeIn[13][1], xy[0], xy[1]);
              break;
            case 'node-out_36':
              foobar(i, fooLine, xyNodeIn[13][0], xyNodeIn[13][1], xy[0], xy[1]);
              break;
            case 'node-out_37':
              foobar(i, fooLine, xyNodeIn[15][0], xyNodeIn[15][1], xy[0], xy[1]);
              break;
            case 'node-out_38':
              foobar(i, fooLine, xyNodeIn[15][0], xyNodeIn[15][1], xy[0], xy[1]);
              break;
            case 'node-out_39':
              foobar(i, fooLine, xyNodeIn[15][0], xyNodeIn[15][1], xy[0], xy[1]);
              break;
            case 'node-out_40':
              foobar(i, fooLine, xyNodeIn[17][0], xyNodeIn[17][1], xy[0], xy[1]);
              break;
            case 'node-out_41':
              foobar(i, fooLine, xyNodeIn[17][0], xyNodeIn[17][1], xy[0], xy[1]);
              break;
            case 'node-out_42':
              foobar(i, fooLine, xyNodeIn[17][0], xyNodeIn[17][1], xy[0], xy[1]);
              break;
            case 'node-out_43':
              foobar(i, fooLine, xyNodeIn[17][0], xyNodeIn[17][1], xy[0], xy[1]);
              break;
            case 'node-out_44':
              foobar(i, fooLine, xyNodeIn[17][0], xyNodeIn[17][1], xy[0], xy[1]);
              break;
            case 'node-out_45':
              foobar(i, fooLine, xyNodeIn[19][0], xyNodeIn[19][1], xy[0], xy[1]);
              break;
            case 'node-out_46':
              foobar(i, fooLine, xyNodeIn[19][0], xyNodeIn[19][1], xy[0], xy[1]);
              break;
            case 'node-out_47':

              break;
            case 'node-out_48':

              break;
            case 'node-out_49':

              break;
            case 'node-out_51':

              break;
            default:
              break;
          }

        });
        function foobar(i, dom, x1, y1, x2, y2) {
          var hypotenuse = Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
          var offx1 = (x2 - x1) / hypotenuse * 20;
          var offy1 = (y2 - y1) / hypotenuse * 20;
          // console.log('______'+offx1);
          // console.log('______'+offy1);
          var x1out = parseFloat(x1) + offx1;
          var y1out = parseFloat(y1) + offy1;
          var x2out = parseFloat(x2) - offx1;
          var y2out = parseFloat(y2) - offy1;

          var hudu = Math.atan2((y2 - y1), (x2 - x1));
          var jiaodu = hudu * 180 / Math.PI;
          // console.log(jiaodu);

          dom
            .attr('x1', x1out)
            .attr('y1', y1out)
            .attr('x2', x2out)
            .attr('y2', y2out)
            .attr("marker-end", "url(#arrow)")
            .transition()
            .duration(2000)
            .styleTween("stroke-dashoffset", function () {
              return d3.interpolateNumber(1000, 0);
            });
          // console.log(x1out);
          // console.log(y1out);
          // console.log(x2out);
          // console.log(y2out);

          var svg_mark = svg
            .append('g')
            .attr('transform', 'rotate(' + (jiaodu + 180) + ')');
          svg_mark
            .append('image')
            .attr('xlink:href', '../../img/50_12.png')
            .attr('transform', 'translate(' + (-50 / 2) + ',' + (-12 / 2) + ')');
          var mpath = svg_mark.append("animateMotion").attr("path", function (d) {
            return "M" + x1out + "," + y1out + "L" + x2out + "," + y2out;
          })
            .attr("dur", "4s")
            .attr("begin", "0s")
            .attr("repeatCount", "indefinite")
          // .ease('quad-in');
        }
      }
      // 创建连接线
      function createLine(source,target, lineCss, value, circleNum, circleRadius) {
        var linkEnter = svg.selectAll('g.' + lineCss)
          .data(value)
          .enter()
          .append('g')
          .attr('class', lineCss)
          .attr('id', function (d, i) {
            return lineCss + '_' + (i + 1);
          });
        var linkExit = svg.selectAll('g.' + lineCss)
          .data(value)
          .exit()
          .remove();
        var linkData = svg.selectAll('g.' + lineCss)
          .data(value);

        linkData.append("line")
          .attr("stroke-width", 1.5)
          .attr("stroke", "#157d8e")
          .attr('stroke-dasharray', '1000,1000')
          .attr('x1', function (d, i) {
            var xy = document.querySelector('#' + source + '_' + d.source).getAttribute('transform').substr(10).replace(')', '').split(',');
            var hudu1 = (i + 0) * (2 * Math.PI / circleNum);
            var X1 = Math.sin(hudu1) * circleRadius(i);
            arrayX1.push(X1);
            xyNodeIn.push(xy);
            return X1;
          })
          .attr('y1', function (d, i) {
            var xy = document.querySelector('#' + source + '_' + d.source).getAttribute('transform').substr(10).replace(')', '').split(',');
            var hudu1 = (i + 0) * (2 * Math.PI / circleNum);
            var Y1 = -Math.cos(hudu1) * circleRadius(i);
            arrayY1.push(Y1);
            return Y1;
          })
          .attr('x2', function (d, i) {
            var xy = document.querySelector('#' + target + '_' + d.target).getAttribute('transform').substr(10).replace(')', '').split(',');
            var hudu1 = (i + 0) * (2 * Math.PI / circleNum);
            var X2 = Math.sin(2 * Math.PI - hudu1) * 20 + parseFloat(xy[0]);
            arrayX2.push(X2);
            return X2;
          })
          .attr('y2', function (d, i) {
            var xy = document.querySelector('#' + target + '_' + d.target).getAttribute('transform').substr(10).replace(')', '').split(',');
            var hudu1 = (i + 0) * (2 * Math.PI / circleNum);
            var Y2 = Math.cos(2 * Math.PI - hudu1) * 20 + parseFloat(xy[1]);
            arrayY2.push(Y2);
            return Y2;
          })
          .attr("marker-end", "url(#arrow)")
          .transition()
          .duration(2000)
          .styleTween("stroke-dashoffset", function () {
            return d3.interpolateNumber(1000, 0);
          });
        linkData.each(function (d, i) {
          var svg_mark = svg
            .append('g')
            .attr('transform', 'rotate(' + (360) + ')');
          svg_mark
            .append('image')
            .attr('xlink:href', '../../img/50_12.png')
            .attr('transform', 'translate(' + (-50 / 2) + ',' + (-12 / 2) + ')');
          var mpath = svg_mark.append("animateMotion").attr("path", function (d) {
            console.log(arrayX1[i] + ',' + arrayY1[i]);
            console.log(arrayX2[i] + ',' + arrayY2[i]);
            console.log('---------------------------');
            return "M" + arrayX1[i] + "," + arrayY1[i] + "L" + arrayX2[i] + "," + arrayX2[i];
          }).attr("dur", "4s").attr("begin", "1s").attr("repeatCount", "indefinite");
        })


        // svg.selectAll('g.' + nodeCss).each(function (d, i) {
        // var xy = d3.select(this).attr('transform').substr(10).replace(')', '').split(',');
        // xyNodeIn.push(xy);

        // var hudu1 = (i + 0) * (2 * Math.PI / circleNum);
        // var X1 = Math.sin(hudu1) * circleRadius(i);
        // var Y1 = -Math.cos(hudu1) * circleRadius(i);
        // // console.log(X1+'___'+Y1);

        // var X2 = Math.sin(2 * Math.PI - hudu1) * 20 + parseFloat(xy[0]);
        // var Y2 = Math.cos(2 * Math.PI - hudu1) * 20 + parseFloat(xy[1]);
        // console.log(X2+'___'+Y2);

        // svg.append("line")
        //   .attr("stroke-width", 1.5)
        //   .attr("stroke", "#157d8e")
        //   .attr('stroke-dasharray', '1000,1000')
        //   .attr('x1', X1)
        //   .attr('y1', Y1)
        //   .attr('x2', X2)
        //   .attr('y2', Y2)
        //   .attr("marker-end", "url(#arrow)")
        //   .transition()
        //   .duration(2000)
        //   .styleTween("stroke-dashoffset", function () {
        //     return d3.interpolateNumber(1000, 0);
        //   });

        // var svg_mark = svg
        //   .append('g')
        //   .attr('transform', 'rotate(' + (18 * i + 90) + ')');
        // svg_mark
        //   .append('image')
        //   .attr('xlink:href', '../../img/50_12.png')
        //   .attr('transform', 'translate(' + (-50 / 2) + ',' + (-12 / 2) + ')');
        // var mpath = svg_mark.append("animateMotion").attr("path", function (d) {
        //   return "M" + X1 + "," + Y1 + "L" + (X2) + "," + (Y2);
        // }).attr("dur", "4s").attr("begin", "1s").attr("repeatCount", "indefinite");

        // });
      }
      /**
       * 创建圆
       *
       * @param {any} dom 操作区域
       * @param {any} value 可视化的数据
       * @param {any} ballSum 小圆数
       * @param {any} radius 小圆半径
       * @param {any} nodeClass 小圆css类
       * @param {any} nodeTextClass 小圆文字css类
       * @param {any} ballSizeScale 小圆大小
       * @param {any} fontSize 文字大小
       * @param {any} fontColor 文字颜色
       */
      function createCircle(dom, value, ballSum, radius, nodeClass, nodeTextClass, ballSizeScale, fontSize, fontColor) {
        // var foo=d3.forceSimulation(value);
        var nodeEnter = dom.selectAll('g.' + nodeClass)
          .data(value)
          .enter()
          .append('g')
          .attr('class', nodeClass)
          .attr('id', function (d, i) {
            return nodeClass + '_' + d.id;
          });

        var nodeExit = dom.selectAll('g.' + nodeClass)
          .data(value)
          .exit()
          .remove();

        var nodeData = dom.selectAll('g.' + nodeClass)
          .data(value);

        nodeData.append("image")
          .attr('transform', 'translate(' + -imgWidth / 2 + ',' + -imgHeight / 2 + ')')
          .attr("width", imgWidth)
          .attr("height", imgHeight)
          .attr("xlink:href", function (d) { return d.img; });
        nodeData.append('text')
          .attr('class', nodeTextClass)
          .attr('x', 0)
          .attr('y', 0)
          .style('fill', fontColor)
          .style('font-size', function (d, i) { return fontSize; })
          .text(function (d) { return d.name; });
        nodeData.each(function (d, i) {
          if (isEquant) {
            hudu = (i + 0) * (2 * Math.PI / ballSum);
          } else {
            if (i == 0) {
              d3.select(this).attr('transform', 'translate(' + 0 + ',' + -(radius + ballSizeScale(i)) + ')');
            } else {
              a = radius + ballSizeScale(i);
              b = radius + ballSizeScale(i + 1);
              c = ballSizeScale(i) + ballSizeScale(i + 1);
              cosc = (Math.pow(a, 2) + Math.pow(b, 2) - Math.pow(c, 2)) / (2 * a * b);
              hudu += Math.acos(cosc);
            }
          }

          X = Math.sin(isClockwise ? hudu : (2 * Math.PI - hudu)) * (radius);
          Y = Math.cos(isClockwise ? hudu : (2 * Math.PI - hudu)) * (radius);
          d3.select(this)
            .attr('transform', 'translate(' + X + ',' + -Y + ')');

          x = Math.sin(isClockwise ? (2 * Math.PI - hudu) : hudu) * ballSizeScale(i);
          y = Math.cos(isClockwise ? (2 * Math.PI - hudu) : hudu) * ballSizeScale(i);
          var nodeTextOut = d3.select(this)
            .select('text.' + nodeTextClass)
            .attr('transform', 'translate(' + -x + ',' + -y + ')');
          setTextOfcircle(nodeTextOut, isClockwise ? hudu : (2 * Math.PI - hudu));

        });
        /**
         * 小圆文字布局
         *
         * @param {any} dom 操作区域
         * @param {any} hudu 圆的弧度
         */
        function setTextOfcircle(dom, hudu) {
          // 四象限设置
          if (hudu > 0 && hudu < Math.PI * .5) {
            execTextOfcircleLayout(dom, firstQuadrantDominantBaseline, firstQuadrantTextAnchor);
          } else if (hudu < Math.PI * 1) {
            execTextOfcircleLayout(dom, secondQuadrantDominantBaseline, secondQuadrantTextAnchor);
          } else if (hudu < Math.PI * 1.5) {
            execTextOfcircleLayout(dom, thirdQuadrantDominantBaseline, thirdQuadrantTextAnchor);
          } else {
            execTextOfcircleLayout(dom, fourthQuadrantDominantBaseline, fourthQuadrantTextAnchor);
          }
          // 对特殊角度进行单独设置
          if (hudu == 0 || hudu == 2 * Math.PI) {
            execTextOfcircleLayout(dom, 'text-before-edge', 'middle');
          } else if (hudu == Math.PI * .5) {
            execTextOfcircleLayout(dom, 'central', 'end');
          } else if (hudu == Math.PI * 1) {
            execTextOfcircleLayout(dom, 'text-after-edge', 'middle');
          } else if (hudu == Math.PI * 1.5) {
            execTextOfcircleLayout(dom, 'central', 'start');
          }
        }
        /**
         * 小圆文字布局
         *
         * @param {any} dom  操作区域
         * @param {any} baseline 文字基线设置
         * @param {any} textAnchor 文字起止点设置
         */
        function execTextOfcircleLayout(dom, baseline, textAnchor) {
          dom.attr('dominant-baseline', baseline)
            .attr('text-anchor', textAnchor);
        }
      }
      /**
       * 创建轨道
       *
       * @param {any} dom 操作区域
       * @param {any} radius 内半径
       * @param {any} orbitCS 轨道颜色
       * @param {any} orbitNum 轨道等分
       * @param {any} orbitWidth 轨道宽度
       */
      function createOrbit(dom, radius, orbitCS, orbitNum, orbitWidth) {
        for (var i = 0; i < 1; i++) {
          // for (var i = 0; i < orbitNum; i++) {
          dom.append("path")
            .attr("class", "earthOrbitPosition")
            .attr("d", d3.arc().outerRadius(radius + orbitWidth / 2).innerRadius(radius - orbitWidth / 2).startAngle(0).endAngle(2 * Math.PI))
            // .attr("d", d3.arc().outerRadius(radius + orbitWidth / 2).innerRadius(radius - orbitWidth / 2).startAngle(2 * Math.PI * i / orbitNum).endAngle(2 * Math.PI * (i + 1) / orbitNum))
            .style("fill", orbitCS(i));
        }
      }
      /**
       * 创建中心区域图
       *
       * @param {any} dom 操作区域
       * @param {any} value 可视化的数据
       * @param {any} fontSize 字体大小
       * @param {any} fontColor 字体颜色
       */
      function createRectArea(dom, value, fontSize, fontColor) {
        var nodeEnter = dom.selectAll('g.sun')
          .data(value)
          .enter()
          .append('g')
          .attr('class', 'sun')
          .attr('id', function (d, i) { return 'node-in_' + i; })
          .attr('transform', 'translate(0,0)');

        var nodeExit = dom.select('g.sun')
          .data(value)
          .exit()
          .remove();

        var nodeData = dom.select('g.sun')
          .data(value);

        nodeData.append("image")
          .attr('transform', 'translate(' + -centerImgWidth / 2 + ',' + -centerImgHeight / 2 + ')')
          .attr("width", centerImgWidth)
          .attr("height", centerImgHeight)
          .attr("xlink:href", function (d) { return d.img; });
        nodeData.append('text')
          .attr('class', 'sun_text')
          .attr('x', 0)
          .attr('y', centerImgHeight / 2 + 10)
          .attr('text-anchor', centerTextAnchor)
          .style('fill', fontColor)
          .style('font-size', function (d, i) { return fontSize; })
          .text(function (d) { return d.name; });
      }
      /**
       * 创建背景色
       *
       * @param {any} dom 操作区域
       * @param {any} innerRadius 内半径
       * @param {any} outerRadius 外半径
       * @param {any} bgColor 背景颜色
       * @param {any} zindex 背景ID
       */
      function createBackground(dom, innerRadius, outerRadius, bgColor, zindex) {
        dom.append("path")
          .attr('id', zindex)
          .attr('class', 'backgroundColorArc')
          .attr('fill', bgColor)
          .attr('d', d3.arc()({
            innerRadius: innerRadius,
            outerRadius: innerRadius,
            startAngle: 0,
            endAngle: 2 * Math.PI
          }))
          .transition()
          .duration(4000)
          .attr('d', d3.arc()({
            innerRadius: innerRadius,
            outerRadius: outerRadius,
            startAngle: 0,
            endAngle: 2 * Math.PI
          }))
          .style('fill', bgColor);
      }
      /**
       * 创建箭头
       *
       * @param {any} dom 操作区域
       */
      function createArrow(dom) {
        var defs = dom.append('defs');
        var arrowMarker = defs.append('marker')
          .attr('id', 'arrow')
          .attr('markerUnits', 'strokeWidth')
          .attr('markerWidth', '142')
          .attr('markerHeight', '12')
          .attr('viewBox', '0 0 12 12')
          .attr('refX', '6')
          .attr('refY', '6')
          .attr('orient', 'auto');
        var arrow_path = "M2,2 L10,6 L2,10 L6,6 L2,2";
        arrowMarker.append('path')
          .attr('d', arrow_path)
          .attr('fill', '#157d8e');
      }
    });
  }

  // Getter/setter function
  chart.width = function (_) {
    if (!arguments.length) {
      return width;
    }
    width = _;
    return chart;
  };
  chart.height = function (_) {
    if (!arguments.length) {
      return height;
    }
    height = _;
    return chart;
  };
  chart.backgroundColor = function (_) {
    if (!arguments.length) {
      return backgroundColor;
    }
    backgroundColor = _;
    return chart;
  };
  chart.value = function (_) {
    if (!arguments.length) {
      return value;
    }
    value = _;
    return chart;
  };
  chart.link = function (_) {
    if (!arguments.length) {
      return link;
    }
    link = _;
    return chart;
  };
  chart.centerImgWidth = function (_) {
    if (!arguments.length) {
      return centerImgWidth;
    }
    centerImgWidth = _;
    return chart;
  };
  chart.centerImgHeight = function (_) {
    if (!arguments.length) {
      return centerImgHeight;
    }
    centerImgHeight = _;
    return chart;
  };
  chart.imgWidth = function (_) {
    if (!arguments.length) {
      return imgWidth;
    }
    imgWidth = _;
    return chart;
  };
  chart.imgHeight = function (_) {
    if (!arguments.length) {
      return imgHeight;
    }
    imgHeight = _;
    return chart;
  };
  chart.isClockwise = function (_) {
    if (!arguments.length) {
      return isClockwise;
    }
    isClockwise = _;
    return chart;
  };
  chart.orbitColor = function (_) {
    if (!arguments.length) {
      return orbitColor;
    }
    orbitColor = _;
    return chart;
  };
  chart.orbitWidth = function (_) {
    if (!arguments.length) {
      return orbitWidth;
    }
    orbitWidth = _;
    return chart;
  };
  chart.trackBall = function (_) {
    if (!arguments.length) {
      return trackBall;
    }
    trackBall = _;
    return chart;
  };
  chart.ballSize = function (_) {
    if (!arguments.length) {
      return ballSize;
    }
    ballSize = _;
    return chart;
  };
  chart.isEquant = function (_) {
    if (!arguments.length) {
      return isEquant;
    }
    isEquant = _;
    return chart;
  };
  chart.ballTextOutSize = function (_) {
    if (!arguments.length) {
      return ballTextOutSize;
    }
    ballTextOutSize = _;
    return chart;
  };
  chart.ballTextOutColor = function (_) {
    if (!arguments.length) {
      return ballTextOutColor;
    }
    ballTextOutColor = _;
    return chart;
  };
  chart.firstQuadrantDominantBaseline = function (_) {
    if (!arguments.length) {
      return firstQuadrantDominantBaseline;
    }
    firstQuadrantDominantBaseline = _;
    return chart;
  };
  chart.firstQuadrantTextAnchor = function (_) {
    if (!arguments.length) {
      return firstQuadrantTextAnchor;
    }
    firstQuadrantTextAnchor = _;
    return chart;
  };
  chart.secondQuadrantDominantBaseline = function (_) {
    if (!arguments.length) {
      return secondQuadrantDominantBaseline;
    }
    secondQuadrantDominantBaseline = _;
    return chart;
  };
  chart.secondQuadrantTextAnchor = function (_) {
    if (!arguments.length) {
      return secondQuadrantTextAnchor;
    }
    secondQuadrantTextAnchor = _;
    return chart;
  };
  chart.thirdQuadrantDominantBaseline = function (_) {
    if (!arguments.length) {
      return thirdQuadrantDominantBaseline;
    }
    thirdQuadrantDominantBaseline = _;
    return chart;
  };
  chart.thirdQuadrantTextAnchor = function (_) {
    if (!arguments.length) {
      return thirdQuadrantTextAnchor;
    }
    thirdQuadrantTextAnchor = _;
    return chart;
  };
  chart.fourthQuadrantDominantBaseline = function (_) {
    if (!arguments.length) {
      return fourthQuadrantDominantBaseline;
    }
    fourthQuadrantDominantBaseline = _;
    return chart;
  };
  chart.fourthQuadrantTextAnchor = function (_) {
    if (!arguments.length) {
      return fourthQuadrantTextAnchor;
    }
    fourthQuadrantTextAnchor = _;
    return chart;
  };
  chart.radiusIn = function (_) {
    if (!arguments.length) {
      return radiusIn;
    }
    radiusIn = _;
    return chart;
  };
  chart.backgroundColorIn = function (_) {
    if (!arguments.length) {
      return backgroundColorIn;
    }
    backgroundColorIn = _;
    return chart;
  };
  chart.isClockwiseOut = function (_) {
    if (!arguments.length) {
      return isClockwiseOut;
    }
    isClockwiseOut = _;
    return chart;
  };
  chart.orbitColorOut = function (_) {
    if (!arguments.length) {
      return orbitColorOut;
    }
    orbitColorOut = _;
    return chart;
  };
  chart.orbitWidthOut = function (_) {
    if (!arguments.length) {
      return orbitWidthOut;
    }
    orbitWidthOut = _;
    return chart;
  };
  chart.trackBallOut = function (_) {
    if (!arguments.length) {
      return trackBallOut;
    }
    trackBallOut = _;
    return chart;
  };
  chart.ballSizeOut = function (_) {
    if (!arguments.length) {
      return ballSizeOut;
    }
    ballSizeOut = _;
    return chart;
  };
  chart.isEquantOut = function (_) {
    if (!arguments.length) {
      return isEquantOut;
    }
    isEquantOut = _;
    return chart;
  };
  chart.ballTextOutSizeOut = function (_) {
    if (!arguments.length) {
      return ballTextOutSizeOut;
    }
    ballTextOutSizeOut = _;
    return chart;
  };
  chart.ballTextOutColorOut = function (_) {
    if (!arguments.length) {
      return ballTextOutColorOut;
    }
    ballTextOutColorOut = _;
    return chart;
  };
  chart.firstQuadrantDominantBaselineOut = function (_) {
    if (!arguments.length) {
      return firstQuadrantDominantBaselineOut;
    }
    firstQuadrantDominantBaselineOut = _;
    return chart;
  };
  chart.firstQuadrantTextAnchorOut = function (_) {
    if (!arguments.length) {
      return firstQuadrantTextAnchorOut;
    }
    firstQuadrantTextAnchorOut = _;
    return chart;
  };
  chart.secondQuadrantDominantBaselineOut = function (_) {
    if (!arguments.length) {
      return secondQuadrantDominantBaselineOut;
    }
    secondQuadrantDominantBaselineOut = _;
    return chart;
  };
  chart.secondQuadrantTextAnchorOut = function (_) {
    if (!arguments.length) {
      return secondQuadrantTextAnchorOut;
    }
    secondQuadrantTextAnchorOut = _;
    return chart;
  };
  chart.thirdQuadrantDominantBaselineOut = function (_) {
    if (!arguments.length) {
      return thirdQuadrantDominantBaselineOut;
    }
    thirdQuadrantDominantBaselineOut = _;
    return chart;
  };
  chart.thirdQuadrantTextAnchorOut = function (_) {
    if (!arguments.length) {
      return thirdQuadrantTextAnchorOut;
    }
    thirdQuadrantTextAnchorOut = _;
    return chart;
  };
  chart.fourthQuadrantDominantBaselineOut = function (_) {
    if (!arguments.length) {
      return fourthQuadrantDominantBaselineOut;
    }
    fourthQuadrantDominantBaselineOut = _;
    return chart;
  };
  chart.fourthQuadrantTextAnchorOut = function (_) {
    if (!arguments.length) {
      return fourthQuadrantTextAnchorOut;
    }
    fourthQuadrantTextAnchorOut = _;
    return chart;
  };
  chart.radiusOut = function (_) {
    if (!arguments.length) {
      return radiusOut;
    }
    radiusOut = _;
    return chart;
  };
  chart.backgroundColorOut = function (_) {
    if (!arguments.length) {
      return backgroundColorOut;
    }
    backgroundColorOut = _;
    return chart;
  };

  return chart;


};
