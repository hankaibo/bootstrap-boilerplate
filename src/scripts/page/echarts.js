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
var echarts = require('echarts');
require('../common/echarts-scatter.js');


// echarts-scatter
var data01 = [[14, 118, 50]];
var data02 = [[52, 120, 50]];
var data03 = [[62, 40, 20]];
var data04 = [[72, 80, 40]];
var data05 = [[82, 10, 10]];
var data06 = [[92, 100, 45]];
var data07 = [[110, 5, 5]];
var data08 = [[111, 20, 50]];
var itemStyle = {
  normal: {
    opacity: 0.8,
    shadowBlur: 10,
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    shadowColor: 'rgba(0, 0, 0, 0.5)'
  }
};
// params
var option = {
  selectId: 'echarts-scatter',
  legend: {
    data: ['北京1', '北京2', '北京3', '北京4', '北京5', '北京6', '北京7', '北京8']
  },
  xAxis: {
    name: '失信企业数量'
  },
  yAxis: {
    name: '失信数量'
  },
  series: [
    { name: '北京1', type: 'scatter', itemStyle: itemStyle, data: data01 },
    { name: '北京2', type: 'scatter', itemStyle: itemStyle, data: data02 },
    { name: '北京3', type: 'scatter', itemStyle: itemStyle, data: data03 },
    { name: '北京4', type: 'scatter', itemStyle: itemStyle, data: data04 },
    { name: '北京5', type: 'scatter', itemStyle: itemStyle, data: data05 },
    { name: '北京6', type: 'scatter', itemStyle: itemStyle, data: data06 },
    { name: '北京7', type: 'scatter', itemStyle: itemStyle, data: data07 },
    { name: '北京8', type: 'scatter', itemStyle: itemStyle, data: data08 }
  ]
}

echarts.Scatter(option);
