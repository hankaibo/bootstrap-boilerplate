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
  var transitonTime = 1000;

  // Private
  var tau = 2 * Math.PI;
  var pi = Math.PI;

  function chart(selection) {
    selection.each(function () {
      var colors = d3.scaleOrdinal(d3.schemeCategory20);
      // svg区域
      var svg = d3.select(this).append('svg')
        .attr('width', width)
        .attr('height', height)
        .style('background-color', backgroundColor)
        .append('g')
        .attr('transform', 'translate(' + width / 2 + ',' + height / 1.3 + ')');
      // 箭头
      createArrow(svg);
      // 中心区域
      createCenterArea(svg);
      //
      ceateInOrbit(svg);
      // 创建轨道
      createOrbit(svg);

      svg.selectAll('path.arc')
        .sort(function (a, b) {
          return 1;
        });

      // 创建轨道
      function createOrbit(dom) {
        var arc = d3.arc()
          .outerRadius(300)
          .innerRadius(260)
          .cornerRadius(50);

        var background = dom.append('path')
          .style('fill', '#ddd')
          .attr('d', arc({ startAngle: -pi / 2, endAngle: pi / 2 }));

        var dataInit = [
          { startAngle: -pi / 2, endAngle: -pi / 2 },
          { startAngle: -pi / 4, endAngle: -pi / 4 },
          { startAngle: 0, endAngle: 0 },
          { startAngle: pi / 4, endAngle: pi / 4 }
        ];
        var data = [
          { startAngle: -pi / 2, endAngle: -pi / 4 },
          { startAngle: -pi / 4, endAngle: 0 },
          { startAngle: 0, endAngle: pi / 4 },
          { startAngle: pi / 4, endAngle: pi / 2 }
        ];
        var foreground = dom.selectAll('path.arc')
          .data(dataInit)
          .enter()
          .append('path')
          .attr('class', 'arc')
          .attr('id', function (d, i) {
            return i;
          })
          .style('fill', function (d, i) {
            return colors(i)
          })
          .attr('d', function (d, i) {
            return arc(d)
          });

        foreground.each(function (d, i) {
          d3.select(this)
            .transition()
            .duration(transitonTime)
            .delay(transitonTime * i)
            .attrTween('d', arcTween(data[i].endAngle));
        });


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
      function ceateInOrbit(dom) {
        var arc = d3.arc()
          .outerRadius(250)
          .innerRadius(245)
          .startAngle(-pi / 2)
          .cornerRadius(10);

        var background = dom.append('path')
          .attr('class', 'in-arc')
          .datum({ endAngle: -pi / 2 })
          .style('fill', '#ddd')
          .attr('d', arc)
          .transition()
          .duration(transitonTime * 2)
          .attrTween('d', arcTween(pi / 2));

        dom.append('line')
          .attr('stroke-with', 1.5)
          .attr('stroke', d3.hsl(188, .85, .56, .3))
          .attr('x1', 0)
          .attr('y1', 0)
          .attr('x2', 245)
          .attr('y2', 0)
          .attr('marker-end', 'url(#arrow)')
        transition()
          .duration(animateTime)
          .attr('x1', 0)
          .attr('y1', 0)
          .attr('x2', x2out)
          .attr('y2', y2out);

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

        textArea.append('text')
          .attr('class', 'center-text-value')
          .attr('x', -50)
          .attr('y', -100)
          .style('font-size', 48)
          .attr('fill', 'green')
          .text('AAAAAAAAAA');

        textArea.append('text')
          .attr('class', 'center-text-title')
          .attr('x', -50)
          .attr('y', -50)
          .style('font-size', 48)
          .attr('fill', 'red')
          .text('BBBBBBBBBBBBB');
      }

      /**
       * 创建三角形
       *
       * @param {any} dom 操作区域
       */
      function createArrow(dom) {
        var defs = dom.append('defs');
        var arrowMarker = defs.append('marker')
          .attr('id', 'arrow')
          .attr('markerUnits', 'strokeWidth')
          .attr('markerWidth', '10')
          .attr('markerHeight', '10')
          .attr('refX', '0')
          .attr('refY', '3')
          .attr('orient', 'auto');
        var arrow_path = "M0,0 L0,6 L9,3 z";
        arrowMarker.append('path')
          .attr('d', arrow_path)
          .attr('fill', d3.hsl(188, .85, .56, .3));
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

  return chart;
};
