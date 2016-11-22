/**
 * 本模块来源于http://bl.ocks.org/clayzermk1/9142407和http://bl.ocks.org/mbostock/4063269。
 */
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['d3'], factory);
    } else if (typeof exports === 'object' && module.exports) {
        module.exports = factory(require('d3'));
    } else {
        root.returnExports = factory(root.d3);
    }
} (this, function(d3) {
    // exposed methods
    function Circle() {
        'use strict';
        // Public variables width default settings
        var width = 960;
        var height = 960;
        var value;
        var backgroundColor = '#333';
        var orbitColor = 'rgba(255, 204, 0, 0.75)';
        var orbitWidth = '1px';
        var areaText = true;
        var areaChart = false;
        var rad = 16;
        var textAfterEdge = '';
        var textAfterEdgeColor = '#fee';
        var textAfterEdgeSize = '24';
        var textBeforeEdge = '';
        var textBeforeEdgeColor = '#fee';
        var textBeforeEdgeSize = '24';
        var defaultData = ['提供数据总量', '提供数据部委总量', '提供数据部委占比'];
        var theme = 'blue';
        // Private variables
        var blueCircle = ['#5185dd', '#626cf7', '#5e69ff', '#3b82ff', '#2a90ff', '#0ca8ff', '#00b2fe', '#01bbe8', '#03c8c9', '#07d0ad', '#07d0ab', '#0dd0a2', '#1bc6a6', '#2db1b5', '#4199ca'];
        var orangeCircle = ['#f8805a', '#f8805a', '#f8805a', '#f68d98', '#f68796', '#f6928f', '#f7a581', '#f7b76f', '#f8c361', '#f8bb51', '#f8c458', '#f8bc51', '#f8bc51', '#f8a94c', '#f89248', '#f88846', '#f87e44'];

        function circle(selection) {
            var radius = Math.min(width, height);
            var radii = {
                'sun': radius / 8,
                'earthOrbit': radius / 2.5,
                'rect': Math.sqrt(Math.pow(radius * .8, 2) / 2)
            };
            selection.each(function() {
                // tooltip
                var tooltip = d3.select('body')
                    .append('div')
                    .attr('class', 'tooltip')
                    .style('opacity', 0.0);
                // Space
                var svg = d3.select(this).append('svg')
                    .attr('width', width)
                    .attr('height', height)
                    .style('background-color', backgroundColor)
                    .append('g')
                    .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')
                    .style('background-color', 'red');

                // Area
                if (areaText) {
                    var sun = svg.append('g')
                        .attr('class', 'sun');
                    render(defaultData);
                } else if (areaChart) {
                    // TODO
                }

                // Earth's orbit
                svg.append('circle')
                    .attr('class', 'earthOrbit')
                    .attr('r', radii.earthOrbit)
                    .style('fill', 'none')
                    .style('stroke', orbitColor)
                    .style('stroke-width', orbitWidth);

                // 用最笨的方法模拟圆环渐变
                simulationBlue(theme);

                // Current position of Text in its orbit
                var textOrbitPosition = d3.arc()
                    .outerRadius(radii.earthOrbit + 1)
                    .innerRadius(radii.earthOrbit - 1)
                    .startAngle(2 * Math.PI * 3 / 4)
                    .endAngle(2 * Math.PI);

                if (value) {
                    createRightCircle(value);
                    createLeftText();
                }

                function render(data) {
                    var text = d3.select('.sun')
                        .append('text')
                        .attr('x', 10)
                        .attr('y', -40)
                        .attr('font-size', 40);
                    text.selectAll('tspan')
                        .data(data)
                        .enter()
                        .append('tspan')
                        .attr('x', text.attr('x'))
                        .attr('dy', '1em')
                        .text(function(d) {
                            return d;
                        });
                }

                function createRightCircle(data) {
                    var pack = d3.pack().size([width, height]).padding(1);
                    var root = d3.hierarchy({ children: data })
                        .each(function(d) {
                            if (id = d.data.id) {
                                var id;
                                var i = id.lastIndexOf('.');
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
                        .attr('id', function(d) { return d.id; })
                        .attr('r', function(d, i) {
                            return (
                                radius / 16 * Math.pow(0.92, i));
                        })
                        .style('fill', function(d, i) {
                            if (theme == 'blue') {
                                return blueCircle[i];
                            } else {
                                return orangeCircle[i];
                            }
                        });
                    node.append('clipPath')
                        .attr('id', function(d) { return 'clip-' + d.id; })
                        .append('use')
                        .attr('xlink:href', function(d) { return '#' + d.id; });
                    node.append('text')
                        .attr('clip-path', function(d) { return 'url(#clip-' + d.id + ')'; })
                        .selectAll('tspan')
                        .data(function(d) { return d.class.split(/(?=[A-Z][^A-Z])/g); })
                        .enter()
                        .append('tspan')
                        .attr('x', 0)
                        .attr('y', 12)
                        .style('fill', 'white')
                        .style('font-size', function(d) {
                            return 32;
                        })
                        .text(function(d) { return d; });
                    node.append('title')
                        .text(function(d) { return d.id; });
                    // TODO start
                    node.append('clipPath')
                        .attr('id', function(d) {
                            return 'clip-out' + d.id;
                        })
                        .append('use')
                        .attr('xlink:href', function(d) {
                            return '#' + d.id;
                        });
                    node.append('text')
                        .attr('clip-out-path', function(d) {
                            return 'url(#clip-out' + d.id + ')';
                        })
                        .selectAll('tspan')
                        .data(function(d) { return d.class.split(/(?=[A-Z][^A-Z])/g); })
                        .enter()
                        .append('tspan')
                        .attr('x', 0)
                        .attr('y', function(d, i, nodes) {
                            return 13 + (i - nodes.length / 2 - 0.5) * 10;
                        })
                        .style('fill', 'white')
                        .text(function(d) { return d.name; });
                    // TODO end
                    node.each(function(d, i) {
                        var hudu = (i + 1) * (2 * Math.PI / rad);
                        var X = Math.sin(hudu) * radii.earthOrbit;
                        var Y = Math.cos(hudu) * radii.earthOrbit;
                        d3.select(this).attr('transform', 'translate(' + X + ',' + -Y + ')');

                        d3.select(this).on('click', function(d) {
                            var newData = ['提供数据总量', '提供数据部委总量', '提供数据部委占比'];
                            newData.splice(1, 0, d.data.zongliang);
                            newData.splice(3, 0, d.data.buliang)
                            newData.splice(5, 0, d.data.zhanbi)
                            render(newData);
                        });
                        d3.select(this).on('mouseover', function(d) {
                            tooltip.html(d.data.name + '<br />' +
                                '提供数据' + d.data.zongliang + '<br />' +
                                '提供占比' + d.data.zhanbi + '<br />')
                                .style('left', (d3.event.pageX) + 'px')
                                .style('top', (d3.event.pageY + 20) + 'px')
                                .style('opacity', 1.0);
                        }).on('mousemove', function(d) {
                            tooltip.style('left', (d3.event.pageX) + 'px')
                                .style('top', (d3.event.pageY + 20) + 'px');
                        }).on('mouseout', function(d) {
                            tooltip.style('opacity', 0.0);
                        })
                    });
                }

                function createLeftText() {
                    var circleText = svg.append('g')
                        .attr('class', 'circleText');

                    circleText.append('path')
                        .attr('id', 'curve')
                        .attr('d', textOrbitPosition)
                        .style('fill', 'none');
                    circleText.append('text')
                        .attr('id', 'curve-text-after')
                        .style('font-size', textAfterEdgeSize)
                        .style('color', textAfterEdgeColor)
                        .style('font-weight', 'bold')
                        .attr('dx', '20px')
                        .attr('dy', '-10px')
                        .append('textPath')
                        .attr('xlink:href', '#curve')
                        .style('text-anchor', 'left')
                        .attr('startOffset', '20%')
                        .attr('dominant-baseline', 'text-after-edge')
                        .text(textAfterEdge);
                    circleText.append('text')
                        .attr('id', 'curve-text-before')
                        .style('font-size', textBeforeEdgeSize)
                        .style('color', textBeforeEdgeColor)
                        .style('font-weight', 'bold')
                        .attr('dy', '10px')
                        .append('textPath')
                        .attr('xlink:href', '#curve')
                        .style('text-anchor', 'left')
                        .attr('startOffset', '20%')
                        .attr('dominant-baseline', 'text-before-edge')
                        .style('color', textBeforeEdgeColor)
                        .text(textBeforeEdge);
                }

                function simulationBlue(theme) {
                    if (theme == 'blue') {
                        for (var i = 0; i < blueCircle.length; i++) {
                            svg.append("path").attr("class", "earthOrbitPosition").attr("d", d3.arc().outerRadius(radii.earthOrbit + 2).innerRadius(radii.earthOrbit - 2).startAngle(i * 2 * Math.PI / blueCircle.length).endAngle((i + 1) * 2 * Math.PI / blueCircle.length)).style("fill", blueCircle[i]);
                        }
                    } else {
                        for (var i = 0; i < orangeCircle.length; i++) {
                            svg.append("path").attr("class", "earthOrbitPosition").attr("d", d3.arc().outerRadius(radii.earthOrbit + 2).innerRadius(radii.earthOrbit - 2).startAngle(i * 2 * Math.PI / orangeCircle.length).endAngle((i + 1) * 2 * Math.PI / orangeCircle.length)).style("fill", orangeCircle[i]);
                        }
                    }

                }

            });
        }

        // Getter/setter function
        circle.width = function(_) {
            if (!arguments.length) {
                return width;
            }
            width = _;
            return circle;
        };
        circle.height = function(_) {
            if (!arguments.length) {
                return height;
            }
            height = _;
            return circle;
        };
        circle.value = function(_) {
            if (!arguments.length) {
                return value;
            }
            // TODO
            value = _;
            return circle;
        };
        circle.backgroundColor = function(_) {
            if (!arguments.length) {
                return backgroundColor;
            }
            backgroundColor = _;
            return circle;
        };
        circle.orbitColor = function(_) {
            if (!arguments.length) {
                return orbitColor;
            }
            orbitColor = _;
            return circle;
        };
        circle.orbitWidth = function(_) {
            if (!arguments.length) {
                return orbitWidth;
            }
            orbitWidth = _;
            return circle;
        };
        circle.areaText = function(_) {
            if (!arguments.length) {
                return areaText;
            }
            areaText = _;
            areaChart = !_;
            return circle;
        };
        circle.areaChart = function(_) {
            if (!arguments.length) {
                return areaChart;
            }
            areaChart = _;
            areaText = !_;
            return circle;
        };
        circle.rad = function(_) {
            if (!arguments.length) {
                return rad;
            }
            rad = _;
            return circle;
        };
        circle.textAfterEdge = function(_) {
            if (!arguments.length) {
                return textAfterEdge;
            }
            textAfterEdge = _;
            return circle;
        };
        circle.textAfterEdgeColor = function(_) {
            if (!arguments.length) {
                return textAfterEdgeColor;
            }
            textAfterEdgeColor = _;
            return circle;
        };
        circle.textAfterEdgeSize = function(_) {
            if (!arguments.length) {
                return textAfterEdgeSize;
            }
            textAfterEdgeSize = _;
            return circle;
        };
        circle.textBeforeEdge = function(_) {
            if (!arguments.length) {
                return textBeforeEdge;
            }
            textBeforeEdge = _;
            return circle;
        };
        circle.textBeforeEdgeColor = function(_) {
            if (!arguments.length) {
                return textBeforeEdgeColor;
            }
            textBeforeEdgeColor = _;
            return circle;
        };
        circle.textBeforeEdgeSize = function(_) {
            if (!arguments.length) {
                return textBeforeEdgeSize;
            }
            textBeforeEdgeSize = _;
            return circle;
        };
        circle.theme = function(_) {
            if (!arguments.length) {
                return theme;
            }
            theme = _;
            return circle;
        };

        return circle;
    }

    return window.Circle = Circle;
}));
