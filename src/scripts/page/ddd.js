/**
 * 引入css文件
 * 支持css,less,scss三种格式
 */
require('bootstrap/dist/css/bootstrap.min.css');
require('metismenu/dist/metisMenu.min.css');
require('font-awesome/css/font-awesome.min.css');
require('../../styles/common/sb-admin-2.scss');
require('../../styles/page/ddd.css')

/**
 * 引入js
 */
require('jquery');
require('bootstrap');
require('metisMenu');
var d3 = require('d3');
require('../common/sb-admin-2.js');

// 通用模块定义
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['d3'], factory);
    } else if (typeof exports === 'object') {
        // Node, CommonJS-like
        if (process.browser) {
            // require('./d3.slider.css');
        }
        module.exports = factory(require('d3'));
    } else {
        root.returnExports = factory(root.d3)
    }
} (this, function(d3) {
    // exposed methods
    function slider() {
        "use strict";
        // Public variables width default settings
        var min = 0,
            max = 100,
            step = 1,
            animate = true,
            orientation = 'horizontal',
            axis = false,
            margin = 50,
            value,
            active = 1,
            snap = false,
            scale;
        // Private variables
        var axisScale,
            dispatch = d3.dispatch('slide', 'slideend'),
            formatPercent = d3.format('.2%'),
            tickFormat = d3.format('.0'),
            handle1,
            handle2 = null,
            divRange,
            sliderLength;

        function slider(selection) {
            selection.each(function() {
                // Create scale if not defined by user
                if (!scale) {
                    scale = d3.scaleLinear().domain([min, max]);
                    // var sliderScale = d3.scaleLinear().domain([min, max]).range([this.margin.left, width - this.margin.right]);
                }
                // Start value
                value = value || scale.domain()[0];

                // Div container
                var div = d3.select(this).classed('d3-slider d3-slider-' + orientation, true);

                var drag = d3.drag();
                drag.on('end', function() {
                    // dispatch.slideend(d3.event, value);
                    dispatch.call('slideend', value);
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
                        .classed('d3-slider-handle', true)
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
                        axis = (orientation === 'horizontal') ? d3.axisBottom() : d3.axisRight();
                        axis.ticks(Math.round(sliderLength / 100)).tickFormat(tickFormat);
                    }
                    // Copy slider scale to move from percentages to pixels
                    axisScale = scale.ticks ? scale.copy().range([0, sliderLength]) : scale.copy().rangePoints([0, sliderLength], 0.5);
                    axis.scale(axisScale);

                    // Create svg axis container
                    var svg = dom.append('svg')
                        .classed('d3-slider-axis d3-slider-axis-' + (orientation === 'horizontal') ? 'bottom' : 'right', true)
                        .on('click', stopPropagation);
                    var g = svg.append('g');

                    // Horizontal axis
                    if (orientation == 'horizontal') {
                        svg.style('margin-left', -margin + 'px');

                        svg.attr({
                            width: sliderLength + margin * 2,
                            height: margin
                        });

                        // TODO axis.orient() is not exist
                        if ('axis.orient()' == 'top') {
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
                        // TODO
                        if ('axis.orient()' === 'left') {
                            svg.style('left', -margin + 'px');
                            g.attr('transform', 'translate(' + margin + ',' + margin + ')');
                        } else {//right
                            g.attr('transform', 'translate(' + 0 + ',' + margin + ')');
                        }
                    }
                    g.call(axis);
                }

                function onClickHorizontal() {
                    if (toType(value) != 'array') {
                        var pos = Math.max(0, Math.min(sliderLength, d3.event.offsetX || d3.event.layerX));
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
        // Move slider handle on click/drag
        function moveHandle(newValue) {
            var currentValue = toType(value) == 'array' && value.length == 2 ? value[active - 1] : value,
                oldPos = formatPercent(scale(stepValue(currentValue))),
                newPos = formatPercent(scale(stepValue(newValue))),
                position = (orientation === 'horizontal') ? 'left' : 'bootom';
            if (oldPos !== newPos) {
                if (toType(value) == 'array' && value.length == 2) {
                    value[active - 1] = newValue;
                    if (d3.event) {
                        dispatch.call('slide', value);
                    }
                } else {
                    if (d3.event) {
                        dispatch.call('slide', value = newValue);
                    }
                }

                if (value[0] >= value[1]) return;
                if (active === 1) {
                    if (toType(value) == 'array' && value.length == 2) {
                        (position === 'left') ? divRange.style('left', newPos) : divRange.style('bottom', newPos);
                    }

                    if (animate) {
                        handle1.transition().styleTween(position, function() {
                            return d3.interpolate(oldPos, newPos);
                        }).duration((typeof animate === 'number') ? animate : 250);
                    } else {
                        handle1.style(position, newPos);
                    }
                } else {
                    var width = 100 - parseFloat(newPos);
                    var top = 100 - parseFloat(newPos);

                    (position === 'left') ? divRange.style('right', width + '%') : divRange.style('top', top + '%');

                    if (animate) {
                        handle2.transition().styleTween(position, function() {
                            return d3.interpolate(oldPos, newPos);
                        }).duration((typeof animate === 'number') ? animate : 250);
                    } else {
                        handle2.style(position, newPos);
                    }
                }
            }
        }

        // Calculate newrest step value
        function stepValue(val) {
            if (val == scale.domain()[0] || val === scale.domain()[1]) {
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
            var dist = ticks.map(function(d) {
                return pos - scale(d);
            });
            var i = -1,
                index = 0,
                r = scale.ticks ? scale.range()[1] : scale.rangeExtent()[1];
            do {
                i++;
                if (Math.abs(dist[i]) < r) {
                    r = Math.abs(dist[i]);
                    index = i;
                }
            } while (dist[i] > 0 && i < dist.length - 1);

            return ticks[index];
        }

        // Return the type of an object
        function toType(v) {
            return ({}).toString.call(v).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
        }

        // 兼容
        function rebind(target, source) {
            var i = 1, n = arguments.length, method;
            while (++i < n) target[method = arguments[i]] = d3_rebind(target, source, source[method]);
            return target;
        };
        function d3_rebind(target, source, method) {
            return function() {
                var value = method.apply(source, arguments);
                return value === source ? target : value;
            };
        }
        // 兼容

        // Getter/setter function
        slider.min = function(_) {
            if (!arguments.length) {
                return min;
            }
            min = _;
            return slider;
        };
        slider.max = function(_) {
            if (!arguments.length) {
                return max;
            }
            max = _;
            return slider;
        };
        slider.step = function(_) {
            if (!arguments.length) {
                return step;
            }
            step = _;
            return slider;
        };
        slider.animate = function(_) {
            if (!arguments.length) {
                return animate;
            }
            animate = _;
            return slider;
        };
        slider.orientation = function(_) {
            if (!arguments.length) {
                return orientation;
            }
            orientation = _;
            return slider;
        };
        slider.axis = function(_) {
            if (!arguments.length) {
                return axis;
            }
            axis = _;
            return slider;
        };
        slider.margin = function(_) {
            if (!arguments.length) {
                return margin;
            }
            margin = _;
            return slider;
        };
        slider.value = function(_) {
            if (!arguments.length) {
                return value;
            }
            if (value) {
                moveHandle(stepValue(_));
            }
            value = _;
            return slider;
        };
        slider.snap = function(_) {
            if (!arguments.length) {
                return snap;
            }
            snap = _;
            return slider;
        };
        slider.scale = function(_) {
            if (!arguments.length) {
                return scale;
            }
            scale = _;
            return slider;
        };

        rebind(slider, dispatch, 'on');

        return slider;
    }

    return d3.slider = slider;
}));

// d3.select('#slider1').call(d3.slider());
// d3.select('#slider2').call(d3.slider().value([10, 25]));
d3.select('#slider3').call(d3.slider().axis(true).value([10, 25]).on("slide", function(evt, value) {
    d3.select('#slider3textmin').text(value[0]);
    d3.select('#slider3textmax').text(value[1]);
}));
// d3.select('#slider4').call(d3.slider().on("slide", function(evt, value) {
//     d3.select('#slider4text').text(value);
// }));
// d3.select('#slider5').call(d3.slider().axis(true));
// var axis = d3.svg.axis().orient("top").ticks(4);
// d3.select('#slider6').call(d3.slider().axis(axis));
// d3.select('#slider7').call(d3.slider().axis(true).min(2000).max(2100).step(5));
// d3.select('#slider8').call(d3.slider().value(50).orientation("vertical"));
// d3.select('#slider9').call(d3.slider().value([10, 30]).orientation("vertical"));
// d3.select('#slider2').call(d3.slider().scale(d3.scaleTime().domain([new Date(1984, 1, 1), new Date(2014, 1, 1)])).axis(d3.axisBottom()));
// d3.select('#slider11').call(d3.slider().scale(d3.time.scale().domain([new Date(1984, 1, 1), new Date(2014, 1, 1)])).axis(d3.svg.axis()).snap(true).value(new Date(2000, 1, 1)));
// essai = d3.slider().scale(d3.scale.ordinal().domain(["Gecko", "Webkit", "Blink", "Trident"]).rangePoints([0, 1], 0.5)).axis(d3.svg.axis()).snap(true).value("Gecko");
// d3.select('#slider12').call(essai);


//
$(function() {
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
        leftDrag.on("drag", function() {
            var currentX = +sliderLeftHandle.attr("x");
            var newX = currentX + d3.event.dx;
            if (sliderScale.invert(newX) < min) {
                sliderMin = min;
            } else if (sliderScale.invert(newX + 20) < sliderMax) {
                sliderMin = sliderScale.invert(newX);
                callEventListeners("changing", { cause: "range-left" });
            }
            redraw();
        }).on("end", function() {
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
        rightDrag.on("drag", function() {
            var currentX = +sliderRightHandle.attr("x");
            var newX = currentX + d3.event.dx + 10;
            if (sliderScale.invert(newX) > max) {
                sliderMax = max;
            } else if (sliderScale.invert(newX - 20) > sliderMin) {
                sliderMax = sliderScale.invert(newX);
                callEventListeners("changing", { cause: "range-right" });
            }
            redraw();
        }).on("end", function() {
            callEventListeners("change", { cause: "range-right" });
        })
        sliderRightHandle.call(rightDrag);


        var sliderRectDrag = d3.drag();
        sliderRectDrag.on("drag", function() {
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
        }).on("end", function() {
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

        this.getSliderMin = function() {
            return sliderMin;
        }

        this.getSliderMax = function() {
            return sliderMax;
        }

        var eventListeners = Object.create(null);
        eventListeners.change = [];
        eventListeners.changing = [];

        var changeEventListeners = [];
        this.on = function(event, fn) {
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
    slider.on("change", function() {
        console.log("Hello");
    })
});
