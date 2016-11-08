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
$(function() {
    // Force Dragging III(canvas)
    var canvas = document.querySelector("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width,
        height = canvas.height;
    var simulation = d3.forceSimulation()
        .force("link", d3.forceLink().id(function(d) { return d.id }))
        .force("charge", d3.forceManyBody())
        .force("center", d3.forceCenter(width / 2, height / 2));
    d3.json("/scripts/common/miserables.json", function(error, graph) {
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

$(function() {
    var svg = d3.select(".svg"),
        width = +svg.attr("width"),
        height = +svg.attr("height");

    var simulation = d3.forceSimulation()
        .force("link", d3.forceLink().id(function(d) { return d.id }))
        .force("charge", d3.forceManyBody())
        .force("center", d3.forceCenter(width / 2, height / 2));

    d3.json("/scripts/common/miserables.json", function(error, graph) {
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

        node.append("title").text(function(d) { return d.id; });

        simulation.nodes(graph.nodes).on("tick", ticked);

        simulation.force("link").links(graph.links);

        function ticked() {
            link.attr("x1", function(d) { return d.source.x; })
                .attr("y1", function(d) { return d.source.y; })
                .attr("x2", function(d) { return d.target.x; })
                .attr("y2", function(d) { return d.target.y; });

            node.attr("cx", function(d) { return d.x; })
                .attr("cy", function(d) { return d.y; });
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
// $(function() {
//     function RangeSlider(id, params) {
//         "use strict"

//         // 参数之类判断
//         var sliderObj = this;
//         if (!(this instanceof RangeSlider)) {
//             throw new Error("RangeSlider needs to be called with the new keyword");
//         }
//         this.id = id;
//         if (params === undefined) {
//             params = {};
//         }

//         //
//         this.margin = { top: 0, left: 10, right: 15, bottom: 2 };
//         var min = params.min === undefined ? 0 : params.min;
//         var max = params.max === undefined ? (min + 5) : params.max;

//         var sliderMin = params.defaultMin === undefined ? min : params.defaultMin;
//         var sliderMax = params.defaultMax === undefined ? max : params.defaultMax;
//         // 滑块区域大小及位置
//         var bbox = d3.select(this.id).node().getBoundingClientRect();
//         var height = bbox.height;
//         var width = bbox.width;
//         // 比例尺
//         var sliderScale = d3.scaleLinear().domain([min, max]).range([this.margin.left, width - this.margin.right]);
//         var axis = d3.axisBottom(sliderScale);

//         var line = d3.select(this.id)
//             .append("rect")
//             .attr("x", this.margin.left)
//             .attr("y", sliderObj.margin.top)
//             .attr("width", width - this.margin.right - this.margin.left)
//             .attr("height", height / 2)
//             .attr("fill", "white");

//         var slider = d3.select(this.id).append("g");

//         var gAxis = slider.append("g").attr("class", "axis").attr("transform", "translate(0," + (sliderObj.margin.top + height / 2) + ")").call(axis);

//         var sliderRect = slider.append("rect")
//             .attr("x", sliderScale(sliderMin))
//             .attr("y", sliderObj.margin.top)
//             .attr("width", sliderWidth())
//             .attr("height", height / 2)
//             .attr("fill", "red");

//         // 滑块左控件
//         var sliderLeftHandle = slider.append("rect")
//             .attr("x", sliderScale(sliderMin))
//             .attr("y", sliderObj.margin.top)
//             .attr("width", 10)
//             .attr("height", height / 2)
//             .attr("fill", "black");

//         var leftDrag = d3.drag();// v3、v4 api不兼容
//         leftDrag.on("drag", function() {
//             var currentX = +sliderLeftHandle.attr("x");
//             var newX = currentX + d3.event.dx;
//             if (sliderScale.invert(newX) < min) {
//                 sliderMin = min;
//             } else if (sliderScale.invert(newX + 20) < sliderMax) {
//                 sliderMin = sliderScale.invert(newX);
//                 callEventListeners("changing", { cause: "range-left" });
//             }
//             redraw();
//         }).on("dragend", function() {
//             callEventListeners("change", { cause: "range-left" });
//         })
//         sliderLeftHandle.call(leftDrag);
//         // 滑块右控件
//         var sliderRightHandle = slider.append("rect")
//             .attr("x", sliderScale(sliderMax) - 10)
//             .attr("y", sliderObj.margin.top)
//             .attr("width", 10)
//             .attr("height", height / 2)
//             .attr("fill", "black");

//         var rightDrag = d3.drag();// v3、v4 api不兼容
//         rightDrag.on("drag", function() {
//             var currentX = +sliderRightHandle.attr("x");
//             var newX = currentX + d3.event.dx + 10;
//             if (sliderScale.invert(newX) > max) {
//                 sliderMax = max;
//             } else if (sliderScale.invert(newX - 20) > sliderMin) {
//                 sliderMax = sliderScale.invert(newX);
//                 callEventListeners("changing", { cause: "range-right" });
//             }
//             redraw();
//         }).on("dragend", function() {
//             callEventListeners("change", { cause: "range-right" });
//         })
//         sliderRightHandle.call(rightDrag);


//         var sliderRectDrag = d3.drag();
//         sliderRectDrag.on("drag", function() {
//             var currentLeftX = +sliderLeftHandle.attr("x");
//             var newLeftX = currentLeftX + d3.event.dx;

//             var currentRightX = +sliderRightHandle.attr("x");
//             var newRightX = currentRightX + d3.event.dx + 10;

//             if (sliderScale.invert(newLeftX) >= min && sliderScale.invert(newRightX) <= max) {
//                 sliderMin = sliderScale.invert(newLeftX);
//                 sliderMax = sliderScale.invert(newRightX);
//                 callEventListeners("changing", { cause: "slide" });
//             }
//             redraw();
//         }).on("dragend", function() {
//             callEventListeners("change", { cause: "slide" });
//         });
//         sliderRect.call(sliderRectDrag);

//         function redraw() {
//             sliderRightHandle.attr("x", sliderScale(sliderMax) - 10);
//             sliderLeftHandle.attr("x", sliderScale(sliderMin));
//             sliderRect.attr("x", sliderScale(sliderMin)).attr("width", sliderWidth());
//         }

//         function sliderWidth() {
//             return sliderScale(sliderMax) - sliderScale(sliderMin);
//         }

//         this.getSliderMin = function() {
//             return sliderMin;
//         }

//         this.getSliderMax = function() {
//             return sliderMax;
//         }

//         var eventListeners = Object.create(null);
//         eventListeners.change = [];
//         eventListeners.changing = [];

//         var changeEventListeners = [];
//         this.on = function(event, fn) {
//             switch (event) {
//                 case "change":
//                     if (fn === null) {
//                         eventListeners["change"] = [];
//                     } else {
//                         eventListeners["change"].push(fn);
//                     }
//                     break;
//                 case "changing":
//                     if (fn === null) {
//                         eventListeners["changing"] = [];
//                     } else {
//                         eventListeners["changing"].push(fn);
//                     }
//                     break;
//             }
//         }

//         function callEventListeners(event, params) {
//             var listeners = eventListeners[event];

//             for (var i in listeners) {
//                 listeners[i](params);
//             }
//         }
//     }

//     // 使用指定参数创建一个滑块
//     var slider = new RangeSlider("#hourSlider", {
//         min: 0,
//         max: 24
//     });
//     slider.on("change", function() {
//         console.log("Hello");
//     })
// });
