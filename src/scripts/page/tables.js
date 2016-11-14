/**
 * 引入css文件
 * 支持css,less,scss三种格式
 */
require('bootstrap/dist/css/bootstrap.min.css');
require('datatables-bootstrap/css/dataTables.bootstrap.css');
require('datatables-responsive/css/responsive.dataTables.scss');
require('metismenu/dist/metisMenu.min.css');
require('font-awesome/css/font-awesome.min.css');
require('../../styles/common/sb-admin-2.scss');

/**
 * 引入js
 */
require('jquery');
require('bootstrap');
require('metisMenu');
require('datatables/media/js/jquery.dataTables.min.js');
require('datatables-bootstrap/js/dataTables.bootstrap.min.js');
/* require('datatables-responsive/js/dataTables.responsive.js'); //TODO with error */
require('../common/sb-admin-2.js');


$(document).ready(function () {
  $('#dataTables-example').DataTable({
    responsive: true
  });
});
