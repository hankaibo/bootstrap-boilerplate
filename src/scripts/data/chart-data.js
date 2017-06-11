  function drawArea() {
    var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var config = {
      type: 'line',
      data: {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [{
          label: "My First dataset",
          borderColor: window.chartColors.red,
          backgroundColor: window.chartColors.red,
          data: [
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor()
          ],
        }, {
          label: "My Second dataset",
          borderColor: window.chartColors.blue,
          backgroundColor: window.chartColors.blue,
          data: [
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor()
          ],
        }, {
          label: "My Third dataset",
          borderColor: window.chartColors.green,
          backgroundColor: window.chartColors.green,
          data: [
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor()
          ],
        }, {
          label: "My Third dataset",
          borderColor: window.chartColors.yellow,
          backgroundColor: window.chartColors.yellow,
          data: [
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor()
          ],
        }]
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: "Chart.js Line Chart - Stacked Area"
        },
        tooltips: {
          mode: 'index',
        },
        hover: {
          mode: 'index'
        },
        scales: {
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Month'
            }
          }],
          yAxes: [{
            stacked: true,
            scaleLabel: {
              display: true,
              labelString: 'Value'
            }
          }]
        }
      }
    };
    var ctx_area = document.getElementById("area-chart").getContext("2d");
    new Chart(ctx_area, config);
  }

  function drawBar() {
    var barChartData = {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [{
        label: 'Dataset 1',
        backgroundColor: window.chartColors.red,
        data: [
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor()
        ]
      }, {
        label: 'Dataset 2',
        backgroundColor: window.chartColors.blue,
        data: [
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor()
        ]
      }, {
        label: 'Dataset 3',
        backgroundColor: window.chartColors.green,
        data: [
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor()
        ]
      }]
    };
    var ctx_bar = document.getElementById("bar-chart").getContext("2d");
    new Chart(ctx_bar, {
      type: 'bar',
      data: barChartData,
      options: {
        title: {
          display: true,
          text: "Chart.js Bar Chart - Stacked"
        },
        tooltips: {
          mode: 'index',
          intersect: false
        },
        responsive: true,
        scales: {
          xAxes: [{
            stacked: true,
          }],
          yAxes: [{
            stacked: true
          }]
        }
      }
    });
  }

  function drawLine() {
    var lineChartData = {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [{
        label: "My First dataset",
        borderColor: window.chartColors.red,
        backgroundColor: window.chartColors.red,
        fill: false,
        data: [
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor()
        ],
        yAxisID: "y-axis-1",
      }, {
        label: "My Second dataset",
        borderColor: window.chartColors.blue,
        backgroundColor: window.chartColors.blue,
        fill: false,
        data: [
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor()
        ],
        yAxisID: "y-axis-2"
      }]
    };
    var ctx_line = document.getElementById("line-chart").getContext("2d");
    Chart.Line(ctx_line, {
      data: lineChartData,
      options: {
        responsive: true,
        hoverMode: 'index',
        stacked: false,
        title: {
          display: true,
          text: 'Chart.js Line Chart - Multi Axis'
        },
        scales: {
          yAxes: [{
            type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
            display: true,
            position: "left",
            id: "y-axis-1",
          }, {
            type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
            display: true,
            position: "right",
            id: "y-axis-2",
            // grid line settings
            gridLines: {
              drawOnChartArea: false, // only want the grid lines for one axis to show up
            },
          }],
        }
      }
    });
  }

  function drawDount() {
    var config = {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
          ],
          backgroundColor: [
            window.chartColors.red,
            window.chartColors.orange,
            window.chartColors.yellow,
            window.chartColors.green,
            window.chartColors.blue,
          ],
          label: 'Dataset 1'
        }],
        labels: [
          "Red",
          "Orange",
          "Yellow",
          "Green",
          "Blue"
        ]
      },
      options: {
        responsive: true,
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Chart.js Doughnut Chart'
        },
        animation: {
          animateScale: true,
          animateRotate: true
        }
      }
    };
    var ctx_donut = document.getElementById("donut-chart").getContext("2d");
    new Chart(ctx_donut, config);
  }

exports.drawArea = drawArea;
exports.drawBar = drawBar;
exports.drawLine = drawLine;
exports.drawDount = drawDount;
