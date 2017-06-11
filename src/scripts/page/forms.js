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

// tooltip demo
$('.tooltip-demo').tooltip({
  selector: '[data-toggle=tooltip]',
  container: 'body'
})

// popover demo
$('[data-toggle=popover]').popover()
