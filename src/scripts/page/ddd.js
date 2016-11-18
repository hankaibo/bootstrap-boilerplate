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
d3.select('#slider1').call(d3.Circle().value(mockData));

d3.select('#slider2').call(d3.slider());
