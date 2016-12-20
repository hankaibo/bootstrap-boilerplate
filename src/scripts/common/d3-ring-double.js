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

  var lightEffectImg = '';
  var lightEffectWidth = 0;
  var lightEffectHeight = 0;

  // Private variables
  var centerValue = [];
  var valueOut = [];
  var valueIn = [];
  var linkOut = [];
  var linkIn = [];

  var a;
  var b;
  var c;
  var cosc;
  var hudu = 0;
  var X;
  var Y;
  var x;
  var y;

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
      // 分离出合适的数据数组
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
            // continue;
          }
        });
        valueOut.forEach(function (ele, ind) {
          if (ele.id == element.target) {
            linkOut.push(element);
            // continue;
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
      createOrbit(svg, radiusIn, orbitColorScaleIn, trackBall, orbitWidth, 4000);
      createOrbit(svg, radiusOut, orbitColorScaleOut, trackBallOut, orbitWidthOut, 8000);
      // 内外环轨道小圆
      if (value) {
        createCircle(svg, valueIn, trackBall, radiusIn, 'node-in', 'nodeText-in', ballSizeScaleIn, ballTextOutSize, ballTextOutColor, 3000);
        createCircle(svg, valueOut, trackBallOut, radiusOut, 'node-out', 'nodeText-out', ballSizeScaleOut, ballTextOutSizeOut, ballTextOutColorOut, 6000);
      }
      // 内外环轨道之间连接线
      createLine('sun', 'node-in', 'node-in-line', linkIn, 30, 20);
      d3.timeout(function () {
        createLine('node-in', 'node-out', 'node-out-line', linkOut, 20, 20);
      }, 4000);

      /**
       * 创建连接线
       *
       * @param {any} source 连接线起点
       * @param {any} target 连接线终点
       * @param {any} lineCss 连接线css
       * @param {any} value 可视化的数据
       * @param {any} sourceRadius 起点圆半径
       * @param {any} targetRadius 终点圆半径
       */
      function createLine(source, target, lineCss, value, sourceRadius, targetRadius) {
        var linkEnter = svg.selectAll('g.' + lineCss)
          .data(value)
          .enter()
          .append('g')
          .attr('class', lineCss)
          .attr('id', function (d, i) { return lineCss + '_' + (i + 1); });
        var linkExit = svg.selectAll('g.' + lineCss)
          .data(value)
          .exit()
          .remove();
        var linkData = svg.selectAll('g.' + lineCss)
          .data(value);

        linkData.each(function (d, i) {
          var linkLine = d3.select(this).append("line")
            .attr("stroke-width", 1.5)
            .attr("stroke", "#157d8e");
          var x1y1 = document.querySelector('#' + source + '_' + d.source).getAttribute('transform').substr(10).replace(')', '').split(',');
          var x2y2 = document.querySelector('#' + target + '_' + d.target).getAttribute('transform').substr(10).replace(')', '').split(',');
          var x1 = parseFloat(x1y1[0]);
          var y1 = parseFloat(x1y1[1]);
          var x2 = parseFloat(x2y2[0]);
          var y2 = parseFloat(x2y2[1]);
          var hypotenuse = Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
          var offx1 = (x2 - x1) / hypotenuse * sourceRadius;
          var offy1 = (y2 - y1) / hypotenuse * sourceRadius;
          var offx2 = (x2 - x1) / hypotenuse * targetRadius;
          var offy2 = (y2 - y1) / hypotenuse * targetRadius;
          var x1out = parseFloat(x1) + offx1;
          var y1out = parseFloat(y1) + offy1;
          var x2out = parseFloat(x2) - offx2;
          var y2out = parseFloat(y2) - offy2;

          var hudu = Math.atan2((y2 - y1), (x2 - x1));
          var jiaodu = hudu * 180 / Math.PI;

          linkLine
            .attr('x1', x1out)
            .attr('y1', y1out)
            .attr('x2', x1out)
            .attr('y2', y1out)
            .attr("marker-end", "url(#arrow)")
            .transition()
            .ease(d3.easePoly.exponent(2))
            .duration(3000)
            .attr('x1', x1out)
            .attr('y1', y1out)
            .attr('x2', x2out)
            .attr('y2', y2out);

          var svg_mark = svg
            .append('g')
            .attr('transform', 'rotate(' + (jiaodu + 180) + ')');
          svg_mark
            .append('image')
            .attr('xlink:href', lightEffectImg)
            .attr('transform', 'translate(' + (-lightEffectWidth / 2) + ',' + (-lightEffectHeight / 2) + ')');
          svg_mark.append("animateMotion")
            .attr("path", function (d) {
              return "M" + x1out + "," + y1out + "L" + x2out + "," + y2out;
            })
            .attr("dur", "4s")
            .attr("begin", "0s")
            .attr("repeatCount", "indefinite");

        })

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
      function createCircle(dom, value, ballSum, radius, nodeClass, nodeTextClass, ballSizeScale, fontSize, fontColor, delay) {
        var halfBallSum = (value.length) / 2;
        var nodeEnter = dom.selectAll('g.' + nodeClass)
          .data(value)
          .enter()
          .append('g')
          .attr('class', nodeClass)
          .attr('opacity', '0')
          .attr('id', function (d, i) {
            return nodeClass + '_' + d.id;
          })
          .transition()
          .ease(d3.easePoly.exponent(2))
          .duration(4000)
          .delay(delay)
          .attr('opacity', '1');

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
          d3.select(this).attr('transform', 'translate(' + X + ',' + -Y + ')');

          x = Math.sin(isClockwise ? (2 * Math.PI - hudu) : hudu) * ballSizeScale(i) / 2;
          y = Math.cos(isClockwise ? (2 * Math.PI - hudu) : hudu) * ballSizeScale(i) / 2;
          var nodeTextOut = d3.select(this)
            .select('text.' + nodeTextClass);
          if (i <= 3) {
            nodeTextOut.attr('transform', 'translate(' + -x + ',' + -(y + (3 - i) * 10) + ')');
          } else if (i > (halfBallSum - 2) && i <= (halfBallSum + 2)) {
            nodeTextOut.attr('transform', 'translate(' + -x + ',' + -(y + (halfBallSum - i) * 10) + ')');
          } else {
            nodeTextOut.attr('transform', 'translate(' + -x + ',' + -y + ')');
          }
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
            execTextOfcircleLayout(dom, 'text-before-edge', 'start');
          } else if (hudu == Math.PI * .5) {
            execTextOfcircleLayout(dom, 'text-before-edge', 'start');
          } else if (hudu == Math.PI * 1) {
            execTextOfcircleLayout(dom, 'text-after-edge', 'middle');
          } else if (hudu == Math.PI * 1.5) {
            execTextOfcircleLayout(dom, 'text-after-edge', 'end');
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
      function createOrbit(dom, radius, orbitCS, orbitNum, orbitWidth, delay) {
        for (var i = 0; i < 1; i++) {
          // for (var i = 0; i < orbitNum; i++) {
          dom.append("path")
            .attr("class", "earthOrbitPosition")
            .attr("d", d3.arc().outerRadius(radius + orbitWidth / 2).innerRadius(radius - orbitWidth / 2).startAngle(0).endAngle(2 * Math.PI))
            // .attr("d", d3.arc().outerRadius(radius + orbitWidth / 2).innerRadius(radius - orbitWidth / 2).startAngle(2 * Math.PI * i / orbitNum).endAngle(2 * Math.PI * (i + 1) / orbitNum))
            .style("fill", orbitCS(i))
            .attr('opacity', '0')
            .transition()
            .duration(4000)
            .delay(delay)
            .attr('opacity', '1');
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
          .attr('id', function (d, i) { return 'sun_' + i; })
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
  chart.centerTxtOutSize = function (_) {
    if (!arguments.length) {
      return centerTxtOutSize;
    }
    centerTxtOutSize = _;
    return chart;
  };
  chart.centerTextOutColor = function (_) {
    if (!arguments.length) {
      return centerTextOutColor;
    }
    centerTextOutColor = _;
    return chart;
  };
  chart.centerTextDominantBaseline = function (_) {
    if (!arguments.length) {
      return centerTextDominantBaseline;
    }
    centerTextDominantBaseline = _;
    return chart;
  };
  chart.centerTextAnchor = function (_) {
    if (!arguments.length) {
      return centerTextAnchor;
    }
    centerTextAnchor = _;
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
  chart.lightEffectImg = function (_) {
    if (!arguments.length) {
      return lightEffectImg;
    }
    lightEffectImg = _;
    return chart;
  };
  chart.lightEffectWidth = function (_) {
    if (!arguments.length) {
      return lightEffectWidth;
    }
    lightEffectWidth = _;
    return chart;
  };
  chart.lightEffectHeight = function (_) {
    if (!arguments.length) {
      return lightEffectHeight;
    }
    lightEffectHeight = _;
    return chart;
  };

  return chart;


};
