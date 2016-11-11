/**
 * 引入css文件
 * 支持css,less,scss三种格式
 */
require('bootstrap/dist/css/bootstrap.min.css');
require('metismenu/dist/metisMenu.min.css');
require('font-awesome/css/font-awesome.min.css');
require('../../styles/common/sb-admin-2.scss');

/**
 * 引入js
 */
require('jquery/dist/jquery.min.js');
require('bootstrap/dist/js/bootstrap.min.js');
require('metisMenu/dist/metisMenu.min.js');
var d3 = require('d3');
require('../common/sb-admin-2.js');
$(function () {
  // Force Dragging III(canvas)
  var canvas = document.querySelector("canvas"),
    context = canvas.getContext("2d"),
    width = canvas.width,
    height = canvas.height;
  var simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(function (d) { return d.id }))
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(width / 2, height / 2));
  d3.json("/scripts/common/miserables.json", function (error, graph) {
    if (error) { throw error };
    simulation.nodes(graph.nodes).on("tick", ticked);

    simulation.force("link").links(graph.links);

    d3.select(canvas)
      .call(d3.drag()
        .container(canvas)
        .subject(dragsubject)
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended)
      );

    function ticked() {
      context.clearRect(0, 0, width, height);

      context.beginPath();
      graph.links.forEach(drawLink);
      context.strokeStyle = "#aaa";
      context.stroke();

      context.beginPath();
      graph.nodes.forEach(drawNode);
      context.fill();
      context.strokeStyle = "#fff";
      context.stroke();
    }
    function dragsubject() {
      return simulation.find(d3.event.x, d3.event.y);
    }
  });

  function dragstarted() {
    if (!d3.event.active) {
      simulation.alphaTarget(0.3).restart();
    }
    d3.event.subject.fx = d3.event.subject.x;
    d3.event.subject.fy = d3.event.subject.y;
  }
  function dragged() {
    d3.event.subject.fx = d3.event.x;
    d3.event.subject.fy = d3.event.y;
  }
  function dragended() {
    if (!d3.event.active) {
      simulation.alphaTarget(0);
    }
    d3.event.subject.fx = null;
    d3.event.subject.fy = null;
  }
  function drawLink(d) {
    context.moveTo(d.source.x, d.source.y);
    context.lineTo(d.target.x, d.target.y);
  }
  function drawNode(d) {
    context.moveTo(d.x + 3, d.y);
    context.arc(d.x, d.y, 3, 0, 2 * Math.PI);
  }
});

$(function () {
  var svg = d3.select(".svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

  var simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(function (d) { return d.id }))
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(width / 2, height / 2));

  d3.json("/scripts/common/miserables.json", function (error, graph) {
    if (error) { throw error };

    var link = svg.append("g")
      .attr("class", "links")
      .selectAll("line")
      .data(graph.links)
      .enter().append("line");

    var node = svg.append("g")
      .attr("class", "nodes")
      .selectAll("circle")
      .data(graph.nodes)
      .enter().append("circle")
      .attr("r", 2.5)
      .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));

    node.append("title").text(function (d) { return d.id; });

    simulation.nodes(graph.nodes).on("tick", ticked);

    simulation.force("link").links(graph.links);

    function ticked() {
      link.attr("x1", function (d) { return d.source.x; })
        .attr("y1", function (d) { return d.source.y; })
        .attr("x2", function (d) { return d.target.x; })
        .attr("y2", function (d) { return d.target.y; });

      node.attr("cx", function (d) { return d.x; })
        .attr("cy", function (d) { return d.y; });
    }
  });
  function dragstarted(d) {
    if (!d3.event.active) { simulation.alphaTarget(0.3).restart() };
    d.fx = d.x;
    d.fy = d.y;
  }
  function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }
  function dragended(d) {
    if (!d3.event.active) { simulation.alphaTarget(0); };
    d.fx = null;
    d.fy = null;
  }
});
$(function () {
  function RangeSlider(id, params) {
    "use strict"

    // 参数之类判断
    var sliderObj = this;
    if (!(this instanceof RangeSlider)) {
      throw new Error("RangeSlider needs to be called with the new keyword");
    }
    this.id = id;
    if (params === undefined) {
      params = {};
    }

    //
    this.margin = { top: 0, left: 10, right: 15, bottom: 2 };
    var min = params.min === undefined ? 0 : params.min;
    var max = params.max === undefined ? (min + 5) : params.max;

    var sliderMin = params.defaultMin === undefined ? min : params.defaultMin;
    var sliderMax = params.defaultMax === undefined ? max : params.defaultMax;
    // 滑块区域大小及位置
    var bbox = d3.select(this.id).node().getBoundingClientRect();
    var height = bbox.height;
    var width = bbox.width;
    // 比例尺
    var sliderScale = d3.scaleLinear().domain([min, max]).range([this.margin.left, width - this.margin.right]);
    var axis = d3.axisBottom(sliderScale);

    var line = d3.select(this.id)
      .append("rect")
      .attr("x", this.margin.left)
      .attr("y", sliderObj.margin.top)
      .attr("width", width - this.margin.right - this.margin.left)
      .attr("height", height / 2)
      .attr("fill", "green");

    var slider = d3.select(this.id).append("g");

    var gAxis = slider.append("g").attr("class", "axis").attr("transform", "translate(0," + (sliderObj.margin.top + height / 2) + ")").call(axis);

    var sliderRect = slider.append("rect")
      .attr("x", sliderScale(sliderMin))
      .attr("y", sliderObj.margin.top)
      .attr("width", sliderWidth())
      .attr("height", height / 2)
      .attr("fill", "red");

    // 滑块左控件
    var sliderLeftHandle = slider.append("rect")
      .attr("x", sliderScale(sliderMin))
      .attr("y", sliderObj.margin.top)
      .attr("width", 10)
      .attr("height", height / 2)
      .attr("fill", "black");

    var leftDrag = d3.drag();// v3、v4 api不兼容
    leftDrag.on("drag", function () {
      var currentX = +sliderLeftHandle.attr("x");
      var newX = currentX + d3.event.dx;
      if (sliderScale.invert(newX) < min) {
        sliderMin = min;
      } else if (sliderScale.invert(newX + 20) < sliderMax) {
        sliderMin = sliderScale.invert(newX);
        callEventListeners("changing", { cause: "range-left" });
      }
      redraw();
    }).on("end", function () {
      callEventListeners("change", { cause: "range-left" });
    })
    sliderLeftHandle.call(leftDrag);
    // 滑块右控件
    var sliderRightHandle = slider.append("rect")
      .attr("x", sliderScale(sliderMax) - 10)
      .attr("y", sliderObj.margin.top)
      .attr("width", 10)
      .attr("height", height / 2)
      .attr("fill", "black");

    var rightDrag = d3.drag();// v3、v4 api不兼容
    rightDrag.on("drag", function () {
      var currentX = +sliderRightHandle.attr("x");
      var newX = currentX + d3.event.dx + 10;
      if (sliderScale.invert(newX) > max) {
        sliderMax = max;
      } else if (sliderScale.invert(newX - 20) > sliderMin) {
        sliderMax = sliderScale.invert(newX);
        callEventListeners("changing", { cause: "range-right" });
      }
      redraw();
    }).on("end", function () {
      callEventListeners("change", { cause: "range-right" });
    })
    sliderRightHandle.call(rightDrag);


    var sliderRectDrag = d3.drag();
    sliderRectDrag.on("drag", function () {
      var currentLeftX = +sliderLeftHandle.attr("x");
      var newLeftX = currentLeftX + d3.event.dx;

      var currentRightX = +sliderRightHandle.attr("x");
      var newRightX = currentRightX + d3.event.dx + 10;

      if (sliderScale.invert(newLeftX) >= min && sliderScale.invert(newRightX) <= max) {
        sliderMin = sliderScale.invert(newLeftX);
        sliderMax = sliderScale.invert(newRightX);
        callEventListeners("changing", { cause: "slide" });
      }
      redraw();
    }).on("end", function () {
      callEventListeners("change", { cause: "slide" });
    });
    sliderRect.call(sliderRectDrag);

    function redraw() {
      sliderRightHandle.attr("x", sliderScale(sliderMax) - 10);
      sliderLeftHandle.attr("x", sliderScale(sliderMin));
      sliderRect.attr("x", sliderScale(sliderMin)).attr("width", sliderWidth());
    }

    function sliderWidth() {
      return sliderScale(sliderMax) - sliderScale(sliderMin);
    }

    this.getSliderMin = function () {
      return sliderMin;
    }

    this.getSliderMax = function () {
      return sliderMax;
    }

    var eventListeners = Object.create(null);
    eventListeners.change = [];
    eventListeners.changing = [];

    var changeEventListeners = [];
    this.on = function (event, fn) {
      switch (event) {
        case "change":
          if (fn === null) {
            eventListeners["change"] = [];
          } else {
            eventListeners["change"].push(fn);
          }
          break;
        case "changing":
          if (fn === null) {
            eventListeners["changing"] = [];
          } else {
            eventListeners["changing"].push(fn);
          }
          break;
      }
    }

    function callEventListeners(event, params) {
      var listeners = eventListeners[event];

      for (var i in listeners) {
        listeners[i](params);
      }
    }
  }

  // 使用指定参数创建一个滑块
  var slider = new RangeSlider("#hourSlider", {
    min: 0,
    max: 24
  });
  slider.on("change", function () {
    console.log("Hello");
  })
});


(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['d3'], factory);
  } else if (typeof define === 'function') {
    // CMD
    define(function (require, exports, module) {
      module.exports = factory.apply(root, arguments) || module.exports;
    });
  } else if (typeof exports === 'object' && typeof define === 'undefined') {
    if (process.browser) {
      // Browserify. Import css too using cssify.
      require('./d3.slider.css');
    }
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(require('d3'));
    module.exports = factory.apply(root, arguments) || module.exports;
  } else {
    // Browser globals (root is window)
    root.d3.slider = factory(root.d3);
  }
} (this, function (d3) {
  return function module() {
    "use strict";

    // Public variables width default settings
    var min = 0,
      max = 100,
      step = 0.01,
      animate = true,
      orientation = "horizontal",
      axis = false,
      margin = 50,
      value,
      active = 1,
      snap = false,
      scale;

    // Private variables
    var axisScale,
      dispatch = d3.dispatch("slide", "slideend"),
      formatPercent = d3.format(".2%"),
      tickFormat = d3.format(".0"),
      handle1,
      handle2 = null,
      divRange,
      sliderLength;

    function slider(selection) {
      selection.each(function () {

        // Create scale if not defined by user
        if (!scale) {
          scale = d3.scale.linear().domain([min, max]);
        }

        // Start value
        value = value || scale.domain()[0];

        // DIV container
        var div = d3.select(this).classed("d3-slider d3-slider-" + orientation, true);

        var drag = d3.behavior.drag();
        drag.on('dragend', function () {
          dispatch.slideend(d3.event, value);
        })

        // Slider handle
        //if range slider, create two
        // var divRange;

        if (toType(value) == "array" && value.length == 2) {
          handle1 = div.append("a")
            .classed("d3-slider-handle", true)
            .attr("xlink:href", "#")
            .attr('id', "handle-one")
            .on("click", stopPropagation)
            .call(drag);
          handle2 = div.append("a")
            .classed("d3-slider-handle", true)
            .attr('id', "handle-two")
            .attr("xlink:href", "#")
            .on("click", stopPropagation)
            .call(drag);
        } else {
          handle1 = div.append("a")
            .classed("d3-slider-handle", true)
            .attr("xlink:href", "#")
            .attr('id', "handle-one")
            .on("click", stopPropagation)
            .call(drag);
        }

        // Horizontal slider
        if (orientation === "horizontal") {

          div.on("click", onClickHorizontal);

          if (toType(value) == "array" && value.length == 2) {
            divRange = d3.select(this).append('div').classed("d3-slider-range", true);

            handle1.style("left", formatPercent(scale(value[0])));
            divRange.style("left", formatPercent(scale(value[0])));
            drag.on("drag", onDragHorizontal);

            var width = 100 - parseFloat(formatPercent(scale(value[1])));
            handle2.style("left", formatPercent(scale(value[1])));
            divRange.style("right", width + "%");
            drag.on("drag", onDragHorizontal);

          } else {
            handle1.style("left", formatPercent(scale(value)));
            drag.on("drag", onDragHorizontal);
          }

          sliderLength = parseInt(div.style("width"), 10);

        } else { // Vertical

          div.on("click", onClickVertical);
          drag.on("drag", onDragVertical);
          if (toType(value) == "array" && value.length == 2) {
            divRange = d3.select(this).append('div').classed("d3-slider-range-vertical", true);

            handle1.style("bottom", formatPercent(scale(value[0])));
            divRange.style("bottom", formatPercent(scale(value[0])));
            drag.on("drag", onDragVertical);

            var top = 100 - parseFloat(formatPercent(scale(value[1])));
            handle2.style("bottom", formatPercent(scale(value[1])));
            divRange.style("top", top + "%");
            drag.on("drag", onDragVertical);

          } else {
            handle1.style("bottom", formatPercent(scale(value)));
            drag.on("drag", onDragVertical);
          }

          sliderLength = parseInt(div.style("height"), 10);

        }

        if (axis) {
          createAxis(div);
        }


        function createAxis(dom) {

          // Create axis if not defined by user
          if (typeof axis === "boolean") {

            axis = d3.svg.axis()
              .ticks(Math.round(sliderLength / 100))
              .tickFormat(tickFormat)
              .orient((orientation === "horizontal") ? "bottom" : "right");

          }

          // Copy slider scale to move from percentages to pixels
          axisScale = scale.ticks ? scale.copy().range([0, sliderLength]) : scale.copy().rangePoints([0, sliderLength], 0.5);
          axis.scale(axisScale);

          // Create SVG axis container
          var svg = dom.append("svg")
            .classed("d3-slider-axis d3-slider-axis-" + axis.orient(), true)
            .on("click", stopPropagation);

          var g = svg.append("g");

          // Horizontal axis
          if (orientation === "horizontal") {

            svg.style("margin-left", -margin + "px");

            svg.attr({
              width: sliderLength + margin * 2,
              height: margin
            });

            if (axis.orient() === "top") {
              svg.style("top", -margin + "px");
              g.attr("transform", "translate(" + margin + "," + margin + ")");
            } else { // bottom
              g.attr("transform", "translate(" + margin + ",0)");
            }

          } else { // Vertical

            svg.style("top", -margin + "px");

            svg.attr({
              width: margin,
              height: sliderLength + margin * 2
            });

            if (axis.orient() === "left") {
              svg.style("left", -margin + "px");
              g.attr("transform", "translate(" + margin + "," + margin + ")");
            } else { // right
              g.attr("transform", "translate(" + 0 + "," + margin + ")");
            }

          }

          g.call(axis);

        }

        function onClickHorizontal() {
          if (toType(value) != "array") {
            var pos = Math.max(0, Math.min(sliderLength, d3.event.offsetX || d3.event.layerX));
            moveHandle(scale.invert ?
              stepValue(scale.invert(pos / sliderLength))
              : nearestTick(pos / sliderLength));
          }
        }

        function onClickVertical() {
          if (toType(value) != "array") {
            var pos = sliderLength - Math.max(0, Math.min(sliderLength, d3.event.offsetY || d3.event.layerY));
            moveHandle(scale.invert ?
              stepValue(scale.invert(pos / sliderLength))
              : nearestTick(pos / sliderLength));
          }
        }

        function onDragHorizontal() {
          if (d3.event.sourceEvent.target.id === "handle-one") {
            active = 1;
          } else if (d3.event.sourceEvent.target.id == "handle-two") {
            active = 2;
          }
          var pos = Math.max(0, Math.min(sliderLength, d3.event.x));
          moveHandle(scale.invert ?
            stepValue(scale.invert(pos / sliderLength))
            : nearestTick(pos / sliderLength));
        }

        function onDragVertical() {
          if (d3.event.sourceEvent.target.id === "handle-one") {
            active = 1;
          } else if (d3.event.sourceEvent.target.id == "handle-two") {
            active = 2;
          }
          var pos = sliderLength - Math.max(0, Math.min(sliderLength, d3.event.y))
          moveHandle(scale.invert ?
            stepValue(scale.invert(pos / sliderLength))
            : nearestTick(pos / sliderLength));
        }

        function stopPropagation() {
          d3.event.stopPropagation();
        }

      });

    }

    // Move slider handle on click/drag
    function moveHandle(newValue) {
      var currentValue = toType(value) == "array" && value.length == 2 ? value[active - 1] : value,
        oldPos = formatPercent(scale(stepValue(currentValue))),
        newPos = formatPercent(scale(stepValue(newValue))),
        position = (orientation === "horizontal") ? "left" : "bottom";
      if (oldPos !== newPos) {

        if (toType(value) == "array" && value.length == 2) {
          value[active - 1] = newValue;
          if (d3.event) {
            dispatch.slide(d3.event, value);
          };
        } else {
          if (d3.event) {
            dispatch.slide(d3.event.sourceEvent || d3.event, value = newValue);
          };
        }

        if (value[0] >= value[1]) return;
        if (active === 1) {
          if (toType(value) == "array" && value.length == 2) {
            (position === "left") ? divRange.style("left", newPos) : divRange.style("bottom", newPos);
          }

          if (animate) {
            handle1.transition()
              .styleTween(position, function () { return d3.interpolate(oldPos, newPos); })
              .duration((typeof animate === "number") ? animate : 250);
          } else {
            handle1.style(position, newPos);
          }
        } else {

          var width = 100 - parseFloat(newPos);
          var top = 100 - parseFloat(newPos);

          (position === "left") ? divRange.style("right", width + "%") : divRange.style("top", top + "%");

          if (animate) {
            handle2.transition()
              .styleTween(position, function () { return d3.interpolate(oldPos, newPos); })
              .duration((typeof animate === "number") ? animate : 250);
          } else {
            handle2.style(position, newPos);
          }
        }
      }
    }

    // Calculate nearest step value
    function stepValue(val) {

      if (val === scale.domain()[0] || val === scale.domain()[1]) {
        return val;
      }

      var alignValue = val;
      if (snap) {
        alignValue = nearestTick(scale(val));
      } else {
        var valModStep = (val - scale.domain()[0]) % step;
        alignValue = val - valModStep;

        if (Math.abs(valModStep) * 2 >= step) {
          alignValue += (valModStep > 0) ? step : -step;
        }
      };

      return alignValue;

    }

    // Find the nearest tick
    function nearestTick(pos) {
      var ticks = scale.ticks ? scale.ticks() : scale.domain();
      var dist = ticks.map(function (d) { return pos - scale(d); });
      var i = -1,
        index = 0,
        r = scale.ticks ? scale.range()[1] : scale.rangeExtent()[1];
      do {
        i++;
        if (Math.abs(dist[i]) < r) {
          r = Math.abs(dist[i]);
          index = i;
        };
      } while (dist[i] > 0 && i < dist.length - 1);

      return ticks[index];
    };

    // Return the type of an object
    function toType(v) {
      return ({}).toString.call(v).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
    };

    // Getter/setter functions
    slider.min = function (_) {
      if (!arguments.length) return min;
      min = _;
      return slider;
    };

    slider.max = function (_) {
      if (!arguments.length) return max;
      max = _;
      return slider;
    };

    slider.step = function (_) {
      if (!arguments.length) return step;
      step = _;
      return slider;
    };

    slider.animate = function (_) {
      if (!arguments.length) return animate;
      animate = _;
      return slider;
    };

    slider.orientation = function (_) {
      if (!arguments.length) return orientation;
      orientation = _;
      return slider;
    };

    slider.axis = function (_) {
      if (!arguments.length) return axis;
      axis = _;
      return slider;
    };

    slider.margin = function (_) {
      if (!arguments.length) return margin;
      margin = _;
      return slider;
    };

    slider.value = function (_) {
      if (!arguments.length) return value;
      if (value) {
        moveHandle(stepValue(_));
      };
      value = _;
      return slider;
    };

    slider.snap = function (_) {
      if (!arguments.length) return snap;
      snap = _;
      return slider;
    };

    slider.scale = function (_) {
      if (!arguments.length) return scale;
      scale = _;
      return slider;
    };

    d3.rebind(slider, dispatch, "on");

    return slider;

  }
}));


d3.select('#slider2').call(d3.slider().value([10, 25]));
