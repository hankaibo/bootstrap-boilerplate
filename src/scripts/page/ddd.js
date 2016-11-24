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
d3.select('#slider1').call(Circle()
  .width(640) // 宽度
  .height(480) // 高度
  .backgroundColor('#fff') // 背景色
  .orbitWidth('5px') // 圆环宽度
  .value(mockData) // 数据
  .rad(16) // 圆环可以放几个小圆，默认16个。
  .textAfterEdge('济宁市公共信息平台') // 左上外文字
  .textAfterEdgeSize(28) // 大小
  .textAfterEdgeColor('orange') // 颜色，请注意与主题色相近
  .textBeforeEdge('数据提供排行榜TOP10') // 左上内文字
  .textBeforeEdgeSize(24) // 大小
  .textBeforeEdgeColor('orange') // 颜色，请注意与主题色相近
  .theme('blue') // 主题色，支持blue 和orange
);
d3.select('#slider2').call(Circle()
  .width(640) // 宽度
  .height(480) // 高度
  .backgroundColor('#fff') // 背景色
  .orbitWidth('5px') // 圆环宽度
  .value(mockData) // 数据
  .rad(16) // 圆环可以放几个小圆，默认16个。
  .textAfterEdge('济宁市公共信息平台') // 左上外文字
  .textAfterEdgeSize(28) // 大小
  .textAfterEdgeColor('orange') // 颜色，请注意与主题色相近
  .textBeforeEdge('数据提供排行榜TOP10') // 左上内文字
  .textBeforeEdgeSize(24) // 大小
  .textBeforeEdgeColor('orange') // 颜色，请注意与主题色相近
  .theme('orange') // 主题色，支持blue 和orange
);
// d3.select('#slider2').call(d3.slider());
