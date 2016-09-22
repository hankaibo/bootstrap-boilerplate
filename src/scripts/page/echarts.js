/**
 * 引入css文件
 * 支持css,less,scss三种格式
 */
require('bootstrap/dist/css/bootstrap.min.css');
require('metismenu/dist/metisMenu.min.css');
require('font-awesome/css/font-awesome.min.css');
require('../../styles/common/sb-admin-2.css');

/**
 * 引入js
 */
require('jquery/dist/jquery.min.js');
require('bootstrap/dist/js/bootstrap.min.js');
require('metisMenu/dist/metisMenu.min.js');
require('../common/sb-admin-2.js');
var myEchart=require('../common/echarts-data.js');

//
$(function () {
  myEchart.columnChart();
  myEchart.barChart();
  myEchart.dashboardChart();
  myEchart.radarChart();
});