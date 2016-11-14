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
require('../common/sb-admin-2.js');

//
$(function () {
  function parse(spec,id) {
    vg.parse.spec(spec, function (error, chart) {
      chart({ el: id }).update();
    });
  }
  parse("../scripts/data/stacked_area.json","#D3-column-chart");
});
