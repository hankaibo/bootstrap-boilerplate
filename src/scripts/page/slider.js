/**
 * 引入css文件
 * 支持css,less,scss三种格式
 */
require('bootstrap/dist/css/bootstrap.min.css');
require('metismenu/dist/metisMenu.min.css');
require('font-awesome/css/font-awesome.min.css');
require('ion-rangeslider/css/ion.rangeSlider.css');
require('ion-rangeslider/css/ion.rangeSlider.skinModern.css');
require('../../styles/common/sb-admin-2.scss');

/**
 * 引入js
 */
require('jquery/dist/jquery.min.js');
var moment = require('moment');
moment.locale('zh-cn');
require('bootstrap/dist/js/bootstrap.min.js');
require('metisMenu/dist/metisMenu.min.js');
require('ion-rangeslider/js/ion.rangeSlider.js');
require('../common/sb-admin-2.js');

$(function() {
    $("#range_01").ionRangeSlider();
    $("#range_02").ionRangeSlider({
        min: 100,
        max: 1000,
        from: 550
    });
    $("#range_03").ionRangeSlider({
        type: "double",
        grid: true,
        min: 100,
        max: 1000,
        from: 550,
        to: 800,
        prefix: "$"
    });
    $("#range_04").ionRangeSlider({
        type: "double",
        grid: true,
        min: -1000,
        max: 1000,
        from: -550,
        to: 500
    });
    $("#range_05").ionRangeSlider({
        type: "double",
        grid: true,
        min: -1000,
        max: 1000,
        from: -550,
        to: 500,
        step: 250
    });
    $("#range_06").ionRangeSlider({
        type: "double",
        grid: true,
        min: -12.8,
        max: 12.8,
        from: -3.2,
        to: 3.2,
        step: 0.1
    });
    $("#range_07").ionRangeSlider({
        type: "double",
        grid: true,
        from: 1,
        to: 5,
        values: [0, 10, 100, 1000, 10000, 100000]
    });
    $("#range_08").ionRangeSlider({
        grid: true,
        from: 5,
        values: [
            "zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"
        ]
    });
    $("#range_09").ionRangeSlider({
        grid: true,
        from: 3,
        values: [
            "January", "February", "March",
            "April", "May", "June",
            "July", "August", "September",
            "October", "November", "December"
        ]
    });
    $("#range_10").ionRangeSlider({
        grid: true,
        min: 100,
        max: 1000000,
        from: 1000,
        to: 800,
        prettify_enabled: false
    });
    $("#range_11").ionRangeSlider({
        grid: true,
        min: 1000,
        max: 1000000,
        from: 2000,
        to: 800,
        prettify_enabled: true
    });
    $("#range_12").ionRangeSlider({
        grid: true,
        min: 1000,
        max: 1000000,
        from: 30000,
        to: 1000,
        prettify_enabled: true,
        prettify_separator: "."
    });
    $("#range_13").ionRangeSlider({
        grid: true,
        min: 1000,
        max: 1000000,
        from: 40000,
        to: 1000,
        prettify_enabled: true,
        prettify: function(num) {
            return (Math.random() * num.toFixed(0));
        }
    });
    $("#range_14").ionRangeSlider({
        type: "double",
        grid: true,
        min: 0,
        max: 100000,
        from: 1000,
        step: 9000,
        prefix: "$"
    });
    $("#range_15").ionRangeSlider({
        type: "single",
        grid: true,
        min: -90,
        max: 90,
        from: 0,
        postfix: "°"
    });
    $("#range_16").ionRangeSlider({
        grid: true,
        min: 18,
        max: 70,
        from: 30,
        prefix: "Age ",
        max_postfix: "+"
    });
    $("#range_17").ionRangeSlider({
        type: "double",
        min: 100,
        max: 200,
        from: 145,
        to: 155,
        prefix: "Weight: ",
        postfix: " million pounds",
        decorate_both: true
    });
    $("#range_18").ionRangeSlider({
        type: "double",
        min: 100,
        max: 200,
        from: 145,
        to: 155,
        prefix: "Weight: ",
        postfix: " million pounds",
        decorate_both: false
    });
    $("#range_19").ionRangeSlider({
        type: "double",
        min: +moment().subtract(1, "years").format("X"),
        max: +moment().format("X"),
        from: +moment().subtract(6, "months").format("X"),
        to: +moment().subtract(7, "months").format("X"),
        prettify: function(num) {
            return moment(num, "X").format("LL");
        }
    });

    var $result = $("#result_20");
    function track(data) {
        delete data.input;
        delete data.slider;
        if (JSON) {
            $result.html(JSON.stringify(data, null, 2));
        } else {
            $result.html(data.toString());
        }
    };
    $("#range_20").ionRangeSlider({
        type: "double",
        min: 1000,
        max: 5000,
        from: 2000,
        to: 4000,
        step: 100,
        onStart: function(data) {
            console.log(data);
            track(data);
        },
        onChange: function(data) {
            console.log(data);
            track(data);
        },
        onFinish: function(data) {
            console.log(data);
            track(data);
        },
        onUpdate: function(data) {
            console.log(data);
            track(data);
        }
    });

});
