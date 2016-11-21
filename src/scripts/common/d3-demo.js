// function SimpleWidget(spec) {
//     var instance = {};
//     var headline;
//     var description;
//     instance.render = function() {
//         var div = d3.select('.chap1');
//         div.append('h3')
//             .text(headline);
//         div.attr('class', 'box')
//             .attr('style', 'color:' + spec.color)
//             .append('p')
//             .text(description);

//         return instance;
//     }
//     instance.headline = function(h) {
//         if (!arguments.length) {
//             h
//         };
//         headline = h;
//         return instance
//     }
//     instance.description = function(d) {
//         if (!arguments.length) {
//             d
//         };
//         description = d;
//         return instance
//     }

//     return instance;
// }

// var widget = SimpleWidget({ color: '#6495ed' })
//     .headline('Simple widget')
//     .description('Thisisasimplewidgetdemonstratingfunctionaljavascript.')
//     .render();
// console.log(widget.headline());
// // widget.render();

/************** chapter3 ************/
// array-as-data.html
(function() {
    var data = [10, 15, 30, 50, 80, 65, 55, 30, 20, 10, 8];
    function render(data) {
        d3.select('.array-as-data').selectAll('div.h-bar')
            .data(data)
            .enter()
            .append('div')
            .attr('class', 'h-bar')
            .append('span');

        d3.select('.array-as-data').selectAll('div.h-bar')
            .data(data)
            .style('width', function(d) {
                return (d * 3) + 'px';
            })
            .select('span')
            .text(function(d) {
                return d;
            });

        d3.select('array-as-data').selectAll('div.h-bar')
            .data(data)
            .exit()
            .remove();
    }
    setInterval(function() {
        data.shift();
        data.push(Math.round(Math.random() * 100));
        render(data);
    }, 1500);
    render(data);
} ());

// object-as-data.html
(function() {
    var data = [
        { width: 10, color: 23 },
        { width: 15, color: 33 },
        { width: 30, color: 40 },
        { width: 50, color: 60 },
        { width: 80, color: 22 },
        { width: 65, color: 10 },
        { width: 55, color: 5 },
        { width: 30, color: 30 },
        { width: 20, color: 60 },
        { width: 10, color: 90 },
        { width: 8, color: 10 }
    ];
    var colorScale = d3.scaleLinear()
        .domain([0, 100]).range(['#add8e6', 'blue']);
    function render(data) {
        d3.select('.object-as-data').selectAll('div.h-bar')
            .data(data)
            .enter().append('div')
            .attr('class', 'h-bar')
            .append('span');
        d3.select('.object-as-data').selectAll('div.h-bar')
            .data(data)
            .exit()
            .remove();
        d3.select('.object-as-data').selectAll('div.h-bar')
            .data(data)
            .attr('class', 'h-bar')
            .style('width', function(d) {
                return (d.width * 5) + 'px';
            })
            .style('background-color', function(d) {
                return colorScale(d.color);
            })
            .select('span')
            .text(function(d) {
                return d.width;
            });
    }
    function randomValue() {
        return Math.round(Math.random() * 100);
    }
    setInterval(function() {
        data.shift();
        data.push({ width: randomValue(), color: randomValue() });
        render(data);
    }, 1500);
    render(data);
} ());

// function-as-data.html
(function() {
    var data = []; // A
    var next = function(x) { // B
        return 15 + x * x;
    }
    var newData = function() { // C
        data.push(next);
        return data;
    }
    function render() {
        var selection = d3.select('#container')
            .selectAll('div')
            .data(newData); // D
        selection.enter().append('div').append('span');
        selection.exit().remove();
        selection.attr('class', 'v-bar')
            .style('height', function(d, i) {
                return d(i) + 'px';  // E
            })
            .select('span').text(function(d, i) {
                return d(i); // F
            });
    }
    // setInterval(function () {
    //   render();
    // }, 1500);
    // render();
} ());
