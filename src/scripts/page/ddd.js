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
require('../common/d3-circle.js');
require('../common/d3-slider.js');

// mockData
var mockData = [
    { "id": "flare.analytics.cluster.1", "value": 1, "name": "AAA" },
    { "id": "flare.analytics.cluster.2", "value": 2, "name": "BBB" },
    { "id": "flare.analytics.cluster.3", "value": 3, "name": "CCC" },
    { "id": "flare.analytics.cluster.4", "value": 4, "name": "DDD" },
    { "id": "flare.analytics.cluster.5", "value": 5, "name": "EEE" },
    { "id": "flare.analytics.cluster.6", "value": 6, "name": "AAA" },
    { "id": "flare.analytics.cluster.7", "value": 7, "name": "BBB" },
    { "id": "flare.analytics.cluster.8", "value": 8, "name": "CCC" },
    { "id": "flare.analytics.cluster.9", "value": 9, "name": "DDD" },
    { "id": "flare.analytics.cluster.10", "value": 10, "name": "EEE" }
];
d3.select('#slider1').call(d3.Circle()
    .backgroundColor('#fff')
    .orbitColor('#5e72f0')
    .orbitWidth('3px')
    .value(mockData)
    // .areaChart(true)
);

// d3.select('#slider2').call(d3.slider());


// function SimpleWidget(spec) {
//     var instance = {};
//     var headline;
//     var description;
//     instance.render = function() {
//         var div = d3.select('.chap1');
//         div.append('h3')
//             .text(headline);
//         div.attr('class', 'box')
//             .attr('style', 'color:' + spec.color)
//             .append('p')
//             .text(description);

//         return instance;
//     }
//     instance.headline = function(h) {
//         if (!arguments.length) {
//             h
//         };
//         headline = h;
//         return instance
//     }
//     instance.description = function(d) {
//         if (!arguments.length) {
//             d
//         };
//         description = d;
//         return instance
//     }

//     return instance;
// }

// var widget = SimpleWidget({ color: '#6495ed' })
//     .headline('Simple widget')
//     .description('Thisisasimplewidgetdemonstratingfunctionaljavascript.')
//     .render();
// console.log(widget.headline());
// // widget.render();

/************** chapter3 ************/
// array-as-data.html
(function() {
    var data = [10, 15, 30, 50, 80, 65, 55, 30, 20, 10, 8];
    function render(data) {
        d3.select('.array-as-data').selectAll('div.h-bar')
            .data(data)
            .enter()
            .append('div')
            .attr('class', 'h-bar')
            .append('span');

        d3.select('.array-as-data').selectAll('div.h-bar')
            .data(data)
            .style('width', function(d) {
                return (d * 3) + 'px';
            })
            .select('span')
            .text(function(d) {
                return d;
            });

        d3.select('array-as-data').selectAll('div.h-bar')
            .data(data)
            .exit()
            .remove();
    }
    setInterval(function() {
        data.shift();
        data.push(Math.round(Math.random() * 100));
        render(data);
    }, 1500);
    render(data);
} ());

// object-as-data.html
(function() {
    var data = [
        { width: 10, color: 23 },
        { width: 15, color: 33 },
        { width: 30, color: 40 },
        { width: 50, color: 60 },
        { width: 80, color: 22 },
        { width: 65, color: 10 },
        { width: 55, color: 5 },
        { width: 30, color: 30 },
        { width: 20, color: 60 },
        { width: 10, color: 90 },
        { width: 8, color: 10 }
    ];
    var colorScale = d3.scaleLinear()
        .domain([0, 100]).range(['#add8e6', 'blue']);
    function render(data) {
        d3.select('.object-as-data').selectAll('div.h-bar')
            .data(data)
            .enter().append('div')
            .attr('class', 'h-bar')
            .append('span');
        d3.select('.object-as-data').selectAll('div.h-bar')
            .data(data)
            .exit()
            .remove();
        d3.select('.object-as-data').selectAll('div.h-bar')
            .data(data)
            .attr('class', 'h-bar')
            .style('width', function(d) {
                return (d.width * 5) + 'px';
            })
            .style('background-color', function(d) {
                return colorScale(d.color);
            })
            .select('span')
            .text(function(d) {
                return d.width;
            });
    }
    function randomValue() {
        return Math.round(Math.random() * 100);
    }
    setInterval(function() {
        data.shift();
        data.push({ width: randomValue(), color: randomValue() });
        render(data);
    }, 1500);
    render(data);
} ());

// function-as-data.html
(function() {
    var data = []; // A
    var next = function(x) { // B
        return 15 + x * x;
    }
    var newData = function() { // C
        data.push(next);
        return data;
    }
    function render() {
        var selection = d3.select('#container')
            .selectAll('div')
            .data(newData); // D
        selection.enter().append('div').append('span');
        selection.exit().remove();
        selection.attr('class', 'v-bar')
            .style('height', function(d, i) {
                return d(i) + 'px';  // E
            })
            .select('span').text(function(d, i) {
                return d(i); // F
            });
    }
    // setInterval(function () {
    //   render();
    // }, 1500);
    // render();
} ());

