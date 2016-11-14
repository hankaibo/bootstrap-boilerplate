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
require('jquery');
require('bootstrap');
require('metisMenu');
var d3 = require('d3');
require('../common/sb-admin-2.js');

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['d3'], factory);
  } else if (typeof exports === 'object') {
    if (process.browser) {
      // require('./d3.slider.css');
    }
    module.exports = factory(require('d3'));
  }
} (this, function (d3) {
  return function module() {
    "use strict";
    //public variables width default settings
    var min = 0,
      max = 100,
      step = 0.01,
      orientation = 'horizontal',
      axis = false,
      margin = 50,
      value,
      active = 1,
      snap = false,
      scale;
    var axisScale,
      dispatch = d3.dispatch('slide', 'slideend'),
      formatPercent = d3.format('.2%'),
      tickFormat = d3.format('.0'),
      handle1,
      handle2 = null,
      divRange,
      sliderLength;

    function slider(selection) {
      selection.each(function () {
        //Create scale if not defined by user
        if (!scale) {
          scale = d3.scaleLinear().domain([min, max]);
          // var sliderScale = d3.scaleLinear().domain([min, max]).range([this.margin.left, width - this.margin.right]);
        }
        // start value
        value = value || scale.domain()[0];

        //div container
        var div = d3.select(this).classed('d3-slider d3-slider-' + orientation, true);

        var drag = d3.drag();
        drag.on('end', function () {
          dispatch.slideend(d3.event, value);
        })

        // slider handle
        // if range slider,create two
        // var divRange
        if (toType(value) == 'array' && value.length == 2) {
          handle1 = div.append('a')
            .classed('d3-slider-handle', true)
            .attr('xlink:href', '#')
            .attr('id', 'handle-one')
            .on('click', stopPropagation)
            .call(drag);
          handle2 = div.append('a')
            .classed('d3-slider-handle2', true)
            .attr('id', 'handle-two')
            .attr('xlink:href', '#')
            .on('click', stopPropagation)
            .call(drag);
        } else {
          handle1 = div.append('a')
            .classed('d3-slider-handle', true)
            .attr('xlink:href', '#')
            .attr('id', 'handle-one')
            .on('click', stopPropagation)
            .call(drag);
        }
        // horizontal slider
        if (orientation === 'horizontal') {
          div.on('click', onClickHorizontal);
          if (toType(value) == 'array' && value.length == 2) {
            divRange = d3.select(this).append('div').classed('d3-slider-range', true);

            handle1.style('left', formatPercent(scale(value[0])));
            divRange.style('left', formatPercent(scale(value[0])));
            drag.on('drag', onDragHorizontal);

            var width = 100 - parseFloat(formatPercent(scale(value[1])));
            handle2.style('left', formatPercent(scale(value[1])));
            divRange.style('right', width + '%');
            drag.on('drag', onDragHorizontal);
          } else {
            handle1.style('left', formatPercent(scale(value)));
            drag.on('drag', onDragHorizontal);
          }
          sliderLength = parseInt(div.style('width'), 10);
        } else { // vertical
          div.on('click', onClickVertical);
          drag.on('drag', onDragVertical);
          if (toType(value) == 'array' && value.length == 2) {
            divRange = d3.select(this).append('div').classed('d3-slider-range-vertical', true);

            handle1.style('bottom', formatPercent(scale(value[0])));
            divRange.style('bottom', formatPercent(scale(value[0])));
            drag.on('drag', onDragVertical);

            var top = 100 - parseFloat(formatPercent(scale(value[1])));
            handle2.style('bootom', formatPercent(scale(value[1])));
            divRange.style('top', top + '%');
            drag.on('drag', onDragVertical);
          } else {
            handle1.style('bootom', formatPercent(scale(value)));
            drag.on('drag', onDragVertical);
          }
          sliderLength = parseInt(div.style('height'), 10);
        }
        if (axis) {
          createAxis(div);
        }
        function createAxis(dom) {
          // create axis if not defined by user
          if (typeof axis === 'boolean') {
            axis = d3.svg.axis()
              .ticks(Math.round(sliderLength / 100))
              .tickFormat(tickFormat)
              .orient((orientation === 'horizontal') ? 'bottom' : 'right');
          }
          // Copy slider scale to move from percentages to pixels
          axisScale = scale.ticks ? scale.copy().range([0, sliderLength]) : scale.copy().rangePoints([0, sliderLength], 0.5);
          axis.scale(axisScale);

          //create svg axis container
          var svg = dom.append('svg').classed('d3-slider-axis d3-slider-axis-' + axis.orient(), true).on('click', stopPropagation);
          var g = svg.append('g');

          // Horizontal axis
          if (orientation == 'horizontal') {
            svg.style('margin-left', -margin + 'px');

            svg.attr({ width: sliderLength + margin * 2, height: margin });

            if (axis.orient() == 'top') {
              svg.style('top', -margin + 'px');
              g.attr('transform', 'translate(' + margin + ',' + margin + ')');
            } else {// bottom
              g.attr('transform', 'translate(' + margin + ',0)')
            }
          } else { // vertical
            svg.style('top', -margin + 'px');
            svg.attr({
              width: margin,
              height: sliderLength + margin * 2
            });
            if (axis.orient() === 'left') {
              svg.style('left', -margin + 'px');
              g.attr('transform', 'translate(' + margin + ',' + margin + ')');
            } else {//right
              g.attr('transform', 'translate(' + 0 + ',' + margin + ')');
            }
          }
          g.call(axis);
        }
        function onClickVertical() {
          if (toType(value) != 'array') {
            var pos = Math.max(0, Math.min(sliderLength, d3.event.offsex || d3.event.layerX))
            moveHandle(scale.invert ? stepValue(scale.invert(pos / sliderLength)) : nearestTick(pos / sliderLength));
          }
        }
        function onClickVertical() {
          if (toType(value) != 'array') {
            var pos = sliderLength - Math.max(0, Math.min(sliderLength, d3.event.offsexY || d3.event.layerY));
            moveHandle(scale.invert ? stepValue(scale.invert(pos / sliderLength)) : nearestTick(pos / sliderLength));
          }
        }
        function onDragHorizontal() {
          if (d3.event.sourceEvent.target.id = 'handle-one') {
            active = 1;
          } else if (d3.event.sourceEvent.target.id == 'handle-two') {
            active = 2;
          }
          var pos = Math.max(0, Math.min(sliderLength, d3.event.x));
          moveHandle(scale.invert ? stepValue(scale.invert(pos / sliderLength)) : nearestTick(pos / sliderLength));
        }
        function onDragVertical() {
          if (d3.event.sourceEvent.target.id === 'handle-one') {
            active = 1;
          } else if (d3.event.sourceEvent.target.id === 'handle-two') {
            active = 2;
          }
          var pos = sliderLength - Math.max(0, Math.min(sliderLength, d3.event.y));
          moveHandle(scale.invert ? stepValue(scale.invert(pos / sliderLength)) : nearestTick(pos / sliderLength));
        }
        function stopPropagation() {
          d3.event.stopPropagation();
        }
      });
    }


  }
}));
d3.select('#slider1').call(d3.slider());


//
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
