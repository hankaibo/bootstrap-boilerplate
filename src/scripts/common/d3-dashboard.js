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

  // Private
  var tau = 2 * Math.PI;
  var pi = Math.PI;

  function chart(selection) {
    selection.each(function () {
      // svg区域
      var svg = d3.select(this).append('svg')
        .attr('width', width)
        .attr('height', height)
        .style('background-color', backgroundColor)
        .append('g')
        .attr('transform', 'translate(' + width / 2 + ',' + height / 1.3 + ')');
      // 中心区域
      createCenterArea(svg);
      // 创建轨道
      createOrbit(svg);


      function createOrbit(dom) {
        var arc = d3.arc()
          .outerRadius(300)
          .innerRadius(260)
          .startAngle(-pi / 2)
          .cornerRadius(50);
        var background = dom.append('path')
          .datum({ endAngle: pi / 2 })
          .style('fill', '#ddd')
          .attr('d', arc);
        var foreground = dom.append('path')
          .datum({ endAngle: -pi / 2 })
          .style('fill', 'orange')
          .attr('d', arc);

        foreground.transition()
          .duration(4000)
          .attrTween('d', arcTween(pi/2));

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
