/**
 * 本模块来源于http://bl.ocks.org/clayzermk1/9142407和http://bl.ocks.org/mbostock/4063269，对其进行v4改造。
 */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['d3'], factory);
  } else if (typeof exports === 'object' && module.exports) {
    module.exports = factory(require('d3'));
  } else {
    root.returnExports = factory(root.d3);
  }
} (this, function (d3) {
  // exposed methods
  function Circle() {
    'use strict';
    var dataset = {
      nodes: [
        { name: 'AdamAdamAdamAdamAdamAdamAdamAdamAdamAdam' },
        { name: 'BobBobBobBobBobBobBobBobBobBobBobBobBob' }
      ]
    };
    // Public variables width default settings
    var width = 960,
      height = 960,
      value,
      backgroundColor = '#333',
      orbitColor = 'rgba(255, 204, 0, 0.75)';
    // Private variables
    var radius = Math.min(width, height),
      radii = {
        'sun': radius / 8,
        'earthOrbit': radius / 2.5,
        'earth': radius / 32,
        'rect': Math.sqrt(Math.pow(radius * .8, 2) / 2)
      },
      top10 = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
      format = d3.format(',d'),
      color = d3.scaleOrdinal(d3.schemeCategory20c);
    var parseTime = d3.timeParse('%d-%b-%y');

    function circle(selection) {
      selection.each(function () {
        // Space
        var svg = d3.select(this).append('svg')
          .attr('width', width)
          .attr('height', height)
          .style('background-color', backgroundColor)
          .append('g')
          .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

        // Sun
        var sun;
        if (22 == 2) {

          sun = svg.append('g').append('circle')
            .attr('class', 'sun')
            .attr('r', radii.sun)
            .style('fill', 'rgba(255, 204, 0, 1.0)');
        }
        // Rect
        var myrect = svg.append('g')
          .attr('class', 'myrect')
          .attr('transform', 'translate(' + -radii.rect / 2 + ',' + -radii.rect / 2 + ')');

        var svg2 = d3.select("svg .myrect"),
          margin2 = { top: 20, right: 20, bottom: 30, left: 50 },
          width2 = radii.rect - margin2.left - margin2.right,
          height2 = radii.rect - margin2.top - margin2.bottom,
          g = svg2.append("g");

        var parseTime = d3.timeParse("%d-%b-%y");

        var x = d3.scaleTime()
          .rangeRound([0, width2]);

        var y = d3.scaleLinear()
          .rangeRound([height2, 0]);

        var line = d3.line()
          .x(function (d) { return x(d.date); })
          .y(function (d) { return y(d.close); });


        d3.tsv("/scripts/data/line_chart.tsv", function (d) {
          d.date = parseTime(d.date);
          d.close = +d.close;
          return d;
        }, function (error, data) {
          if (error) throw error;

          x.domain(d3.extent(data, function (d) { return d.date; }));
          y.domain(d3.extent(data, function (d) { return d.close; }));

          g.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + height2 + ")")
            .call(d3.axisBottom(x));

          g.append("g")
            .attr("class", "axis axis--y")
            .call(d3.axisLeft(y))
            .append("text")
            .attr("fill", "#000")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "0.71em")
            .style("text-anchor", "end")
            .text("Price ($)");

          g.append("path")
            .datum(data)
            .attr("class", "line")
            .attr("d", line);
        });


        // Earth's orbit
        svg.append('circle')
          .attr('class', 'earthOrbit')
          .attr('r', radii.earthOrbit)
          .style('fill', 'none')
          .style('stroke', orbitColor);

        // Current position of Earth in its orbit
        var earthOrbitPosition = d3.arc()
          .outerRadius(radii.earthOrbit + 1)
          .innerRadius(radii.earthOrbit - 1)
          .startAngle(0)
          .endAngle(0);

        svg.append('path')
          .attr('id', function (d, i) {
            return 'edgepath' + i;
          })
          .attr('class', 'earthOrbitPosition')
          .attr('d', earthOrbitPosition)
          .style('fill', orbitColor);

        var textOrbitPosition = d3.arc()
          .outerRadius(radii.earthOrbit + 5)
          .innerRadius(radii.earthOrbit - 5)
          .startAngle(4)
          .endAngle(6);

        // Pack pie

        if (value) {
          getData(value);
        }

        function getData(data) {
          d3.csv('/scripts/data/data.csv', function (d) {
            d.value = +d.value;
            if (d.value) return d;
          }, function (error, classes) {
            if (error) {
              throw error;
            }
            createRightCircle(data);
            createLeftText(data);
          });
        }

        function createRightCircle(data) {
          var pack = d3.pack().size([width, height]).padding(1);
          var root = d3.hierarchy({ children: data })
            .sum(function (d) {
              return d.value;
            })
            .each(function (d) {
              if (id = d.data.id) {
                var id, i = id.lastIndexOf('.');
                d.id = id;
                d.package = id.slice(0, i);
                d.class = id.slice(i + 1);
                d.name = d.data.name;
              }
            });

          var node = svg.selectAll('.node')
            .data(pack(root).leaves())
            .enter()
            .append('g')
            .attr('class', 'node');
          node.append('circle')
            .attr('id', function (d) { return d.id; })
            .attr('r', function (d, i) { return (radius / 32 + top10[i] * 2); })
            .style('fill', function (d) { return color(d.package); });
          node.append('clipPath')
            .attr('id', function (d) { return 'clip-' + d.id; })
            .append('use')
            .attr('xlink:href', function (d) { return '#' + d.id; });
          node.append('text')
            .attr('clip-path', function (d) { return 'url(#clip-' + d.id + ')'; })
            .selectAll('tspan')
            .data(function (d) { return d.class.split(/(?=[A-Z][^A-Z])/g); })
            .enter()
            .append('tspan')
            .attr('x', 0)
            .attr('y', function (d, i, nodes) { return 13 + (i - nodes.length / 2 - 0.5) * 10; })
            .style('fill', 'white')
            .text(function (d) { return d; });
          node.append('title')
            .text(function (d) { return d.id + '\n' + format(d.value); });
          // TODO start
          node.append('text')
            .attr('clip-path', function (d) { return 'url(#sub-clip-' + d.id + ')'; })
            .selectAll('tspan')
            .data(function (d) { return d.class.split(/(?=[A-Z][^A-Z])/g); })
            .enter()
            .append('tspan')
            .attr('x', function (d, i, nodes) { return this.parentNode.parentElement.childNodes[0]['r']['baseVal'].value + 10; })
            .attr('y', function (d, i, nodes) { return 13 + (i - nodes.length / 2 - 0.5) * 10; })
            .style('fill', 'white')
            .text(function (d) { return d.name; });
          // TODO end

          node.each(function (d, i) {
            var pos = 0;
            while (i >= 0) {
              pos += 2 * Math.PI * (radius / 32 + top10[i] * 2)
              i--;
            }
            var interpolateEarthOrbitPosition = d3.interpolate(earthOrbitPosition.endAngle()(), pos / (2 * Math.PI * radii.earthOrbit));

            d3.select(this).attr('transform', 'translate(' + radii.earthOrbit * Math.sin(interpolateEarthOrbitPosition(3) - earthOrbitPosition.startAngle()()) + ',' + -radii.earthOrbit * Math.cos(interpolateEarthOrbitPosition(3) - earthOrbitPosition.startAngle()()) + ')');


            d3.select(this).on('click', function () {
              console.log('click');
            });
          });

        }

        function createLeftText(data) {
          var circleText = svg.append('g')
            .attr('class', 'circleText');

          circleText.append('defs').append('path')
            .attr('id', 'curve')
            .attr('d', textOrbitPosition)
            .style('fill', 'red');
          circleText.append('text')
            .attr('id', 'curve-text')
            .style('fill', 'steelblue')
            .style('font-size', '24')
            .style('font-weight', 'bold')
            .append('textPath')
            .attr('xlink:href', '#curve')
            .text('.text熟字');

          circleText.append('use')
            .attr('id', 'curve-line')
            .attr('xlink:href', '#curve')
        }

      });
    }

    // Getter/setter function
    circle.width = function (_) {
      if (!arguments.length) {
        return width;
      }
      width = _;
      return circle;
    }
    circle.height = function (_) {
      if (!arguments.length) {
        return height;
      }
      height = _;
      return circle;
    }
    circle.value = function (_) {
      if (!arguments.length) {
        return value;
      }
      // TODO
      value = _;
      return circle;
    }
    circle.backgroundColor = function (_) {
      if (!arguments.backgroundColor) {
        return backgroundColor;
      }
      backgroundColor = _;
      return circle;
    }
    circle.orbitColor = function (_) {
      if (!arguments.orbitColor) {
        return orbitColor;
      }
      orbitColor = _;
      return circle;
    }

    return circle;
  }

  return d3.Circle = Circle;
}));
