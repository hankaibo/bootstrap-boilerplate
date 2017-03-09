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
    var re = /^([a-z])$/,
      ma, mb;
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
  var max = 21,
    data = [];
  var compoundScale = d3.scalePow()
    .exponent(2)
    .domain([0, max])
    .range([{
        color: '#add8e6',
        height: '15px'
      },
      {
        color: '#4169e1',
        height: '150px'
      }
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
  var max = 21,
    data = [];
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
  var max = 11,
    data = [];
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
  var max = 10,
    data = [];
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
  render(data, alphabet, '#alphabetOrdinal');
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
}());

// quantitative-scales.html
(function () {
  var max = 11,
    data = [];
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
}());

// asyn-data-load.html
(function () {
  var data = [ // <-A
    {
      expense: 10,
      category: 'Retail'
    },
    {
      expense: 15,
      category: 'Gas'
    },
    {
      expense: 30,
      category: 'Retail'
    },
    {
      expense: 50,
      category: 'Dining'
    },
    {
      expense: 80,
      category: 'Gas'
    },
    {
      expense: 65,
      category: 'Retail'
    },
    {
      expense: 55,
      category: 'Gas'
    },
    {
      expense: 30,
      category: 'Dining'
    },
    {
      expense: 20,
      category: 'Retail'
    },
    {
      expense: 10,
      category: 'Dining'
    },
    {
      expense: 8,
      category: 'Gas'
    }
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

}());

// data-sort.html
(function () {
  var data = [ // <-A
    {
      expense: 10,
      category: 'Retail'
    },
    {
      expense: 15,
      category: 'Gas'
    },
    {
      expense: 30,
      category: 'Retail'
    },
    {
      expense: 50,
      category: 'Dining'
    },
    {
      expense: 80,
      category: 'Gas'
    },
    {
      expense: 65,
      category: 'Retail'
    },
    {
      expense: 55,
      category: 'Gas'
    },
    {
      expense: 30,
      category: 'Dining'
    },
    {
      expense: 20,
      category: 'Retail'
    },
    {
      expense: 10,
      category: 'Dining'
    },
    {
      expense: 8,
      category: 'Gas'
    }
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
    {
      expense: 10,
      category: 'Retail'
    },
    {
      expense: 15,
      category: 'Gas'
    },
    {
      expense: 30,
      category: 'Retail'
    },
    {
      expense: 50,
      category: 'Dining'
    },
    {
      expense: 80,
      category: 'Gas'
    },
    {
      expense: 65,
      category: 'Retail'
    },
    {
      expense: 55,
      category: 'Gas'
    },
    {
      expense: 30,
      category: 'Dining'
    },
    {
      expense: 20,
      category: 'Retail'
    },
    {
      expense: 10,
      category: 'Dining'
    },
    {
      expense: 8,
      category: 'Gas'
    }
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

  var records = [{
      quantity: 2,
      total: 190,
      tip: 100,
      type: 'tab'
    },
    {
      quantity: 2,
      total: 190,
      tip: 100,
      type: 'tab'
    },
    {
      quantity: 1,
      total: 300,
      tip: 200,
      type: 'visa'
    },
    {
      quantity: 2,
      total: 90,
      tip: 0,
      type: 'tab'
    },
    {
      quantity: 2,
      total: 90,
      tip: 0,
      type: 'tab'
    },
    {
      quantity: 2,
      total: 90,
      tip: 0,
      type: 'tab'
    },
    {
      quantity: 1,
      total: 100,
      tip: 0,
      type: 'cash'
    },
    {
      quantity: 2,
      total: 90,
      tip: 0,
      type: 'tab'
    },
    {
      quantity: 2,
      total: 90,
      tip: 0,
      type: 'tab'
    },
    {
      quantity: 2,
      total: 90,
      tip: 0,
      type: 'tab'
    },
    {
      quantity: 2,
      total: 200,
      tip: 0,
      type: 'cash'
    },
    {
      quantity: 1,
      total: 200,
      tip: 100,
      type: 'visa'
    }
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
    if (i === undefined) {
      i = 0;
    }
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
        return d(i) + 'px'; // E
      })
      .select('span').text(function (d, i) {
        return d(i); // F
      });
  }
  setInterval(function () {
    render();
  }, 1500000);
  render();
}());

// object-as-data.html
(function () {
  var data = [{
      width: 10,
      color: 23
    },
    {
      width: 15,
      color: 33
    },
    {
      width: 30,
      color: 40
    },
    {
      width: 50,
      color: 60
    },
    {
      width: 80,
      color: 22
    },
    {
      width: 65,
      color: 10
    },
    {
      width: 55,
      color: 5
    },
    {
      width: 30,
      color: 30
    },
    {
      width: 20,
      color: 60
    },
    {
      width: 10,
      color: 90
    },
    {
      width: 8,
      color: 10
    }
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
    data.push({
      width: randomValue(),
      color: randomValue()
    });
    render(data);
  }, 1500);
  render(data);
}());

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
}());

// raw-function.html
-
function () {
  var rows = d3.select('.raw-selection').selectAll('tr');
  var headerElement = rows._groups[0][0];
  d3.select(headerElement).attr('class', 'table-header');
  d3.select(rows._groups[0][1]).attr('class', 'table-row-odd');
  d3.select(rows._groups[0][2]).attr('class', 'table-row-even');
  d3.select(rows._groups[0][3]).attr('class', 'table-row-odd');
}();

// function-chain.html
+
function () {
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
}();

// sub-selection.html
void

function () {
  d3.select('.sub-selection').select('#section1  div')
    .attr('class', 'blue box');
  d3.select('.sub-selection').select('#section2').select('div')
    .attr('class', 'red box');
}();

// selection-iteration.httml
(function () {
  d3.select('.selection-iteration').selectAll('div')
    .attr('class', 'red box')
    .each(function (d, i) {
      d3.select(this).append('h1').text(i);
    });
}());

// multiple-selection.html
(function () {
  d3.select('.multiple-selection').selectAll('div')
    .attr('class', 'red box');
}());

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

  var widget = SimpleWidget({
      color: '#6495ed'
    })
    .headline('Simple widget')
    .description('This is a simple widget demonstrating functional javascript.');

  widget.render();
})();

// ===================other====================
/** d3-dashboard.js demo */
(function () {
  var dashboard = require('./d3-dashboard');
  d3.select('.d3-dashboard').call(dashboard()
    // 背景设置
    .width(600)
    .height(450)
    .backgroundColor('#f99')
    // 中心数值文字设置
    .centerTextValue(62)
    .centerTextValueColor('green')
    // 中心箭头线设置
    // 中心文本文字设置
    .centerTextTitle('优')
    .centerTextTitleColor('red')
    // 内轨轨道设置
    .orbitColorIn('#ccc')
    .scaleColor('yellow')
    .scaleTextColor('red')
  );
})();

/** d3-ring-double.js demo */
(function () {
  var ringDouble = require('./d3-ring-double');

  var value = [{
      id: 0,
      img: '../../img/sun.png',
      name: '山东如意集团',
      mark: 0
    },
    {
      id: 1,
      img: '../../img/2.png',
      name: '山东济宁如意毛纺织股份有限公司',
      mark: 1
    },
    {
      id: 2,
      img: '../../img/2.png',
      name: '澳大利亚麦德国际贸易有限公司',
      mark: 1
    },
    {
      id: 3,
      img: '../../img/2.png',
      name: '山东济宁如意进出口有限公司',
      mark: 1
    },
    {
      id: 4,
      img: '../../img/2.png',
      name: '济宁如意投资有限公司',
      mark: 1
    },
    {
      id: 5,
      img: '../../img/2.png',
      name: '济宁如意印染有限公司',
      mark: 1
    },
    {
      id: 6,
      img: '../../img/6.png',
      name: '济宁如意技术咨询有限公司',
      mark: 1
    },
    {
      id: 7,
      img: '../../img/2.png',
      name: '济宁路嘉纳服装有限公司',
      mark: 1
    },
    {
      id: 8,
      img: '../../img/2.png',
      name: '重庆三峡技术纺织有限公司',
      mark: 1
    },
    {
      id: 9,
      img: '../../img/2.png',
      name: '济宁鲁意高新纤维材料有限公司',
      mark: 1
    },
    {
      id: 10,
      img: '../../img/2.png',
      name: '济宁如意针织有限责任公司',
      mark: 1
    },
    {
      id: 11,
      img: '../../img/1.png',
      name: '山东樱花投资控股有限公司',
      mark: 1
    },
    {
      id: 12,
      img: '../../img/2.png',
      name: '山东济宁如意毛纺织股份有限公司',
      mark: 1
    },
    {
      id: 13,
      img: '../../img/2.png',
      name: '金乡金樱棉业有限公司',
      mark: 1
    },
    {
      id: 14,
      img: '../../img/2.png',
      name: '张家港保税区新乐毛纺织造有限公司',
      mark: 1
    },
    {
      id: 15,
      img: '../../img/1.png',
      name: '青岛保税区如意投资有限公司',
      mark: 1
    },
    {
      id: 16,
      img: '../../img/1.png',
      name: '山东邹城建信村镇银行有限公司',
      mark: 1
    },
    {
      id: 17,
      img: '../../img/2.png',
      name: '伊藤忠（中国）集团有限公司',
      mark: 1
    },
    {
      id: 18,
      img: '../../img/2.png',
      name: '临邑澳泰纺织有限公司',
      mark: 1
    },
    {
      id: 19,
      img: '../../img/2.png',
      name: '伊藤忠商株式会社',
      mark: 1
    },
    {
      id: 20,
      img: '../../img/2.png',
      name: '重庆市万州区如意置业有限公司',
      mark: 1
    },
    {
      id: 21,
      img: '../../img/2.png',
      name: '济宁银行股份有限公司',
      mark: 2
    },
    {
      id: 22,
      img: '../../img/1.png',
      name: '新疆嘉和毛纺织有限公司',
      mark: 2
    },
    {
      id: 23,
      img: '../../img/2.png',
      name: '中国东方资管理公司',
      mark: 2
    },
    {
      id: 24,
      img: '../../img/2.png',
      name: '山东如意毛纺织集团总公司进出口总公司',
      mark: 2
    },
    {
      id: 25,
      img: '../../img/2.png',
      name: '内部职工股',
      mark: 2
    },
    {
      id: 26,
      img: '../../img/2.png',
      name: '国家股',
      mark: 2
    },
    {
      id: 27,
      img: '../../img/2.png',
      name: '山东如意置业有限公司',
      mark: 2
    },
    {
      id: 28,
      img: '../../img/3.png',
      name: '澳大利亚麦德国际贸易有限公司',
      mark: 2
    },
    {
      id: 29,
      img: '../../img/4.png',
      name: '郓城圣达如意印染有限公司',
      mark: 2
    },
    {
      id: 30,
      img: '../../img/2.png',
      name: '山东如意数码科技印染有限公司',
      mark: 2
    },
    {
      id: 31,
      img: '../../img/2.png',
      name: '济宁如意印染进出口有限公司',
      mark: 2
    },
    {
      id: 32,
      img: '../../img/2.png',
      name: '邯郸金宝隆印染有限公司',
      mark: 2
    },
    {
      id: 33,
      img: '../../img/2.png',
      name: '航天通信控股集团股份有限公司',
      mark: 2
    },
    {
      id: 34,
      img: '../../img/user.png',
      name: '孙俊贵',
      mark: 2
    },
    {
      id: 35,
      img: '../../img/2.png',
      name: '济宁如意印染有限公司工会委员会',
      mark: 2
    },
    {
      id: 36,
      img: '../../img/user.png',
      name: '顾金照',
      mark: 2
    },
    {
      id: 37,
      img: '../../img/user.png',
      name: '杜爱国',
      mark: 2
    },
    {
      id: 38,
      img: '../../img/2.png',
      name: '宁夏如意国际贸易有限公司',
      mark: 2
    },
    {
      id: 39,
      img: '../../img/2.png',
      name: '青岛如意恒成国际物流有限公司',
      mark: 2
    },
    {
      id: 40,
      img: '../../img/2.png',
      name: '意大利路嘉纳股份公司',
      mark: 2
    },
    {
      id: 41,
      img: '../../img/2.png',
      name: '山东樱花纺织集团有限公司',
      mark: 2
    },
    {
      id: 42,
      img: '../../img/2.png',
      name: '济宁世通物流有限公司',
      mark: 2
    },
    {
      id: 43,
      img: '../../img/2.png',
      name: '济宁永生重工机械制造有限公司',
      mark: 2
    },
    {
      id: 44,
      img: '../../img/2.png',
      name: '山东好德国际能源发展有限公司',
      mark: 2
    },
    {
      id: 45,
      img: '../../img/1.png',
      name: '山东宏河矿业集团有限公司',
      mark: 2
    },
    {
      id: 46,
      img: '../../img/2.png',
      name: '山东省天安矿业有限公司',
      mark: 2
    },
    {
      id: 47,
      img: '../../img/5.png',
      name: '山东天圆汇通科技有限公司',
      mark: 2
    },
    {
      id: 48,
      img: '../../img/7.png',
      name: '兖州煤业股份有限公司',
      mark: 2
    },
    {
      id: 49,
      img: '../../img/2.png',
      name: '中国建设银行股份有限公司',
      mark: 2
    },
    {
      id: 50,
      img: '../../img/2.png',
      name: '重庆市万州区鲁诚商贸有限公司',
      mark: 2
    },
    {
      id: 51,
      img: '../../img/2.png',
      name: '三星物产香港有限公司',
      mark: 2
    },
    {
      id: 52,
      img: '../../img/2.png',
      name: '三星物产株式会社',
      mark: 2
    },
    {
      id: 53,
      img: '../../img/2.png',
      name: '汶上如意技术纺织有限公司',
      mark: 2
    },
    {
      id: 54,
      img: '../../img/user.png',
      name: '李瑞忠',
      mark: 2
    },
    {
      id: 55,
      img: '../../img/user.png',
      name: '沈波',
      mark: 2
    },
    {
      id: 56,
      img: '../../img/user.png',
      name: '王戈',
      mark: 2
    },
    {
      id: 57,
      img: '../../img/1.png',
      name: '济宁市众信服装有限公司',
      mark: 2
    },
    {
      id: 58,
      img: '../../img/1.png',
      name: '澳大利亚麦德公司',
      mark: 2
    },
    {
      id: 59,
      img: '../../img/1.png',
      name: '山东省鲁信投资控股有限公司',
      mark: 2
    },
    {
      id: 60,
      img: '../../img/1.png',
      name: '济宁如意房地产开发有限公司',
      mark: 2
    },
    {
      id: 61,
      img: '../../img/1.png',
      name: '山东振鲁国际旅游航空服务有限公司',
      mark: 2
    },
    {
      id: 62,
      img: '../../img/1.png',
      name: '济宁如意物业管理有限公司',
      mark: 2
    },
    {
      id: 63,
      img: '../../img/1.png',
      name: '银川滨河如意服装有限公司',
      mark: 2
    },
    {
      id: 64,
      img: '../../img/1.png',
      name: '济宁市国有资产管理委员会',
      mark: 2
    },
    {
      id: 65,
      img: '../../img/1.png',
      name: '中国东方资产管理公司',
      mark: 2
    },
    {
      id: 66,
      img: '../../img/2.png',
      name: '无锡市新乐一碳毛纺有限公司',
      mark: 2
    }
  ];
  var links = [{
      source: 0,
      target: 1
    },
    {
      source: 2,
      target: 0
    },
    {
      source: 0,
      target: 3
    },
    {
      source: 4,
      target: 0
    },
    {
      source: 0,
      target: 5
    },
    {
      source: 0,
      target: 6
    },
    {
      source: 0,
      target: 7
    },
    {
      source: 0,
      target: 8
    },
    {
      source: 0,
      target: 9
    },
    {
      source: 0,
      target: 10
    },
    {
      source: 0,
      target: 11
    },
    {
      source: 0,
      target: 12
    },
    {
      source: 0,
      target: 13
    },
    {
      source: 0,
      target: 14
    },
    {
      source: 0,
      target: 15
    },
    {
      source: 0,
      target: 16
    },
    {
      source: 17,
      target: 0
    },
    {
      source: 0,
      target: 18
    },
    {
      source: 19,
      target: 0
    },
    {
      source: 0,
      target: 20
    },

    {
      source: 1,
      target: 21
    },
    {
      source: 22,
      target: 1
    },
    {
      source: 23,
      target: 2
    },
    {
      source: 24,
      target: 2
    },
    {
      source: 25,
      target: 2
    },
    {
      source: 26,
      target: 3
    },
    {
      source: 3,
      target: 27
    },
    {
      source: 4,
      target: 28
    },
    {
      source: 4,
      target: 29
    },
    {
      source: 4,
      target: 30
    },
    {
      source: 4,
      target: 31
    },
    {
      source: 5,
      target: 32
    },
    {
      source: 6,
      target: 33
    },
    {
      source: 6,
      target: 34
    },
    {
      source: 7,
      target: 35
    },
    {
      source: 7,
      target: 36
    },
    {
      source: 7,
      target: 37
    },
    {
      source: 8,
      target: 38
    },
    {
      source: 9,
      target: 39
    },
    {
      source: 9,
      target: 40
    },
    {
      source: 9,
      target: 41
    },
    {
      source: 10,
      target: 42
    },
    {
      source: 10,
      target: 43
    },
    {
      source: 10,
      target: 44
    },
    {
      source: 10,
      target: 45
    },
    {
      source: 10,
      target: 46
    },
    {
      source: 11,
      target: 47
    },
    {
      source: 12,
      target: 48
    },
    {
      source: 12,
      target: 49
    },
    {
      source: 12,
      target: 50
    },
    {
      source: 13,
      target: 51
    },
    {
      source: 14,
      target: 52
    },
    {
      source: 14,
      target: 53
    },
    {
      source: 14,
      target: 54
    },
    {
      source: 14,
      target: 55
    },
    {
      source: 14,
      target: 56
    },
    {
      source: 15,
      target: 57
    },
    {
      source: 16,
      target: 58
    },
    {
      source: 16,
      target: 59
    },
    {
      source: 17,
      target: 60
    },
    {
      source: 17,
      target: 61
    },
    {
      source: 17,
      target: 62
    },
    {
      source: 18,
      target: 63
    },
    {
      source: 19,
      target: 64
    },
    {
      source: 19,
      target: 65
    },
    {
      source: 19,
      target: 66
    }
  ];

  var circle1 = ringDouble()
    .width(1280)
    .height(930)
    .backgroundColor('#fff') //背景色
    .value(value) // 小球数据，默认无
    .link(links) // 小球之间连接线，默认无

    .backgroundColorIn('#fff')
    .orbitColor(['#5185dd', '#4199ca']) // 小球外切轨道的颜色，默认['#5185dd', '#4199ca']
    .orbitWidth(0) // 小球外切轨道的宽度，默认1
    .trackBall(20) // 小球外切轨道显示多少个小球，默认12
    .ballSize([60, 60]) // 小球的半径从小到大，默认[12,24]
    .ballTextOutSize(10) // 小球外文字大小，默认12
    .ballTextOutColor('#000') // 小球外文字颜色
    .firstQuadrantTextAnchor('start')
    .secondQuadrantTextAnchor('start')
    .thirdQuadrantTextAnchor('end')
    .fourthQuadrantTextAnchor('end')

    .backgroundColorOut('#fff')
    .orbitColorOut(['#5185dd', '#4199ca']) //
    .orbitWidthOut(0) //
    .trackBallOut(50) //
    .ballSizeOut([60, 60]) //
    .ballTextOutSizeOut(12) //
    .ballTextOutColorOut('#000')
    .firstQuadrantTextAnchorOut('start')
    .secondQuadrantTextAnchorOut('start')
    .thirdQuadrantTextAnchorOut('end')
    .fourthQuadrantTextAnchorOut('end')

    .lightEffectImg('../../img/50_12.png')
    .lightEffectWidth(50)
    .lightEffectHeight(12);


  d3.select('.d3-circle-double').call(circle1);
})();

/** d3-ring-single.js demo*/
(function () {
  var ringSingle = require('./d3-ring-single')
  var value = [{
      id: 1,
      ranking: 1,
      name: '猛龙',
      img: '../../img/nba-1.png',
      score: 30.1
    },
    {
      id: 2,
      ranking: 2,
      name: '火箭',
      img: '../../img/nba-2.png',
      score: 29
    },
    {
      id: 3,
      ranking: 3,
      name: '凯尔特',
      img: '../../img/nba-3.png',
      score: 28.1
    },
    {
      id: 4,
      ranking: 4,
      name: '超音速',
      img: '../../img/nba-4.png',
      score: 26.9
    },
    {
      id: 5,
      ranking: 5,
      name: '马刺',
      img: '../../img/nba-5.png',
      score: 25.3
    },
    {
      id: 6,
      ranking: 6,
      name: '太阳',
      img: '../../img/nba-6.png',
      score: 25.1
    },
    {
      id: 7,
      ranking: 7,
      name: '森林',
      img: '../../img/nba-7.png',
      score: 24.3
    },
    {
      id: 8,
      ranking: 8,
      name: '开拓者',
      img: '../../img/nba-8.png',
      score: 23.5
    },
    {
      id: 9,
      ranking: 9,
      name: '勇士',
      img: '../../img/nba-9.png',
      score: 23.5
    },
    {
      id: 10,
      ranking: 10,
      name: '奇才',
      img: '../../img/nba-10.png',
      score: 23.1
    },
    {
      id: 11,
      ranking: 11,
      name: '山猫',
      img: '../../img/nba-11.png',
      score: 22.2
    },
    {
      id: 12,
      ranking: 12,
      name: '雄鹿',
      img: '../../img/nba-12.png',
      score: 22.1
    },
    {
      id: 13,
      ranking: 13,
      name: '公牛',
      img: '../../img/nba-13.png',
      score: 21.8
    },
    {
      id: 14,
      ranking: 14,
      name: '骑士',
      img: '../../img/nba-14.png',
      score: 21.4
    },
    {
      id: 15,
      ranking: 15,
      name: '灰熊',
      img: '../../img/nba-15.png',
      score: 21.2
    },
    {
      id: 16,
      ranking: 16,
      name: '快船',
      img: '../../img/nba-16.png',
      score: 21.2
    },
    {
      id: 17,
      ranking: 17,
      name: '鹰',
      img: '../../img/nba-17.png',
      score: 20.9
    },
    {
      id: 18,
      ranking: 18,
      name: '网',
      img: '../../img/nba-18.png',
      score: 20.9
    },
    {
      id: 19,
      ranking: 19,
      name: '热',
      img: '../../img/nba-19.png',
      score: 20.8
    },
    {
      id: 20,
      ranking: 20,
      name: '黄蜂',
      img: '../../img/nba-20.png',
      score: 20.7
    },
    {
      id: 21,
      ranking: 21,
      name: '爵士',
      img: '../../img/nba-21.png',
      score: 20.1
    },
    {
      id: 22,
      ranking: 22,
      name: '国王',
      img: '../../img/nba-22.png',
      score: 19.1
    },
    {
      id: 23,
      ranking: 23,
      name: '尼克斯',
      img: '../../img/nba-23.png',
      score: 18.1
    },
    {
      id: 24,
      ranking: 24,
      name: '湖人',
      img: '../../img/nba-24.png',
      score: 17.1
    },
    {
      id: 25,
      ranking: 25,
      name: '魔术',
      img: '../../img/nba-25.png',
      score: 16.1
    },
    {
      id: 26,
      ranking: 26,
      name: '小牛',
      img: '../../img/nba-26.png',
      score: 15.1
    },
    {
      id: 27,
      ranking: 27,
      name: '76人',
      img: '../../img/nba-27.png',
      score: 14.1
    },
    {
      id: 28,
      ranking: 28,
      name: '掘金',
      img: '../../img/nba-28.png',
      score: 13.1
    },
    {
      id: 29,
      ranking: 29,
      name: '步行者',
      img: '../../img/nba-29.png',
      score: 12.1
    },
    {
      id: 30,
      ranking: 30,
      name: '活塞',
      img: '../../img/nba-30.png',
      score: 11.1
    },
  ]

  var circle1 = ringSingle()
    .value(value.slice(0, 30)) // 小球数据，默认无
    // .isClockwise(false)
    .orbitWidth(1) // 小球外切轨道的宽度，默认1
    // .orbitColor(['#5185dd', 'red']) // 小球外切轨道的颜色，默认[]，如果不设置则使用彩虹色
    .ballNum(30) // 小球外切轨道显示多少个小球，默认12
    .ballSize([25, 35]) // 小球的半径从小到大，默认[12,24]
    .ballUseImg(true)
    .isEquant(false) // 是否等分分布小圆，默认true
    .ballTextOutSize(14) // 小球外文字大小，默认12
    .textPathArc([2 * Math.PI * .85, 2 * Math.PI])
    .textAfterEdge('NBA各队') // 左上角外文字，默认空
    .textAfterEdgeStartOffset('15%') // 左上角外文字开始点，默认0
    .textBeforeEdge('国际球员数量')
    .textBeforeEdgeStartOffset('14%');

  d3.select('.d3-ring-single-1').call(circle1);

  var circle2 = ringSingle()
    .backgroundColor('#fff') // 画布的背景色，默认#fff
    .value(value.slice(0, 30)) // 小球数据，默认无
    .isClockwise(false) // 小球排列顺序，默认true，顺时针
    .orbitColor(['#5185dd', '#4199ca']) // 小球外切轨道的颜色，默认[]，如果不设置则使用彩虹色
    .orbitWidth(1) // 小球外切轨道的宽度，默认1
    .orbitStartAngle(0) // 小球外切轨道起始弧度，默认为0
    .orbitEndAngle(Math.PI) // 小球外切轨道结束弧度，默认为2*Math.PI
    .transitonTime(1000) // 小球外切轨道动画时间，单位毫秒，默认1s
    .ballNum(30) // 小球外切轨道显示多少个小球，默认12
    .ballSize([15, 35]) // 小球的半径从小到大，默认[12,24]
    .isEquant(false) // 是否等分分布小圆，默认true
    .ballTextOutSize(14) // 小球外文字大小，默认12
    .ballUseImg(true) // 是否使用图片，默认false
    .firstQuadrantDominantBaseline('text-before-edge') // 第一象限文字基线，默认值'text-before-edge'
    .firstQuadrantTextAnchor('end') // 第一象限文字起点，默认值'end'
    .secondQuadrantDominantBaseline('text-after-edge') // 第二象限文字基线，默认值'text-after-edge'
    .secondQuadrantTextAnchor('end') // 第二象限文字起点，默认值'end'
    .thirdQuadrantDominantBaseline('text-after-edge') // 第三象限文字基线，默认值'text-after-edge'
    .thirdQuadrantTextAnchor('start') // 第三象限文字起点，默认值'start'
    .fourthQuadrantDominantBaseline('text-before-edge') // 第四象限文字基线，默认值'text-before-edge'
    .fourthQuadrantTextAnchor('start') // 第四象限文字起点，默认值'start'
    .textPathArc([0, .25 * Math.PI]) // 文字路径起止，默认[2 * Math.PI * .75, 2 * Math.PI]
    .textAfterEdge('NBA各队') // 左上角外文字，默认空
    .textAfterEdgeColor('#1e518f') // 左上角外文字颜色，默认#000
    .textAfterEdgeSize(30) // 左上角外文字大小，默认24
    .textAfterEdgeStartOffset('14%') // 左上角外文字开始点，默认0
    .textAfterTextAnchor('start') // 左上角外文字对齐方式，默认开头对齐
    .textAfterEdgeDominantBaseline('text-after-edge') // 左上角外文字的基线？这个属性没清楚。默认'text-after-edge'
    .textBeforeEdge('国际球员数量') //
    .textBeforeEdgeColor('#1e518f') // 左上角内文字颜色，默认#000
    .textBeforeEdgeSize(18) // 左上角内文字大小，默认18
    .textBeforeEdgeStartOffset('15%') // 左上角内文字开始点，默认0
    .textBeforeTextAnchor('start') // 左上角内文字对齐方式，默认开头对齐
    .textBeforeEdgeDominantBaseline('text-before-edge'); // 左上角内文字的基线？这个属性没清楚。默认'text-before-edge'
  d3.select('.d3-ring-single-2').call(circle2);
})();

/** d3-slider.js demo */
(function () {
  var slider = require('./d3-slider');
  d3.select('#slider').call(slider().value([10, 25]));
})();

/** Solar Path */
(function () {
  require('./d3-utils-solar-calculator');
  //
  var svg = d3.select('svg.solar'),
    width = +svg.attr('width'),
    height = +svg.attr('height'),
    scale = width * .45;

  var formatTime = d3.timeFormat('%-I %p'),
    formatNumber = d3.format('.1f'),
    formatAngle = function (d) {
      return formatNumber(d) + '°';
    };

  var projection = d3.geoProjection(flippedStereographic)
    .scale(scale)
    .clipAngle(130)
    .rotate([0, -90])
    .translate([width / 2 + .5, height / 2 + .5])
    .precision(.1);

  var path = d3.geoPath()
    .projection(projection);

  svg.append('path')
    .datum(d3.geoCircle().center([0, 90]).radius(90))
    .attr('class', 'horizon')
    .attr('d', path);

  svg.append('path')
    .datum(d3.geoGraticule())
    .attr('class', 'graticule')
    .attr('d', path);

  var ticksAzimuth = svg.append('g')
    .attr('class', 'ticks ticks--azimuth');

  ticksAzimuth.selectAll('line')
    .data(d3.range(360))
    .enter().append('line')
    .each(function (d) {
      var p0 = projection([d, 0]),
        p1 = projection([d, d % 10 ? -1 : -2]);

      d3.select(this)
        .attr('x1', p0[0])
        .attr('y1', p0[1])
        .attr('x2', p1[0])
        .attr('y2', p1[1]);
    });

  ticksAzimuth.selectAll('text')
    .data(d3.range(0, 360, 10))
    .enter().append('text')
    .each(function (d) {
      var p = projection([d, -4]);

      d3.select(this)
        .attr('x', p[0])
        .attr('y', p[1]);
    })
    .attr('dy', '.35em')
    .text(function (d) {
      return d === 0 ? 'N' : d === 90 ? 'E' : d === 180 ? 'S' : d === 270 ? 'W' : d + '°';
    });

  svg.append('g')
    .attr('class', 'ticks ticks--elevation')
    .selectAll('text')
    .data(d3.range(10, 91, 10))
    .enter().append('text')
    .each(function (d) {
      var p = projection([0, d]);

      d3.select(this)
        .attr('x', p[0])
        .attr('y', p[1]);
    })
    .attr('dy', '.35em')
    .text(function (d) {
      return d + '°';
    });

  navigator.geolocation.getCurrentPosition(located);

  function located(geolocation) {
    var solar = solarCalculator([geolocation.coords.longitude, geolocation.coords.latitude]);

    d3.select('#waiting').transition()
      .style('opacity', 0)
      .remove();

    svg.insert('path', '.sphere')
      .attr('class', 'solar-path');

    var sun = svg.insert('g', '.sphere')
      .attr('class', 'sun');

    sun.append('circle')
      .attr('r', 5);

    sun.append('text')
      .attr('class', 'sun-label sun-label--azimuth')
      .attr('dy', '.71em')
      .attr('y', 10);

    sun.append('text')
      .attr('class', 'sun-label sun-label--elevation')
      .attr('dy', '1.81em')
      .attr('y', 10);

    var tickSun = svg.insert('g', '.sphere')
      .attr('class', 'ticks ticks--sun')
      .selectAll('g');

    refresh();

    setInterval(refresh, 1000);

    function refresh() {
      var now = new Date,
        start = d3.timeDay.floor(now),
        end = d3.timeDay.offset(start, 1);

      svg.select('.solar-path')
        .datum({
          type: 'LineString',
          coordinates: d3.timeMinutes(start, end).map(solar.position)
        })
        .attr('d', path);

      sun
        .datum(solar.position(now))
        .attr('transform', function (d) {
          return 'translate(' + projection(d) + ')';
        });

      sun.select('.sun-label--azimuth')
        .text(function (d) {
          return formatAngle(d[0]) + ' φ';
        });

      sun.select('.sun-label--elevation')
        .text(function (d) {
          return formatAngle(d[1]) + ' θ';
        });

      tickSun = tickSun
        .data(d3.timeHours(start, end), function (d) {
          return +d;
        });

      tickSun.exit().remove();

      var tickSunEnter = tickSun.enter().append('g')
        .attr('transform', function (d) {
          return 'translate(' + projection(solar.position(d)) + ')';
        });

      tickSunEnter.append('circle')
        .attr('r', 2.5);

      tickSunEnter.append('text')
        .attr('dy', '-.31em')
        .attr('y', -6)
        .text(formatTime);
    }
  }

  d3.select(self.frameElement).style('height', height + 'px');

  function flippedStereographic(λ, φ) {
    var cosλ = Math.cos(λ),
      cosφ = Math.cos(φ),
      k = 1 / (1 + cosλ * cosφ);
    return [
      k * cosφ * Math.sin(λ), -k * Math.sin(φ)
    ];
  }
}) //();
