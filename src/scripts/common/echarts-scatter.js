(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['echarts'], factory);
  } else if (typeof exports === 'object' && module.exports) {
    module.exports = factory(require('echarts'));
  } else {
    root.returnExports = factory(root.echarts);
  }
} (this, function (echarts) {
  // exposed methods
  function Scatter(params) {
    "use strict";
    // 指定图表的配置项和数据
    var schema = [
      { name: 'date', index: 0, text: '日' },
      { name: 'AQIindex', index: 1, text: '失信企业行业占比' },
      { name: 'PM25', index: 2, text: '失信5次企业数量' }
    ];
    var itemStyle = {
      normal: {
        opacity: 0.8,
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        shadowColor: 'rgba(0, 0, 0, 0.5)'
      }
    };
    var option = {
      backgroundColor: '',
      color: [
        '#fe3333', '#db0a5b', '#9a12b4', '#244ed8', '#188efc', '#00ffba'
      ],
      legend: {
        orient: 'vertical',
        x: 'right',
        y: 'center',
        borderColor: '#38aeff',
        borderWidth: 2,
        padding: [12, 20, 12, 20],
        data: [],
        textStyle: {
          color: '#717171',
          fontSize: 16
        }
      },
      grid: {
        x: '10%',
        x2: 150,
        y: '18%',
        y2: '10%'
      },
      tooltip: {
        padding: 10,
        backgroundColor: '#666',
        borderColor: '#666',
        borderWidth: 1,
        formatter: function (obj) {
          var value = obj.value;
          return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">'
            + obj.seriesName
            + '</div>'
            + schema[1].text + '：' + value[1] + '<br>'
            + schema[2].text + '：' + value[2] + '<br>';
        }
      },
      xAxis: {
        type: 'value',
        name: '失信企业数量',
        nameGap: 16,
        nameTextStyle: {
          color: '#717171',
          fontSize: 14
        },
        max: 150,
        splitLine: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: '#cbcbcb'
          }
        }
      },
      yAxis: {
        type: 'value',
        name: '失信数量',
        nameLocation: 'end',
        nameGap: 20,
        nameTextStyle: {
          color: '#717171',
          fontSize: 16
        },
        axisLine: {
          lineStyle: {
            color: '#cbcbcb'
          }
        },
        splitLine: {
          show: false
        }
      },
      visualMap: [
        {
          left: 'right',
          top: '0',
          dimension: 2,
          min: 0,
          max: 100,
          itemWidth: 30,
          itemHeight: 120,
          calculable: true,
          precision: 0.1,
          text: ['圆形大小：行业占比'],
          textGap: 30,
          textStyle: {
            color: '#000'
          },
          inRange: {
            symbolSize: [10, 70]
          },
          outOfRange: {
            symbolSize: [10, 70],
            color: ['rgba(255,255,255,.2)']
          },
          controller: {
            inRange: {
              color: ['#c23531']
            },
            outOfRange: {
              color: ['#444']
            }
          }
        }
      ],
      series: [
      ]
    };

    option = $.extend(true, option, params);
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById(option.selectId));

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  }

  return echarts.Scatter = Scatter;
}));
