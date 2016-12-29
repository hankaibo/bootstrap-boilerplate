/**
 * @author hankaibo
 */
var d3 = require('d3');
exports = module.exports = function () {
  'use strict';
  // Public variables with default settings
  var width = 720;
  var height = 720;
  var backgroundColor = '#fff';
  var transitonTime = 2000;

  var centerTextValue = 82;
  var centerTextValueFontSize = '24';
  var centerTextValueColor = 'green';
  var centerTextValueTextAnchor = 'middle';
  var centerTextValueX = 0;
  var centerTextValueY = -50;
  var centerArrowLineStrokeWidth = 3;
  var centerArrowLineStroke = 'red';
  var centerArrowLineX1 = 35;
  var centerArrowLineY1 = -50;
  var centerArrowLineX2 = 35;
  var centerArrowLineY2 = -70;
  var centerTextTitle = '良';
  var centerTextTitleFontSize = '24';
  var centerTextTitleColor = 'red';
  var centerTextTitleTextAnchor = 'middle';
  var centerTextTitleX = 0;
  var centerTextTitleY = 0;

  var outerRadiusIn = 250;
  var innerRadiusIn = 245;
  var startAngleIn = -Math.PI / 2;
  var endAngleIn = Math.PI / 2;
  var cornerRadiusIn = 10;
  var orbitColorIn = '#ddd';

  var outerRadiusOut = 300;
  var innerRadiusOut = 260;
  var startAngleOut = -Math.PI / 2;
  var endAngleOut = Math.PI / 2;
  var cornerRadiusOut = 50;
  var orbitBackgroundColorOut = '#ddd';
  var orbitColorOut = 'orange';

  var lightEffectImg = '';
  var lightEffectWidth = 0;
  var lightEffectHeight = 0;


  // Private
  var tau = 2 * Math.PI;
  var pi = Math.PI;
  var p = d3.precisionFixed(0.05);
  var formatPost = d3.format('.' + p + 'f');

  function chart(selection) {
    selection.each(function () {
      var scaleOrbitIn = d3.scaleLinear()
        .domain([0, 100])
        .range([startAngleIn, endAngleIn]);
      // svg区域
      var svg = d3.select(this).append('svg')
        .attr('width', width)
        .attr('height', height)
        .style('background-color', backgroundColor)
        .append('g')
        .attr('transform', 'translate(' + width / 2 + ',' + height / 1.3 + ')');
      // 三角形
      createArrow(svg);
      // 中心区域
      createCenterArea(svg);
      // 创建内轨道
      ceateOrbitIn(svg);
      // 创建外轨道
      createOrbitOut(svg);
      // 创建刻度
      createScale(svg);


      svg.selectAll('path.arc')
        .sort(function (a, b) {
          return 1;
        });
      // 创建刻度
      function createScale(dom) {
        var radius = 320;
        var arc = d3.arc()
          .outerRadius(320)
          .innerRadius(310)
          .startAngle(-pi / 2)
          .endAngle(pi / 2)
          .cornerRadius(10);

        var gr = dom.append('g')
          .attr('class', 'r axis')
          .append('g');
        gr.append('path')
          .style('fill', '#ddd')
          .attr('d', arc);

        var ga = dom.append('g')
          .attr('class', 'a axis')
          .selectAll('g')
          .data(d3.range(0, 180, 3))
          .enter()
          .append('g')
          .attr('transform', function (d) { return 'rotate(' + -(180 - d) + ')'; });

        ga.append('text')
          .attr('x', radius + 6)
          .attr('dy', '.35em')
          .style('text-anchor', function (d) {
            return d > 0 && d < 90 ? 'end' : null;
          })
          .attr('transform', function (d) {
            return d > 0 && d < 90 ? 'rotate(180 ' + (radius + 6) + ',0)' : null;
          })
          .text(function (d) { return d; });


      }

      // 创建轨道
      function createOrbitOut(dom) {
        var arc = d3.arc()
          .outerRadius(outerRadiusOut)
          .innerRadius(innerRadiusOut)
          .startAngle(startAngleOut)
          .cornerRadius(cornerRadiusOut);

        var background = dom.append('path')
          .datum({ endAngle: endAngleOut })
          .style('fill', orbitBackgroundColorOut)
          .attr('d', arc);

        var foreground = dom.append('path')
          .datum({ endAngle: startAngleOut })
          .attr('class', 'arc')
          .style('fill', orbitColorOut)
          .attr('d', arc);

        foreground.transition()
          .duration(transitonTime)
          .attrTween('d', arcTween(endAngleOut));

        function arcTween(newAngle) {
          return function (d) {
            var interpolate = d3.interpolate(d.endAngle, newAngle);
            return function (t) {
              d.endAngle = interpolate(t);
              return arc(d);
            }
          }
        }

      }

      // 创建内轨
      function ceateOrbitIn(dom) {
        var arc = d3.arc()
          .outerRadius(outerRadiusIn)
          .innerRadius(innerRadiusIn)
          .startAngle(startAngleIn)
          .cornerRadius(cornerRadiusIn);

        dom.append('path')
          .attr('class', 'in-arc')
          .datum({ endAngle: startAngleIn })
          .style('fill', orbitColorIn)
          .attr('d', arc)
          .transition()
          .duration(transitonTime)
          .attrTween('d', arcTween(endAngleIn));

        var x2 = Math.sin(scaleOrbitIn(centerTextValue)) * outerRadiusIn;
        var y2 = Math.cos(scaleOrbitIn(centerTextValue)) * outerRadiusIn;

        var svg_mark = dom
          .append('g')
          // .attr('transform', 'rotate(' + (180) + ')');
          .attr('transform', 'translate(' + x2 + ',' + y2 + ')');
        svg_mark
          .append('image')
          .attr('xlink:href', lightEffectImg)
          .attr('transform', 'translate(' + (-lightEffectWidth / 2) + ',' + (-lightEffectHeight / 2) + ')');
        svg_mark.append('animateMotion')
          .attr('path', function (d) {
            return arc({endAngle:endAngleOut});
          })
          .attr('dur', 20)
          .attr('begin', '0s')
          .attr('repeatCount', 1);

        // dom.append('line')
        //   .attr('stroke-with', 10)
        //   .attr('stroke', '#ddd')
        //   .attr('x1', 0)
        //   .attr('y1', 0)
        //   .attr('x2', -innerRadiusIn)
        //   .attr('y2', 0)
        //   .attr('marker-end', 'url(#marker-arrow)')
        //   .transition()
        //   .duration(transitonTime)
        //   .attr('x1', 0)
        //   .attr('y1', 0)
        //   .attr('x2', x2)
        //   .attr('y2', -y2);

        function arcTween(newAngle) {
          return function (d) {
            var interpolate = d3.interpolate(d.endAngle, newAngle);
            return function (t) {
              d.endAngle = interpolate(t);
              return arc(d);
            }
          }
        }

      }

      // 创建中心区域图
      function createCenterArea(dom) {
        var textArea = dom.append('g')
          .attr('class', 'center-text');

        var lineFirst = textArea.append('g');
        var lineSecond = textArea.append('g');

        lineFirst.append('text')
          .attr('class', 'center-text-value')
          .attr('x', centerTextValueX)
          .attr('y', centerTextValueY)
          .attr('fill', centerTextValueColor)
          .style('font-size', centerTextValueFontSize)
          .style('text-anchor', centerTextValueTextAnchor)
          .text(formatPost(centerTextValue));
        lineFirst.append('g')
          .append('line')
          .attr('stroke-width', centerArrowLineStrokeWidth)
          .attr('stroke', centerArrowLineStroke)
          .attr('x1', centerArrowLineX1)
          .attr('y1', centerArrowLineY1)
          .attr('x2', centerArrowLineX2)
          .attr('y2', centerArrowLineY2)
          .attr('marker-end', 'url(#marker-arrow)');

        lineSecond.append('text')
          .attr('class', 'center-text-title')
          .attr('x', centerTextTitleX)
          .attr('y', centerTextTitleY)
          .attr('fill', centerTextTitleColor)
          .style('font-size', centerTextTitleFontSize)
          .style('text-anchor', centerTextTitleTextAnchor)
          .text(centerTextTitle);
      }

      /**
       * 创建三角形
       *
       * @param {any} dom 操作区域
       */
      function createArrow(dom) {
        var defs = dom.append('defs');
        var arrowMarker = defs.append('marker')
          .attr('id', 'marker-arrow')
          .attr('markerUnits', 'strokeWidth')
          .attr('markerWidth', '13')
          .attr('markerHeight', '13')
          .attr('refX', '2')
          .attr('refY', '6')
          .attr('orient', 'auto');
        var arrow_path = 'M2,2 L2,11 L10,6 L2,2';
        arrowMarker.append('path')
          .attr('d', arrow_path)
          .attr('fill', '#000');
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
  chart.transitonTime = function (_) {
    if (!arguments.length) {
      return transitonTime;
    }
    transitonTime = _;
    return chart;
  };
  chart.centerTextValue = function (_) {
    if (!arguments.length) {
      return centerTextValue;
    }
    centerTextValue = _;
    return chart;
  };
  chart.centerTextValueFontSize = function (_) {
    if (!arguments.length) {
      return centerTextValueFontSize;
    }
    centerTextValueFontSize = _;
    return chart;
  };
  chart.centerTextValueColor = function (_) {
    if (!arguments.length) {
      return centerTextValueColor;
    }
    centerTextValueColor = _;
    return chart;
  };
  chart.centerTextValueTextAnchor = function (_) {
    if (!arguments.length) {
      return centerTextValueTextAnchor;
    }
    centerTextValueTextAnchor = _;
    return chart;
  };
  chart.centerTextValueX = function (_) {
    if (!arguments.length) {
      return centerTextValueX;
    }
    centerTextValueX = _;
    return chart;
  };
  chart.centerTextValueY = function (_) {
    if (!arguments.length) {
      return centerTextValueY;
    }
    centerTextValueY = _;
    return chart;
  };
  chart.centerArrowLineStrokeWidth = function (_) {
    if (!arguments.length) {
      return centerArrowLineStrokeWidth;
    }
    centerArrowLineStrokeWidth = _;
    return chart;
  };
  chart.centerArrowLineStroke = function (_) {
    if (!arguments.length) {
      return centerArrowLineStroke;
    }
    centerArrowLineStroke = _;
    return chart;
  };
  chart.centerArrowLineX1 = function (_) {
    if (!arguments.length) {
      return centerArrowLineX1;
    }
    centerArrowLineX1 = _;
    return chart;
  };
  chart.centerArrowLineY1 = function (_) {
    if (!arguments.length) {
      return widcenterArrowLineY1th;
    }
    centerArrowLineY1 = _;
    return chart;
  };
  chart.centerArrowLineX2 = function (_) {
    if (!arguments.length) {
      return centerArrowLineX2;
    }
    centerArrowLineX2 = _;
    return chart;
  };
  chart.centerArrowLineY2 = function (_) {
    if (!arguments.length) {
      return centerArrowLineY2;
    }
    centerArrowLineY2 = _;
    return chart;
  };
  chart.centerTextTitle = function (_) {
    if (!arguments.length) {
      return centerTextTitle;
    }
    centerTextTitle = _;
    return chart;
  };
  chart.centerTextTitleFontSize = function (_) {
    if (!arguments.length) {
      return centerTextTitleFontSize;
    }
    centerTextTitleFontSize = _;
    return chart;
  };
  chart.centerTextTitleColor = function (_) {
    if (!arguments.length) {
      return centerTextTitleColor;
    }
    centerTextTitleColor = _;
    return chart;
  };
  chart.centerTextTitleTextAnchor = function (_) {
    if (!arguments.length) {
      return centerTextTitleTextAnchor;
    }
    centerTextTitleTextAnchor = _;
    return chart;
  };
  chart.centerTextTitleX = function (_) {
    if (!arguments.length) {
      return centerTextTitleX;
    }
    centerTextTitleX = _;
    return chart;
  };
  chart.centerTextTitleY = function (_) {
    if (!arguments.length) {
      return centerTextTitleY;
    }
    centerTextTitleY = _;
    return chart;
  };
  chart.outerRadiusIn = function (_) {
    if (!arguments.length) {
      return outerRadiusIn;
    }
    outerRadiusIn = _;
    return chart;
  };
  chart.innerRadiusIn = function (_) {
    if (!arguments.length) {
      return innerRadiusIn;
    }
    innerRadiusIn = _;
    return chart;
  };
  chart.startAngleIn = function (_) {
    if (!arguments.length) {
      return startAngleIn;
    }
    startAngleIn = _;
    return chart;
  };
  chart.endAngleIn = function (_) {
    if (!arguments.length) {
      return endAngleIn;
    }
    endAngleIn = _;
    return chart;
  };
  chart.cornerRadiusIn = function (_) {
    if (!arguments.length) {
      return cornerRadiusIn;
    }
    cornerRadiusIn = _;
    return chart;
  };
  chart.orbitColorIn = function (_) {
    if (!arguments.length) {
      return orbitColorIn;
    }
    orbitColorIn = _;
    return chart;
  };
  chart.outerRadiusOut = function (_) {
    if (!arguments.length) {
      return outerRadiusOut;
    }
    outerRadiusOut = _;
    return chart;
  };
  chart.innerRadiusOut = function (_) {
    if (!arguments.length) {
      return innerRadiusOut;
    }
    innerRadiusOut = _;
    return chart;
  };
  chart.startAngleOut = function (_) {
    if (!arguments.length) {
      return startAngleOut;
    }
    startAngleOut = _;
    return chart;
  };
  chart.endAngleOut = function (_) {
    if (!arguments.length) {
      return endAngleOut;
    }
    endAngleOut = _;
    return chart;
  };
  chart.cornerRadiusOut = function (_) {
    if (!arguments.length) {
      return cornerRadiusOut;
    }
    cornerRadiusOut = _;
    return chart;
  };
  chart.orbitBackgroundColorOut = function (_) {
    if (!arguments.length) {
      return orbitBackgroundColorOut;
    }
    orbitBackgroundColorOut = _;
    return chart;
  };
  chart.orbitColorOut = function (_) {
    if (!arguments.length) {
      return orbitColorOut;
    }
    orbitColorOut = _;
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
