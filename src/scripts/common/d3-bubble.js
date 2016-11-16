/**
 * 本模块来源于https://github.com/malei0311/d3-bubble-cloud.git，对其进行v4改造。
 */
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['d3'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('d3'));
    } else {
        root.returnExports = factory(root.d3);
    }
} (this, function(d3) {
    function bubble() {
        "use strict";


    }
    return d3.bubble = bubble;
}));
