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
require('../common/sb-admin-2.js');
require('../common/d3-demo.js');

var d3 = require('d3');

/** d3-ring-double.js demo */
(function () {
  var ringDouble = require('../common/d3-ring-double');

  var value = [
    { id: 0, img: '../../img/sun.png', name: '山东如意集团', mark: 0 },
    { id: 1, img: '../../img/2.png', name: '山东济宁如意毛纺织股份有限公司', mark: 1 },
    { id: 2, img: '../../img/2.png', name: '澳大利亚麦德国际贸易有限公司', mark: 1 },
    { id: 3, img: '../../img/2.png', name: '山东济宁如意进出口有限公司', mark: 1 },
    { id: 4, img: '../../img/2.png', name: '济宁如意投资有限公司', mark: 1 },
    { id: 5, img: '../../img/2.png', name: '济宁如意印染有限公司', mark: 1 },
    { id: 6, img: '../../img/6.png', name: '济宁如意技术咨询有限公司', mark: 1 },
    { id: 7, img: '../../img/2.png', name: '济宁路嘉纳服装有限公司', mark: 1 },
    { id: 8, img: '../../img/2.png', name: '重庆三峡技术纺织有限公司', mark: 1 },
    { id: 9, img: '../../img/2.png', name: '济宁鲁意高新纤维材料有限公司', mark: 1 },
    { id: 10, img: '../../img/2.png', name: '济宁如意针织有限责任公司', mark: 1 },
    { id: 11, img: '../../img/1.png', name: '山东樱花投资控股有限公司', mark: 1 },
    { id: 12, img: '../../img/2.png', name: '山东济宁如意毛纺织股份有限公司', mark: 1 },
    { id: 13, img: '../../img/2.png', name: '金乡金樱棉业有限公司', mark: 1 },
    { id: 14, img: '../../img/2.png', name: '张家港保税区新乐毛纺织造有限公司', mark: 1 },
    { id: 15, img: '../../img/1.png', name: '青岛保税区如意投资有限公司', mark: 1 },
    { id: 16, img: '../../img/1.png', name: '山东邹城建信村镇银行有限公司', mark: 1 },
    { id: 17, img: '../../img/2.png', name: '伊藤忠（中国）集团有限公司', mark: 1 },
    { id: 18, img: '../../img/2.png', name: '临邑澳泰纺织有限公司', mark: 1 },
    { id: 19, img: '../../img/2.png', name: '伊藤忠商株式会社', mark: 1 },
    { id: 20, img: '../../img/2.png', name: '重庆市万州区如意置业有限公司', mark: 1 },
    { id: 21, img: '../../img/2.png', name: '济宁银行股份有限公司', mark: 2 },
    { id: 22, img: '../../img/1.png', name: '新疆嘉和毛纺织有限公司', mark: 2 },
    { id: 23, img: '../../img/2.png', name: '中国东方资管理公司', mark: 2 },
    { id: 24, img: '../../img/2.png', name: '山东如意毛纺织集团总公司进出口总公司', mark: 2 },
    { id: 25, img: '../../img/2.png', name: '内部职工股', mark: 2 },
    { id: 26, img: '../../img/2.png', name: '国家股', mark: 2 },
    { id: 27, img: '../../img/2.png', name: '山东如意置业有限公司', mark: 2 },
    { id: 28, img: '../../img/3.png', name: '澳大利亚麦德国际贸易有限公司', mark: 2 },
    { id: 29, img: '../../img/4.png', name: '郓城圣达如意印染有限公司', mark: 2 },
    { id: 30, img: '../../img/2.png', name: '山东如意数码科技印染有限公司', mark: 2 },
    { id: 31, img: '../../img/2.png', name: '济宁如意印染进出口有限公司', mark: 2 },
    { id: 32, img: '../../img/2.png', name: '邯郸金宝隆印染有限公司', mark: 2 },
    { id: 33, img: '../../img/2.png', name: '航天通信控股集团股份有限公司', mark: 2 },
    { id: 34, img: '../../img/user.png', name: '孙俊贵', mark: 2 },
    { id: 35, img: '../../img/2.png', name: '济宁如意印染有限公司工会委员会', mark: 2 },
    { id: 36, img: '../../img/user.png', name: '顾金照', mark: 2 },
    { id: 37, img: '../../img/user.png', name: '杜爱国', mark: 2 },
    { id: 38, img: '../../img/2.png', name: '宁夏如意国际贸易有限公司', mark: 2 },
    { id: 39, img: '../../img/2.png', name: '青岛如意恒成国际物流有限公司', mark: 2 },
    { id: 40, img: '../../img/2.png', name: '意大利路嘉纳股份公司', mark: 2 },
    { id: 41, img: '../../img/2.png', name: '山东樱花纺织集团有限公司', mark: 2 },
    { id: 42, img: '../../img/2.png', name: '济宁世通物流有限公司', mark: 2 },
    { id: 43, img: '../../img/2.png', name: '济宁永生重工机械制造有限公司', mark: 2 },
    { id: 44, img: '../../img/2.png', name: '山东好德国际能源发展有限公司', mark: 2 },
    { id: 45, img: '../../img/1.png', name: '山东宏河矿业集团有限公司', mark: 2 },
    { id: 46, img: '../../img/2.png', name: '山东省天安矿业有限公司', mark: 2 },
    { id: 47, img: '../../img/5.png', name: '山东天圆汇通科技有限公司', mark: 2 },
    { id: 48, img: '../../img/7.png', name: '兖州煤业股份有限公司', mark: 2 },
    { id: 49, img: '../../img/2.png', name: '中国建设银行股份有限公司', mark: 2 },
    { id: 50, img: '../../img/2.png', name: '重庆市万州区鲁诚商贸有限公司', mark: 2 },
    { id: 51, img: '../../img/2.png', name: '三星物产香港有限公司', mark: 2 },
    { id: 52, img: '../../img/2.png', name: '三星物产株式会社', mark: 2 },
    { id: 53, img: '../../img/2.png', name: '汶上如意技术纺织有限公司', mark: 2 },
    { id: 54, img: '../../img/user.png', name: '李瑞忠', mark: 2 },
    { id: 55, img: '../../img/user.png', name: '沈波', mark: 2 },
    { id: 56, img: '../../img/user.png', name: '王戈', mark: 2 },
    { id: 57, img: '../../img/1.png', name: '济宁市众信服装有限公司', mark: 2 },
    { id: 58, img: '../../img/1.png', name: '澳大利亚麦德公司', mark: 2 },
    { id: 59, img: '../../img/1.png', name: '山东省鲁信投资控股有限公司', mark: 2 },
    { id: 60, img: '../../img/1.png', name: '济宁如意房地产开发有限公司', mark: 2 },
    { id: 61, img: '../../img/1.png', name: '山东振鲁国际旅游航空服务有限公司', mark: 2 },
    { id: 62, img: '../../img/1.png', name: '济宁如意物业管理有限公司', mark: 2 },
    { id: 63, img: '../../img/1.png', name: '银川滨河如意服装有限公司', mark: 2 },
    { id: 64, img: '../../img/1.png', name: '济宁市国有资产管理委员会', mark: 2 },
    { id: 65, img: '../../img/1.png', name: '中国东方资产管理公司', mark: 2 },
    { id: 66, img: '../../img/2.png', name: '无锡市新乐一碳毛纺有限公司', mark: 2 }
  ];
  var links = [
    { source: 0, target: 1 },
    { source: 2, target: 0 },
    { source: 0, target: 3 },
    { source: 4, target: 0 },
    { source: 0, target: 5 },
    { source: 0, target: 6 },
    { source: 0, target: 7 },
    { source: 0, target: 8 },
    { source: 0, target: 9 },
    { source: 0, target: 10 },
    { source: 0, target: 11 },
    { source: 0, target: 12 },
    { source: 0, target: 13 },
    { source: 0, target: 14 },
    { source: 0, target: 15 },
    { source: 0, target: 16 },
    { source: 17, target: 0 },
    { source: 0, target: 18 },
    { source: 19, target: 0 },
    { source: 0, target: 20 },

    { source: 1, target: 21 },
    { source: 22, target: 1 },
    { source: 23, target: 2 },
    { source: 24, target: 2 },
    { source: 25, target: 2 },
    { source: 26, target: 3 },
    { source: 3, target: 27 },
    { source: 4, target: 28 },
    { source: 4, target: 29 },
    { source: 4, target: 30 },
    { source: 4, target: 31 },
    { source: 5, target: 32 },
    { source: 6, target: 33 },
    { source: 6, target: 34 },
    { source: 7, target: 35 },
    { source: 7, target: 36 },
    { source: 7, target: 37 },
    { source: 8, target: 38 },
    { source: 9, target: 39 },
    { source: 9, target: 40 },
    { source: 9, target: 41 },
    { source: 10, target: 42 },
    { source: 10, target: 43 },
    { source: 10, target: 44 },
    { source: 10, target: 45 },
    { source: 10, target: 46 },
    { source: 11, target: 47 },
    { source: 12, target: 48 },
    { source: 12, target: 49 },
    { source: 12, target: 50 },
    { source: 13, target: 51 },
    { source: 14, target: 52 },
    { source: 14, target: 53 },
    { source: 14, target: 54 },
    { source: 14, target: 55 },
    { source: 14, target: 56 },
    { source: 15, target: 57 },
    { source: 16, target: 58 },
    { source: 16, target: 59 },
    { source: 17, target: 60 },
    { source: 17, target: 61 },
    { source: 17, target: 62 },
    { source: 18, target: 63 },
    { source: 19, target: 64 },
    { source: 19, target: 65 },
    { source: 19, target: 66 }
  ];

  var circle1 = ringDouble()
    .width(1280)
    .height(930)
    .backgroundColor('#151617')  //背景色
    .value(value) // 小球数据，默认无
    .link(links) // 小球之间连接线，默认无

    .backgroundColorIn('#13282b')
    .orbitColor(['#5185dd', '#4199ca']) // 小球外切轨道的颜色，默认['#5185dd', '#4199ca']
    .orbitWidth(.5) // 小球外切轨道的宽度，默认1
    .trackBall(20) // 小球外切轨道显示多少个小球，默认12
    .ballSize([60, 60]) // 小球的半径从小到大，默认[12,24]
    .ballTextOutSize(10) // 小球外文字大小，默认12
    .ballTextOutColor('#fff') // 小球外文字颜色
    .firstQuadrantTextAnchor('start')
    .secondQuadrantTextAnchor('start')
    .thirdQuadrantTextAnchor('end')
    .fourthQuadrantTextAnchor('end')

    .backgroundColorOut('#132528')
    .orbitColorOut(['#5185dd', '#4199ca']) //
    .orbitWidthOut(.5) //
    .trackBallOut(50) //
    .ballSizeOut([60, 60]) //
    .ballTextOutSizeOut(12) //
    .ballTextOutColorOut('#fff')
    .firstQuadrantTextAnchorOut('start')
    .secondQuadrantTextAnchorOut('start')
    .thirdQuadrantTextAnchorOut('end')
    .fourthQuadrantTextAnchorOut('end')

    .lightEffectImg('../../img/50_12.png')
    .lightEffectWidth(50)
    .lightEffectHeight(12);


  d3.select('.d3-circle').call(circle1);
})();


/** d3-ring-single.js demo*/
(function () {
  var ringSingle = require('../common/d3-ring-single')
  var value = [
    { id: 1, ranking: 1, name: '猛龙', img: '../../img/nba-1.png' },
    { id: 2, ranking: 2, name: '火箭', img: '../../img/nba-2.png' },
    { id: 3, ranking: 3, name: '凯尔特', img: '../../img/nba-3.png' },
    { id: 4, ranking: 4, name: '超音速', img: '../../img/nba-4.png' },
    { id: 5, ranking: 5, name: '马刺', img: '../../img/nba-5.png' },
    { id: 6, ranking: 6, name: '太阳', img: '../../img/nba-6.png' },
    { id: 7, ranking: 7, name: '森林', img: '../../img/nba-7.png' },
    { id: 8, ranking: 8, name: '开拓者', img: '../../img/nba-8.png' },
    { id: 9, ranking: 9, name: '勇士', img: '../../img/nba-9.png' },
    { id: 10, ranking: 10, name: '奇才', img: '../../img/nba-10.png' },
    { id: 11, ranking: 11, name: '山猫', img: '../../img/nba-11.png' },
    { id: 12, ranking: 12, name: '雄鹿', img: '../../img/nba-12.png' },
    { id: 13, ranking: 13, name: '公牛', img: '../../img/nba-13.png' },
    { id: 14, ranking: 14, name: '骑士', img: '../../img/nba-14.png' },
    { id: 15, ranking: 15, name: '灰熊', img: '../../img/nba-15.png' },
    { id: 16, ranking: 16, name: '快船', img: '../../img/nba-16.png' },
    { id: 17, ranking: 17, name: '鹰', img: '../../img/nba-17.png' },
    { id: 18, ranking: 18, name: '网', img: '../../img/nba-18.png' },
    { id: 19, ranking: 19, name: '热', img: '../../img/nba-19.png' },
    { id: 20, ranking: 20, name: '黄蜂', img: '../../img/nba-20.png' },
    { id: 21, ranking: 21, name: '爵士', img: '../../img/nba-21.png' },
    { id: 22, ranking: 22, name: '国王', img: '../../img/nba-22.png' },
    { id: 23, ranking: 23, name: '尼克斯', img: '../../img/nba-23.png' },
    { id: 24, ranking: 24, name: '湖人', img: '../../img/nba-24.png' },
    { id: 25, ranking: 25, name: '魔术', img: '../../img/nba-25.png' },
    { id: 26, ranking: 26, name: '小牛', img: '../../img/nba-26.png' },
    { id: 27, ranking: 27, name: '76人', img: '../../img/nba-27.png' },
    { id: 28, ranking: 28, name: '掘金', img: '../../img/nba-28.png' },
    { id: 29, ranking: 29, name: '步行者', img: '../../img/nba-29.png' },
    { id: 30, ranking: 30, name: '活塞', img: '../../img/nba-30.png' },
  ]

  var circle1 = ringSingle()
    .value(value.slice(0, 30)) // 小球数据，默认无
    .orbitWidth(10) // 小球外切轨道的宽度，默认1
    .ballNum(30) // 小球外切轨道显示多少个小球，默认12
    .ballSize([15, 35]) // 小球的半径从小到大，默认[12,24]
    .isEquant(false) // 是否等分分布小圆，默认true
    .ballTextOutSize(14) // 小球外文字大小，默认12
    .textPathArc([2 * Math.PI * .85, 2 * Math.PI])
    .textAfterEdge('NBA各队') // 左上角外文字，默认空
    .textAfterEdgeStartOffset('15%') // 左上角外文字开始点，默认0
    .textBeforeEdge('国际球员数量')
    .textBeforeEdgeStartOffset('14%');

  d3.select('.d3-ring-single-1').call(circle1);

  var circle2 = ringSingle()
    .width(720) // 长度，默认720
    .height(720) // 宽度，默认720
    .backgroundColor('#fff') // 画布的背景色，默认#fff
    .value(value.slice(0, 30)) // 小球数据，默认无
    .isClockwise(false) // 小球排列顺序，默认true，顺时针
    .orbitColor(['#5185dd', '#4199ca']) // 小球外切轨道的颜色，默认[]，如果不设置则使用彩虹色
    .orbitWidth(1) // 小球外切轨道的宽度，默认1
    .ballNum(30) // 小球外切轨道显示多少个小球，默认12
    .ballSize([15, 35]) // 小球的半径从小到大，默认[12,24]
    .isEquant(false) // 是否等分分布小圆，默认true
    .ballTextOutSize(14) // 小球外文字大小，默认12
    .firstQuadrantDominantBaseline('text-before-edge') // 第一象限文字基线，默认值'text-before-edge'
    .firstQuadrantTextAnchor('end') // 第一象限文字起点，默认值'end'
    .secondQuadrantDominantBaseline('text-after-edge') // 第二象限文字基线，默认值'text-after-edge'
    .secondQuadrantTextAnchor('end')// 第二象限文字起点，默认值'end'
    .thirdQuadrantDominantBaseline('text-after-edge')// 第三象限文字基线，默认值'text-after-edge'
    .thirdQuadrantTextAnchor('start')// 第三象限文字起点，默认值'start'
    .fourthQuadrantDominantBaseline('text-before-edge')// 第四象限文字基线，默认值'text-before-edge'
    .fourthQuadrantTextAnchor('start')// 第四象限文字起点，默认值'start'
    .textPathArc([0, .25 * Math.PI]) // 文字路径起止，默认[2 * Math.PI * .75, 2 * Math.PI]
    .textAfterEdge('NBA各队') // 左上角外文字，默认空
    .textAfterEdgeColor('#1e518f') // 左上角外文字颜色，默认#000
    .textAfterEdgeSize(30) // 左上角外文字大小，默认24
    .textAfterEdgeStartOffset('14%') // 左上角外文字开始点，默认0
    .textAfterEdgeDominantBaseline('text-after-edge') // 左上角外文字的基线？这个属性没清楚。默认'text-after-edge'
    .textBeforeEdge('国际球员数量') //
    .textBeforeEdgeColor('#1e518f') // 左上角内文字颜色，默认#000
    .textBeforeEdgeSize(18) // 左上角内文字大小，默认18
    .textBeforeEdgeStartOffset('15%') // 左上角内文字开始点，默认0
    .textBeforeEdgeDominantBaseline('text-before-edge'); // 左上角内文字的基线？这个属性没清楚。默认'text-before-edge'
  d3.select('.d3-ring-single-2').call(circle2);
})();
