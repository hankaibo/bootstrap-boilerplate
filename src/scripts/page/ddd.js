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

var d3 = require('d3');
require('../common/d3-circle.js');
require('../common/d3-progress-radial.js');

d3.select('.d3-progress-radial').call(
    d3.progressRadial()
        .backgroundColor('#4f4f4f')
        .startPosition(2)
        .isFilter(true)
);

var value = [
    { id: 1, ranking: 1, name: '猛龙' },
    { id: 2, ranking: 2, name: '火箭' },
    { id: 3, ranking: 3, name: '凯尔特' },
    { id: 4, ranking: 4, name: '超音速' },
    { id: 5, ranking: 5, name: '马刺' },
    { id: 6, ranking: 6, name: '太阳' },
    { id: 7, ranking: 7, name: '森林' },
    { id: 8, ranking: 8, name: '开拓者' },
    { id: 9, ranking: 9, name: '勇士' },
    { id: 10, ranking: 10, name: '奇才' },
    { id: 11, ranking: 11, name: '山猫' },
    { id: 12, ranking: 12, name: '雄鹿' },
    { id: 13, ranking: 13, name: '公牛' },
    { id: 14, ranking: 14, name: '骑士' },
    { id: 15, ranking: 15, name: '灰熊' },
    { id: 16, ranking: 16, name: '快船' },
    { id: 17, ranking: 17, name: '鹰' },
    { id: 18, ranking: 18, name: '网' },
    { id: 19, ranking: 19, name: '热' },
    { id: 20, ranking: 20, name: '黄蜂' },
    { id: 21, ranking: 21, name: '爵士' },
    { id: 22, ranking: 22, name: '国王' },
    { id: 23, ranking: 23, name: '尼克斯' },
    { id: 24, ranking: 24, name: '湖人' },
    { id: 25, ranking: 25, name: '魔术' },
    { id: 26, ranking: 26, name: '小牛' },
    { id: 27, ranking: 27, name: '76人' },
    { id: 28, ranking: 28, name: '掘金' },
    { id: 29, ranking: 29, name: '步行者' },
    { id: 30, ranking: 30, name: '活塞' }
]

var circle1 = d3.circle()
    .value(value.slice(0, 30)) // 小球数据，默认无
    .orbitColor(['#5185dd', '#4199ca']) // 小球外切轨道的颜色，默认['#5185dd', '#4199ca']
    .orbitWidth(1) // 小球外切轨道的宽度，默认1
    .trackBall(30) // 小球外切轨道显示多少个小球，默认12
    .ballSize([15, 35]) // 小球的半径从小到大，默认[12,24]
    .isEquant(false) // 是否等分分布小圆，默认true
    .ballTextOutSize(14) // 小球外文字大小，默认12
    .textPathArc([2 * Math.PI * .85, 2 * Math.PI])
    .textAfterEdge('NBA各队') // 左上角外文字，默认空
    .textAfterEdgeStartOffset('15%') // 左上角外文字开始点，默认0
    .textBeforeEdge('国际球员数量')
    .textBeforeEdgeStartOffset('14%');

d3.select('.d3-circle-1').call(circle1);

var circle2 = d3.circle()
    .width(720) // 长度，默认720
    .height(720) // 宽度，默认720
    .backgroundColor('#fff') // 画布的背景色，默认#fff
    .value(value.slice(0, 30)) // 小球数据，默认无
    .isClockwise(false) // 小球排列顺序，默认true，顺时针
    .orbitColor(['#5185dd', '#4199ca']) // 小球外切轨道的颜色，默认['#5185dd', '#4199ca']
    .orbitWidth(2) // 小球外切轨道的宽度，默认1
    .trackBall(30) // 小球外切轨道显示多少个小球，默认12
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
d3.select('.d3-circle-2').call(circle2);
