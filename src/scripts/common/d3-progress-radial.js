/** d3进度条圆环版 */
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
    function progressRadial() {
        // Public variables with default settings
        var width = 320;
        var height = 320;
        var backgroundColor = '#fff';
        var innerRadius = 100;
        var outerRadius = 105;
        var colors = {
            'pink': '#e1499a',
            'yellow': '#f0ff08',
            'green': '#47e495'
        };
        var isFilter = true;
        var startPosition = 0;
        var arcBackFill = '#ccc';
        var arcBackFillOpacity = .5;
        var arcFrontFill = '#e1499a';
        var arcFrontFillOpacity = 1;
        var arcFilterOpacity = 1;
        var arcFilterStrokeWidth = 5;
        var numberTextColor = '#fff';
        var numberTextSize = '12';
        var startPercent = 0;
        var endPercent = .85;

        // Private variables
        var color = colors.pink;
        var twoPI = Math.PI * 2;
        var formatPercent = d3.format('.0%');
        var count = Math.abs((endPercent - startPercent) / .01);
        var step = endPercent < startPercent ? -.01 : .01;

        function chart(selection) {
            selection.each(function() {
                var arcBack = d3.arc()
                    .startAngle(0)
                    .endAngle(twoPI)
                    .innerRadius(innerRadius)
                    .outerRadius(outerRadius);
                var arcFront = d3.arc()
                    .startAngle((startPosition / 12) * twoPI)
                    .innerRadius(innerRadius)
                    .outerRadius(outerRadius);

                var svg = d3.select(this).append('svg')
                    .attr('width', width)
                    .attr('height', height)
                    .style('background-color', backgroundColor)
                    .append('g')
                    .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

                var meter = svg.append('g')
                    .attr('class', 'progress-meter');
                meter.append('path')
                    .attr('class', 'background')
                    .attr('fill', arcBackFill)
                    .attr('fill-opacity', arcBackFillOpacity)
                    .attr('d', arcBack);
                // 使用滤镜
                if (isFilter) {
                    var defs = svg.append('defs');
                    var filter = defs.append('filter')
                        .attr('id', generateUUID);
                    filter.append('feGaussianBlur')
                        .attr('in', 'SourceGraphic')
                        .attr('stdDeviation', '7');
                    var arcFilter = meter.append('path')
                        .attr('class', 'arcFilter')
                        .attr('fill', arcFrontFill)
                        .attr('fill-opacity', arcFilterOpacity)
                        .attr('stroke', arcFrontFill)
                        .attr('stroke-width', arcFilterStrokeWidth)
                        .attr('stroke-opacity', arcFilterOpacity)
                        .attr('filter', 'url(#' + filter.attr('id') + ')');
                }

                var foreground = meter.append('path')
                    .attr('class', 'foreground')
                    .attr('fill', arcFrontFill)
                    .attr('fill-opacity', arcFrontFillOpacity);

                var numberText = meter.append('text')
                    .attr('fill', numberTextColor)
                    .attr('text-anchor', 'middle')
                    .attr('dy', '.35em')
                    .style('font-size', numberTextSize);

                function updateProgress(progress) {
                    arcFilter.attr('d', arcFront.endAngle(twoPI * progress));
                    foreground.attr('d', arcFront.endAngle(twoPI * progress));
                    numberText.text(formatPercent(progress));
                }
                var progress = startPercent;
                (function loops() {
                    updateProgress(progress);

                    if (count > 0) {
                        count--;
                        progress += step;
                        setTimeout(loops, 10);
                    }
                })();

                function generateUUID() {
                    var d = new Date().getTime();
                    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                        var r = (d + Math.random() * 16) % 16 | 0;
                        d = Math.floor(d / 16);
                        return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
                    });
                    return uuid;
                };
            });
        }
        // Getter/setter function
        chart.width = function(_) {
            if (!arguments.length) {
                return width;
            }
            width = _;
            return chart;
        };
        chart.height = function(_) {
            if (!arguments.length) {
                return height;
            }
            height = _;
            return chart;
        };
        chart.backgroundColor = function(_) {
            if (!arguments.length) {
                return backgroundColor;
            }
            backgroundColor = _;
            return chart;
        };
        chart.innerRadius = function(_) {
            if (!arguments.length) {
                return innerRadius;
            }
            innerRadius = _;
            return chart;
        }
        chart.outerRadius = function(_) {
            if (!arguments.length) {
                return outerRadius;
            }
            outerRadius = _;
            return chart;
        }
        chart.colors = function(_) {
            if (!arguments.length) {
                return colors;
            }
            colors = _;
            return chart;
        }
        chart.isFilter = function(_) {
            if (!arguments.length) {
                return isFilter;
            }
            isFilter = _;
            return chart;
        }
        chart.startPosition = function(_) {
            if (!arguments.length) {
                return startPosition;
            }
            startPosition = _;
            return chart;
        }
        chart.arcBackFill = function(_) {
            if (!arguments.length) {
                return arcBackFill;
            }
            arcBackFill = _;
            return chart;
        }
        chart.arcBackFillOpacity = function(_) {
            if (!arguments.length) {
                return arcBackFillOpacity;
            }
            arcBackFillOpacity = _;
            return chart;
        }
        chart.arcFilterColor = function(_) {
            if (!arguments.length) {
                return arcFilterColor;
            }
            arcFilterColor = _;
            return chart;
        }
        chart.arcFilterOpacity = function(_) {
            if (!arguments.length) {
                return arcFilterOpacity;
            }
            arcFilterOpacity = _;
            return chart;
        }
        chart.arcFilterStrokeWidth = function(_) {
            if (!arguments.length) {
                return arcFilterStrokeWidth;
            }
            arcFilterStrokeWidth = _;
            return chart;
        }

        return chart;
    }
    return d3.progressRadial = progressRadial;
}));
