var d3 = require('d3');

// custom-interpolator.html
(function () {
  d3.interpolate(function (a, b) {
    var re = /^\$([0-9,.]+)$/,
      ma, mb, f = d3.format(',.02f');
    if ((ma = re.exec(a)) && (mb = re.exec(b))) {
      a = parseFloat(ma[1]);
      b = parseFloat(mb[1]) - a;
      return function (t) {
        return '$' + f(a + b * t);
      };
    }
  });
  d3.interpolate(function (a, b) {
    var re = /^([a-z])$/, ma, mb;
    if ((ma = re.exec(a)) && (mb = re.exec(b))) {
      a = a.charCodeAt(0);
      var delta = a - b.charCodeAt(0);
      return function (t) {
        return String.formCharCode(Math.ceil(a - delta * t));
      };
    }
  });

  var dollarScale = d3.scaleLinear()
    .domain([0, 11])
    .range(['$0', '$300']);
  var alphabetScale = d3.scaleLinear()
    .domain([0, 27])
    .range(['a', 'z']);
  function render(scale, selector) {
    var data = [];
    var max = scale.domain()[1];
    for (var i = 0; i < max; ++i) {
      data.push(i);
    }
    d3.select(selector).selectAll('div.cell')
      .data(data)
      .enter()
      .append('div')
      .classed('cell', true)
      .append('span');
    d3.select(selector).selectAll('div.cell')
      .data(data)
      .exit()
      .remove();
    d3.select(selector).selectAll('div.cell')
      .data(data)
      .style('display', 'inline-block')
      .select('span')
      .text(function (d, i) {
        return scale(d);
      });
  }
  render(dollarScale, '#dollar');
  render(alphabetScale, '#alphabet');

})();

// compou-nd-interpolation.html
(function () {
  var max = 21, data = [];
  var compoundScale = d3.scalePow()
    .exponent(2)
    .domain([0, max])
    .range([
      { color: '#add8e6', height: '15px' },
      { color: '#4169e1', height: '150px' }
    ]);
  for (var i = 0; i < max; i++) {
    data.push(i);
  }
  function render(data, scale, selector) {
    d3.select(selector).selectAll('div.v-bar')
      .data(data)
      .enter()
      .append('div')
      .classed('v-bar', true)
      .append('span');
    d3.select(selector).selectAll('div.v-bar')
      .data(data)
      .exit()
      .remove();
    d3.select(selector).selectAll('div.v-bar')
      .data(data)
      .classed('v-bar', true)
      .style('height', function (d, i) {
        return scale(d).height;
      })
      .style('background-color', function (d) {
        return scale(d).color;
      })
      .select('span')
      .text(function (d, i) {
        return i;
      });
  }
  render(data, compoundScale, '#compound');
})();

// color-interpolation.html
(function () {
  var max = 21, data = [];
  var colorScale = d3.scaleLinear()
    .domain([0, max])
    .range(['white', '#4169e1']);
  function divergingScale(pivot) {
    var divergingColorScale = d3.scaleLinear()
      .domain([0, pivot, max])
      .range(['white', '#4169e1', 'white']);
    return divergingColorScale;
  }
  for (var i = 0; i < max; i++) {
    data.push(i);
  }
  function render(data, scale, selector) {
    d3.select(selector).selectAll('div.cell')
      .data(data)
      .enter()
      .append('div')
      .classed('cell', true)
      .append('span');
    d3.select(selector).selectAll('div.cell')
      .data(data)
      .exit()
      .remove();
    d3.select(selector).selectAll('div.cell')
      .data(data)
      .style('display', 'inline-block')
      .style('background-color', function (d, i) {
        return scale(d);
      })
      .select('span')
      .text(function (d, i) {
        return i;
      });
  }
  render(data, colorScale, '#color');
  render(data, divergingScale(5), '#color-diverge');

  document.getElementById('color-interpolation').addEventListener('click', function (e) {
    render(data, divergingScale(e.target.value), '#color-diverge');
  });

})();

// string-interpolation.html
(function () {
  var max = 11, data = [];
  var sizeScale = d3.scaleLinear()
    .domain([0, max])
    .range([
      'italic bold 12px/30px Georgia,serif',
      'italic bold 120px/180px Georgia,serif'
    ]);
  for (var i = 0; i < max; i++) {
    data.push(i);
  }
  function render(data, scale, selector) {
    d3.select(selector).selectAll('div.cell')
      .data(data)
      .enter()
      .append('div')
      .classed('cell', true)
      .append('span');
    d3.select(selector).selectAll('div.cell')
      .data(data)
      .exit()
      .remove();
    d3.select(selector).selectAll('div.cell')
      .data(data)
      .style('display', 'inline-block')
      .select('span')
      .style('font', function (d, i) {
        return scale(d);
      })
      .text(function (d, i) {
        return i;
      });
  }
  render(data, sizeScale, '#font');
})();

// ordinal-scale.html
(function () {
  var max = 10, data = [];
  for (var i = 0; i < max; i++) {
    data.push(i);
  }
  var alphabet = d3.scaleOrdinal()
    .domain(data)
    .range(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']);
  function render(data, scale, selector) {
    d3.select(selector).selectAll('div.cell')
      .data(data)
      .enter()
      .append('div')
      .classed('cell', true);
    d3.select(selector).selectAll('div.cell')
      .data(data)
      .exit()
      .remove();
    d3.select(selector).selectAll('div.cell')
      .data(data)
      .style('display', 'inline-block')
      .style('background-color', function (d) {
        return scale(d).indexOf('#') >= 0 ? scale(d) : 'white';
      })
      .text(function (d) {
        return scale(d);
      });
  }
  render(data, alphabet, '#alphabet');
  render(data, d3.scaleOrdinal(d3.schemeCategory10), '#category10');
  render(data, d3.scaleOrdinal(d3.schemeCategory20), '#category20');
  render(data, d3.scaleOrdinal(d3.schemeCategory20b), '#category20b');
  render(data, d3.scaleOrdinal(d3.schemeCategory20c), '#category20c');

})();

// time-scale.html
(function () {
  var start = new Date(2012, 0, 1),
    end = new Date(2012, 11, 31),
    range = [0, 1200],
    time = d3.scaleTime().domain([start, end])
      .rangeRound(range),
    max = 12,
    data = [];
  for (var i = 0; i < max; i++) {
    var date = new Date(start.getTime());
    date.setMonth(start.getMonth() + i);
    data.push(date);
  }
  function render(data, scale, selector) {
    d3.select(selector).selectAll('div.fixed-cell')
      .data(data)
      .enter()
      .append('div')
      .classed('fixed-cell', true);
    d3.select(selector).selectAll('div.fixed-cell')
      .data(data)
      .exit()
      .remove();
    d3.select(selector).selectAll('div.fixed-cell')
      .data(data)
      .style('margin-left', function (d) {
        return scale(d) + 'px';
      })
      .html(function (d) {
        var format = d3.timeFormat('%x');
        return format(d) + '<br>' + scale(d) + 'px';
      });
  }
  render(data, time, '#time');
} ());

// quantitative-scales.html
(function () {
  var max = 11, data = [];
  for (var i = 1; i < max; i++) {
    data.push(i);
  }
  var linear = d3.scaleLinear()
    .domain([1, 10])
    .range([1, 10]);
  var linearCapped = d3.scaleLinear()
    .domain([1, 10])
    .range([1, 20]);
  var pow = d3.scalePow().exponent(2);
  var powCapped = d3.scalePow()
    .exponent(2)
    .domain([1, 10])
    .rangeRound([1, 10]);
  var log = d3.scaleLog();
  var logCapped = d3.scaleLog()
    .domain([1, 10])
    .rangeRound([1, 10]);
  var f = d3.format('.2f');
  function render(data, scale, selector) {
    d3.select(selector).selectAll('div.cell')
      .data(data)
      .enter()
      .append('div')
      .classed('cell', true);
    d3.select(selector).selectAll('div.cell')
      .data(data)
      .exit()
      .remove();
    d3.select(selector).selectAll('div.cell')
      .data(data)
      .style('display', 'inline-block')
      .text(function (d) {
        return f(scale(d));
      });
  }
  render(data, linear, '#linear');
  render(data, linearCapped, '#linear-capped');
  render(data, pow, '#pow');
  render(data, powCapped, '#pow-capped');
  render(data, log, '#log');
  render(data, logCapped, '#log-capped');
} ());

// asyn-data-load.html
(function () {
  var data = [ // <-A
    { expense: 10, category: "Retail" },
    { expense: 15, category: "Gas" },
    { expense: 30, category: "Retail" },
    { expense: 50, category: "Dining" },
    { expense: 80, category: "Gas" },
    { expense: 65, category: "Retail" },
    { expense: 55, category: "Gas" },
    { expense: 30, category: "Dining" },
    { expense: 20, category: "Retail" },
    { expense: 10, category: "Dining" },
    { expense: 8, category: "Gas" }
  ];
  function render(data) {
    d3.select('.asyn-data-load').select('#chart').selectAll('div.h-bar')
      .data(data)
      .enter()
      .append('div')
      .attr('class', 'h-bar')
      .append('span');
    d3.select('.asyn-data-load').select('#chart').selectAll('div.h-bar')
      .data(data)
      .exit()
      .remove();
    d3.select('.asyn-data-load').select('#chart').selectAll('div.h-bar')
      .data(data)
      .attr('class', 'h-bar')
      .style('width', function (d) {
        return (d.expense * 5) + 'px';
      })
      .select('span')
      .text(function (d) {
        return d.category;
      });
  }
  render(data);
  document.getElementById('asyn-data-load').addEventListener('click', function (e) {
    d3.json('/scripts/data/asyn-data-load.json', function (error, json) {
      data = data.concat(json);
      render(data)
    })
  });

} ());

// data-sort.html
(function () {
  var data = [ // <-A
    { expense: 10, category: "Retail" },
    { expense: 15, category: "Gas" },
    { expense: 30, category: "Retail" },
    { expense: 50, category: "Dining" },
    { expense: 80, category: "Gas" },
    { expense: 65, category: "Retail" },
    { expense: 55, category: "Gas" },
    { expense: 30, category: "Dining" },
    { expense: 20, category: "Retail" },
    { expense: 10, category: "Dining" },
    { expense: 8, category: "Gas" }
  ];
  function render(data, comparator) {
    d3.select('body').select('.data-sort').selectAll('div.h-bar')
      .data(data)
      .enter()
      .append('div')
      .attr('class', 'h-bar')
      .append('span');
    d3.select('body').select('.data-sort').selectAll('div.h-bar')
      .data(data)
      .exit()
      .remove();
    d3.select('body').select('.data-sort').selectAll('div.h-bar')
      .data(data)
      .attr('class', 'h-bar')
      .style('width', function (d) {
        return (d.expense * 5) + 'px';
      })
      .select('span')
      .text(function (d) {
        return d.category;
      })
    if (comparator) {
      d3.select('body').select('.data-sort').selectAll('div.h-bar')
        .sort(comparator);
    }
  }
  var compareByExpense = function (a, b) {
    return a.expense < b.expense ? -1 : 1;
  }
  var compareByCategory = function (a, b) {
    return a.category < b.category ? -1 : 1;
  }
  render(data);

  document.getElementById('data-sort').addEventListener('click', function (e) {
    if (e.target) {
      render(data, e.target.value.trim());
    }
  });
})();

// data-filter.html
(function () {
  var data = [ // <-A
    { expense: 10, category: "Retail" },
    { expense: 15, category: "Gas" },
    { expense: 30, category: "Retail" },
    { expense: 50, category: "Dining" },
    { expense: 80, category: "Gas" },
    { expense: 65, category: "Retail" },
    { expense: 55, category: "Gas" },
    { expense: 30, category: "Dining" },
    { expense: 20, category: "Retail" },
    { expense: 10, category: "Dining" },
    { expense: 8, category: "Gas" }
  ];
  function render(data, category) {
    d3.select('body').select('.data-filter').selectAll('div.h-bar')
      .data(data)
      .enter()
      .append('div')
      .attr('class', 'h-bar')
      .append('span');
    d3.select('body').select('.data-filter').selectAll('div.h-bar')
      .data(data)
      .exit()
      .remove();
    d3.select('body').select('.data-filter').selectAll('div.h-bar')
      .data(data)
      .attr('class', 'h-bar')
      .style('width', function (d) {
        return (d.expense * 5) + 'px';
      })
      .select('span')
      .text(function (d) {
        return d.category;
      })
    d3.select('body').select('.data-filter').selectAll('div.h-bar')
      .filter(function (d, i) {
        return d.category == category;
      })
      .classed('selected', true);
  }
  render(data);

  document.getElementById('data-filter').addEventListener('click', function (e) {
    if (e.target && e.target.nodeName.toUpperCase() == 'BUTTON') {
      render(data, e.target.textContent.trim());
    }
  });
})();

// working-with-array.html
(function () {
  var array = [3, 2, 11, 7, 6, 4, 10, 8, 15];
  d3.select('.working-with-array').select('#min').text(d3.min(array));
  d3.select('.working-with-array').select('#max').text(d3.max(array));
  d3.select('.working-with-array').select('#extent').text(d3.extent(array));
  d3.select('.working-with-array').select('#sum').text(d3.sum(array));
  d3.select('.working-with-array').select('#median').text(d3.median(array));
  d3.select('.working-with-array').select('#mean').text(d3.mean(array));
  d3.select('.working-with-array').select('#asc').text(array.sort(d3.ascending));
  d3.select('.working-with-array').select('#desc').text(array.sort(d3.descending));
  d3.select('.working-with-array').select('#quantile').text(d3.quantile(array.sort(d3.ascending), .25));
  d3.select('.working-with-array').select('#bisect').text(d3.bisect(array.sort(d3.ascending), 6));

  var records = [
    { quantity: 2, total: 190, tip: 100, type: "tab" },
    { quantity: 2, total: 190, tip: 100, type: "tab" },
    { quantity: 1, total: 300, tip: 200, type: "visa" },
    { quantity: 2, total: 90, tip: 0, type: "tab" },
    { quantity: 2, total: 90, tip: 0, type: "tab" },
    { quantity: 2, total: 90, tip: 0, type: "tab" },
    { quantity: 1, total: 100, tip: 0, type: "cash" },
    { quantity: 2, total: 90, tip: 0, type: "tab" },
    { quantity: 2, total: 90, tip: 0, type: "tab" },
    { quantity: 2, total: 90, tip: 0, type: "tab" },
    { quantity: 2, total: 200, tip: 0, type: "cash" },
    { quantity: 1, total: 200, tip: 100, type: "visa" }
  ];

  var nest = d3.nest()
    .key(function (d) {
      return d.type;
    })
    .key(function (d) {
      return d.tip;
    })
    .entries(records);
  d3.select('#nest').html(printNest(nest, ''));
  function printNest(nest, out, i) {
    if (i === undefined) { i = 0; }
    var tab = '';
    for (var j = 0; j < i; j++) {
      tab += ' ';
    }
    nest.forEach(function (e) {
      if (e.key) {
        out += tab + e.key + '<br>';
      } else {
        out += tab + printObject(e) + '<br>';
      }
      if (e.values) {
        out = printNest(e.values, out, ++i);
      } else {
        return out;
      }
    });
    return out;
  }
  function printObject(obj) {
    var s = '{';
    for (var f in obj) {
      s += f + ': ' + obj[f] + ', ';
    }
    s += '}';
    return s;
  }
})();

// function-as-data.html
(function () {
  var data = []; // A
  var next = function (x) { // B
    return 15 + x * x;
  }
  var newData = function () { // C
    data.push(next);
    return data;
  }
  function render() {
    var selection = d3.select('.function-as-data')
      .selectAll('div')
      .data(newData); // D
    selection.enter().append('div').append('span');
    selection.exit().remove();
    selection.attr('class', 'v-bar')
      .style('height', function (d, i) {
        return d(i) + 'px';  // E
      })
      .select('span').text(function (d, i) {
        return d(i); // F
      });
  }
  setInterval(function () {
    render();
  }, 1500000);
  render();
} ());

// object-as-data.html
(function () {
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
      .enter()
      .append('div')
      .attr('class', 'h-bar')
      .append('span');
    // console.log(d3.select('.object-as-data').selectAll('div.h-bar').data(data).exit());
    d3.select('.object-as-data').selectAll('div.h-bar')
      .data(data)
      .exit()
      .remove();
    d3.select('.object-as-data').selectAll('div.h-bar')
      .data(data)
      .attr('class', 'h-bar')
      .style('width', function (d) {
        return (d.width * 5) + 'px';
      })
      .style('background-color', function (d) {
        return colorScale(d.color);
      })
      .select('span')
      .text(function (d) {
        return d.width;
      });
  }
  function randomValue() {
    return Math.round(Math.random() * 100);
  }
  setInterval(function () {
    data.shift();
    data.push({ width: randomValue(), color: randomValue() });
    render(data);
  }, 1500);
  render(data);
} ());

// array-as-data.html
(function () {
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
      .style('width', function (d) {
        return (d * 3) + 'px';
      })
      .select('span')
      .text(function (d) {
        return d;
      });

    // console.log(d3.select('.array-as-data').selectAll('div.h-bar').data(data).exit());
    d3.select('array-as-data').selectAll('div.h-bar')
      .data(data)
      .exit()
      .remove();
  }
  setInterval(function () {
    data.shift();
    data.push(Math.round(Math.random() * 100));
    render(data);
  }, 1500);
  render(data);
} ());

// raw-function.html
-function () {
  var rows = d3.select('.raw-selection').selectAll('tr');
  var headerElement = rows._groups[0][0];
  d3.select(headerElement).attr('class', 'table-header');
  d3.select(rows._groups[0][1]).attr('class', 'table-row-odd');
  d3.select(rows._groups[0][2]).attr('class', 'table-row-even');
  d3.select(rows._groups[0][3]).attr('class', 'table-row-odd');
} ();

// function-chain.html
+function () {
  var body = d3.select('body');
  body.select('.function-chain').append('section')
    .attr('id', 'section1')
    .append('div')
    .attr('class', 'blue box')
    .append('p')
    .text('dynamic blue box');
  body.select('.function-chain').append('section')
    .attr('id', 'section2')
    .append('div')
    .attr('class', 'red box')
    .append('p')
    .text('dynamic red box');
} ();

// sub-selection.html
void function () {
  d3.select('.sub-selection').select('#section1  div')
    .attr('class', 'blue box');
  d3.select('.sub-selection').select('#section2').select('div')
    .attr('class', 'red box');
} ();

// selection-iteration.httml
(function () {
  d3.select('.selection-iteration').selectAll('div')
    .attr('class', 'red box')
    .each(function (d, i) {
      d3.select(this).append('h1').text(i);
    });
} ());

// multiple-selection.html
(function () {
  d3.select('.multiple-selection').selectAll('div')
    .attr('class', 'red box');
} ());

// single-selection.html
(function () {
  d3.select('.single-selection').select('p#target').text('hello world');
  // attr
  d3.select('.single-selection').select('p#target').attr('foo', 'goo');
  console.log('attr foo:' + d3.select('.single-selection').select('p#target').attr('foo'));
  // classed
  console.log('classed goo:' + d3.select('.single-selection').select('p#target').classed('goo'));
  d3.select('.single-selection').select('p#target').classed('goo', 'true');
  console.log('classed goo:' + d3.select('.single-selection').select('p#target').classed('goo'));
  d3.select('.single-selection').select('p#target').classed('goo', function () {
    return false;
  });
  console.log('classed goo:' + d3.select('.single-selection').select('p#target').classed('goo'));
  // style
  console.log('style font-size:' + d3.select('.single-selection').select('p#target').style('font-size'));
  d3.select('.single-selection').select('p#target').style('font-size', '9px');
  console.log('style font-size:' + d3.select('.single-selection').select('p#target').style('font-size'));
  // text
  console.log('text text:' + d3.select('.single-selection').select('p#target').text());
  d3.select('.single-selection').select('p#target').text('hello');
  console.log('text text:' + d3.select('.single-selection').select('p#target').text());
  // html
  console.log('httml html:' + d3.select('.single-selection').select('p#target').html());
  d3.select('.single-selection').select('p#target').html('<b>Hello</b>');
  console.log('httml html:' + d3.select('.single-selection').select('p#target').text());
})();

// functional-js.html
(function () {
  function SimpleWidget(spec) {
    var instance = {};
    var headline;
    var description;
    instance.render = function () {
      var div = d3.select('body').select('.functional-js').append('div');
      div.append('h3').text(headline);
      div.attr('class', 'box')
        .attr('style', 'color:' + spec.color)
        .append('p')
        .text(description);
      return instance;
    };
    instance.headline = function (h) {
      if (!arguments.length) {
        h
      };
      headline = h;
      return instance;
    };
    instance.description = function (d) {
      if (!arguments.length) {
        d
      };
      description = d;
      return instance;
    };
    return instance;
  }

  var widget = SimpleWidget({ color: '#6495ed' })
    .headline('Simple widget')
    .description('This is a simple widget demonstrating functional javascript.');

  widget.render();
})();
