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
  { "id": "flare.analytics.cluster.1", "value": 1, "name": "AAA", "zongliang": 123, "buliang": 23, "zhanbi": '73%' },
  { "id": "flare.analytics.cluster.2", "value": 2, "name": "BBB", "zongliang": 234, "buliang": 263, "zhanbi": '23%' },
  { "id": "flare.analytics.cluster.3", "value": 3, "name": "CCC", "zongliang": 5234, "buliang": 243, "zhanbi": '83%' },
  { "id": "flare.analytics.cluster.4", "value": 4, "name": "DDD", "zongliang": 234, "buliang": 236, "zhanbi": '63%' },
  { "id": "flare.analytics.cluster.5", "value": 5, "name": "EEE", "zongliang": 64, "buliang": 623, "zhanbi": '53%' },
  { "id": "flare.analytics.cluster.6", "value": 6, "name": "AAA", "zongliang": 15, "buliang": 123, "zhanbi": '24%' },
  { "id": "flare.analytics.cluster.7", "value": 7, "name": "BBB", "zongliang": 745, "buliang": 263, "zhanbi": '29%' },
  { "id": "flare.analytics.cluster.8", "value": 8, "name": "CCC", "zongliang": 744, "buliang": 423, "zhanbi": '73%' },
  { "id": "flare.analytics.cluster.9", "value": 9, "name": "DDD", "zongliang": 942, "buliang": 236, "zhanbi": '28%' },
  { "id": "flare.analytics.cluster.10", "value": 10, "name": "EEE" }
];
d3.select('#slider1').call(d3.Circle()
  .backgroundColor('#fff')
  .orbitColor('#5e72f0')
  .orbitWidth('3px')
  .value(mockData)
  // .areaChart(true)
  .rad(16)
  .textAfterEdge('济宁公共信息平台')
  .textAfterEdgeSize(52)
  .textAfterEdgeColor('orange')
  .textBeforeEdge('数据提供排行榜TOP10')
  .textBeforeEdgeSize(20)
  .textBeforeEdgeColor('orange')
);

// d3.select('#slider2').call(d3.slider());
