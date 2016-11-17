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
  function circle() {
    "use strict";

    var width = 960,
      height = 800,
      radius = Math.min(width, height),
      top10 = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
    var format = d3.format(",d");
    var color = d3.scaleOrdinal(d3.schemeCategory20c);
    var spacetime = d3.select('#space');


    var radii = {
      "sun": radius / 8,
      "earthOrbit": radius / 2.5,
      "earth": radius / 16,
      "moonOrbit": radius / 16,
      "moon": radius / 96
    };

    // Space
    var svg = spacetime.append("svg")
      .attr("width", width)
      .attr("height", height)
      .style('background', '#222')
      .style('font-family', 'sans-serif')
      .style('font-style', 'italic')
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
      .style("stroke", "rgba(255, 204, 0, 0.75)");

    // Current position of Earth in its orbit
    var earthOrbitPosition = d3.arc()
      .outerRadius(radii.earthOrbit + 1)
      .innerRadius(radii.earthOrbit - 1)
      .startAngle(0)
      .endAngle(360);
    svg.append("path")
      .attr("class", "earthOrbitPosition")
      .attr("d", earthOrbitPosition)
      .style("fill", "rgba(255, 204, 0, 0.75)");



    var pack = d3.pack()
      .size([width, height])
      .padding(1.5);

    d3.csv("/scripts/data/data.csv", function (d) {
      d.value = +d.value;
      if (d.value) return d;
    }, function (error, classes) {
      if (error) throw error;

      var root = d3.hierarchy({ children: classes })
        .sum(function (d) { return d.value; })
        .each(function (d) {
          if (id = d.data.id) {
            var id, i = id.lastIndexOf(".");
            d.id = id;
            d.package = id.slice(0, i);
            d.class = id.slice(i + 1);
          }
        });

      var node = svg.selectAll(".node")
        .data(pack(root).leaves())
        .enter().append("g")
        .attr("class", "node");
      node.append("circle")
        .attr("id", function (d) { return d.id; })
        .attr("r", function (d) {
          return d.r;
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
        .text(function (d) { return d; });

      node.append("title")
        .text(function (d) { return d.id + "\n" + format(d.value); });

      node.each(function (d, i) {
        var interpolateEarthOrbitPosition = d3.interpolate(earthOrbitPosition.endAngle()(), (2 * Math.PI * d.r / 2 * Math.PI * radii.earthOrbit));

        d3.select(this).attr("transform", "translate(" + radii.earthOrbit * Math.sin(interpolateEarthOrbitPosition(i) - earthOrbitPosition.startAngle()()) + "," + -radii.earthOrbit * Math.cos(interpolateEarthOrbitPosition(i) - earthOrbitPosition.startAngle()()) + ")");
      });
    });


    // function circle(selection) {

    // }

    circle.min = null;





  }
  return d3.circle = circle;
}));



