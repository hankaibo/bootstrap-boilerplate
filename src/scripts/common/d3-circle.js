/**
 * 本模块来源于http://bl.ocks.org/clayzermk1/9142407和http://bl.ocks.org/mbostock/4063269，对其进行v4改造。
 */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['d3'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('d3'));
  } else {
    root.returnExports = factory(root.d3);
  }
} (this, function (d3) {
  // exposed methods
  function circle() {
    "use strict";
    // Public variables width default settings
    var width = 960,
      height = 960,
      value,
      backgroundColor = '#333',
      orbitColor = 'rgba(255, 204, 0, 0.75)';
    // Private variables
    var radius = Math.min(width, height),
      radii = {
        "sun": radius / 8,
        "earthOrbit": radius / 2.5,
        "earth": radius / 32,
      },
      top10 = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
      format = d3.format(",d"),
      color = d3.scaleOrdinal(d3.schemeCategory20c);

    function circle(selection) {
      selection.each(function () {
        // Space
        var svg = d3.select(this).append("svg")
          .attr("width", width)
          .attr("height", height)
          .style('background-color', backgroundColor)
          .append("g")
          .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        // Sun
        svg.append("circle")
          .attr("class", "sun")
          .attr("r", radii.sun)
          .style("fill", "rgba(255, 204, 0, 1.0)");

        // Earth's orbit
        svg.append("circle")
          .attr("class", "earthOrbit")
          .attr("r", radii.earthOrbit)
          .style("fill", "none")
          .style("stroke", orbitColor);

        // Current position of Earth in its orbit
        var earthOrbitPosition = d3.arc()
          .outerRadius(radii.earthOrbit + 1)
          .innerRadius(radii.earthOrbit - 1)
          .startAngle(0)
          .endAngle(0);
        // TODO remove? 在轨道上再绘一条线
        svg.append("path")
          .attr("class", "earthOrbitPosition")
          .attr("d", earthOrbitPosition)
          .style("fill", orbitColor);

        // Pack pie
        var pack = d3.pack().size([width, height]).padding(1);

        if (value) {
          getData(value);
        }

        function getData(data) {
          d3.csv("/scripts/data/data.csv", function (d) {
            d.value = +d.value;
            if (d.value) return d;
          }, function (error, classes) {
            if (error) {
              throw error;
            }
            // console.log('data[' + data + ']');
            // console.log('classes[' + classes + ']');
            createCirclePack(data);
          });
        }

        function createCirclePack(data) {
          var root = d3.hierarchy({ children: data })
            .sum(function (d) {
              // console.log(d);
              return d.value;
            })
            .each(function (d) {
              // console.log(d);
              if (id = d.data.id) {
                var id, i = id.lastIndexOf(".");
                d.id = id;
                d.package = id.slice(0, i);
                d.class = id.slice(i + 1);
                d.name = d.data.name;
              }
            });

          var node = svg.selectAll(".node")
            .data(pack(root).leaves())
            .enter().append("g")
            .attr("class", "node");
          node.append("circle")
            .attr("id", function (d) { return d.id; })
            .attr("r", function (d, i) {
              return (radius / 32 + top10[i] * 2);
            })
            .style("fill", function (d) { return color(d.package); });

          node.append("clipPath")
            .attr("id", function (d) { return "clip-" + d.id; })
            .append("use")
            .attr("xlink:href", function (d) { return "#" + d.id; });

          node.append("text")
            .attr("clip-path", function (d) { return "url(#clip-" + d.id + ")"; })
            .selectAll("tspan")
            .data(function (d) { return d.class.split(/(?=[A-Z][^A-Z])/g); })
            .enter().append("tspan")
            .attr("x", 0)
            .attr("y", function (d, i, nodes) { return 13 + (i - nodes.length / 2 - 0.5) * 10; })
            .style("fill", "white")
            .text(function (d) { return d; });

          node.append("title")
            .text(function (d) { return d.id + "\n" + format(d.value); });

          node.append("text")
            .attr("clip-path", function (d) {
              return "url(#sub-clip-" + d.id + ")";
            })
            .selectAll("tspan")
            .data(function (d) {
              return d.class.split(/(?=[A-Z][^A-Z])/g);
            })
            .enter().append("tspan")
            .attr("x", function (d, i, nodes) {
              return this.parentNode.parentElement.childNodes[0]['r']['baseVal'].value + 10;
            })
            .attr("y", function (d, i, nodes) {
              return 13 + (i - nodes.length / 2 - 0.5) * 10;
            })
            .style("fill", "white")
            .text(function (d) {
              return d.name;
            });


          node.each(function (d, i) {
            var pos = 0;
            while (i >= 0) {
              pos += 2 * Math.PI * (radius / 32 + top10[i] * 2)
              i--;
            }
            var interpolateEarthOrbitPosition = d3.interpolate(earthOrbitPosition.endAngle()(), pos / (2 * Math.PI * radii.earthOrbit));

            d3.select(this).attr("transform", "translate(" + radii.earthOrbit * Math.sin(interpolateEarthOrbitPosition(3) - earthOrbitPosition.startAngle()()) + "," + -radii.earthOrbit * Math.cos(interpolateEarthOrbitPosition(3) - earthOrbitPosition.startAngle()()) + ")");
          });
        }

      });
    }

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

  return d3.circle = circle;
}));
