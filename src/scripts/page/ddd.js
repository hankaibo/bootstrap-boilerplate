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
// require('../common/d3-demo.js');

var d3 = require('d3');
require('../common/d3-circle.js');

var value = [
    { id: 1, ranking: 1, name: '猛龙' },
    { id: 2, ranking: 2, name: '火箭' },
    { id: 3, ranking: 3, name: '76人' },
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
    { id: 15, ranking: 15, name: '凯尔特' },
    { id: 16, ranking: 16, name: '快船' },
    { id: 17, ranking: 17, name: '灰熊' },
    { id: 18, ranking: 18, name: '鹰' },
    { id: 19, ranking: 19, name: '热' },
    { id: 20, ranking: 20, name: '黄蜂' },
    { id: 21, ranking: 21, name: '爵士' },
    { id: 22, ranking: 22, name: '国王' },
    { id: 23, ranking: 23, name: '尼克斯' },
    { id: 24, ranking: 24, name: '湖人' },
    { id: 25, ranking: 25, name: '魔术' },
    { id: 26, ranking: 26, name: '小牛' },
    { id: 27, ranking: 27, name: '网' },
    { id: 28, ranking: 28, name: '掘金' },
    { id: 29, ranking: 29, name: '步行者' },
    { id: 30, ranking: 30, name: '活塞' },
]

d3.select('.d3-circle').call(d3.circle()
    .width(680)
    .height(680)
    .backgroundColor('#333')
    .value(value.splice(0, 10))
    .orbitColor(['#1e518f', '#b8d7fc'])
    .orbitWidth(3)
    .trackBall(16)
    .ballSize([5, 45])
    .textAfterEdge('AAAAAAAAA')
    .textAfterEdgeColor('#1e518f')
    .textAfterEdgeSize(20)
    .textAfterEdgeStartOffset('20%')
    .textAfterEdgeDxDy(['15px', '-5px'])
    .textAfterEdgeDominantBaseline('text-after-edge')
    .textBeforeEdge('AAAAAAA')
    .textBeforeEdgeColor('#1e518f')
    .textBeforeEdgeSize(20)
    .textBeforeEdgeStartOffset('20%')
    .textBeforeEdgeDxDy(['30px', '5px'])
    .textBeforeEdgeDominantBaseline('text-before-edge')
);
