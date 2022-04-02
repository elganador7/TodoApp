// ##############################
// // // javascript library for creating charts
// #############################
import 'chartist-plugin-pointlabels'
import 'chartist-plugin-axistitle'

var Chartist = require("chartist");

// ##############################
// // // variables used to create animation on charts
// #############################
var delays = 80,
  durations = 500;
var delays2 = 80,
  durations2 = 500;


export const dailySalesChart : any = {
  data: {
    labels: ["M", "T", "W", "T", "F", "S", "S"],
    series: [[244, 238, 247, 254, 255, 262, 268]]
  },
  options: {
    lineSmooth: Chartist.Interpolation.cardinal({
      tension: 0
    }),
    low: 225,
    high: 325, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
    chartPadding: {
      top: 20,
      right: 0,
      bottom: 30,
      left: 20
    },
    width: '800px',
    height: '300px',
    plugins: [
      Chartist.plugins.ctAxisTitle({
        axisX: {
          axisTitle: 'Time (mins)',
          axisClass: 'ct-axis-title',
          offset: {
            x: 0,
            y: 50
          },
          textAnchor: 'middle'
        },
        axisY: {
          axisTitle: 'Goals',
          axisClass: 'ct-axis-title',
          offset: {
            x: 0,
            y: 0
          },
          textAnchor: 'middle',
          flipTitle: false
        }
      }),
      Chartist.plugins.ctPointLabels({
        textAnchor: 'middle'
      })
    ]
  },
  // for animation
  animation: {
    draw: function(data : any) {
      if (data.type === "line" || data.type === "area") {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path
              .clone()
              .scale(1, 0)
              .translate(0, data.chartRect.height())
              .stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint
          }
        });
      } else if (data.type === "point") {
        data.element.animate({
          opacity: {
            begin: (data.index + 1) * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: "ease"
          }
        });
      }
    }
  }
};

export const emailsSubscriptionChart = {
  data: {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "Mai",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ],
    series: [[542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]]
  },
  options: {
    axisX: {
      showGrid: false
    },
    low: 0,
    high: 1000,
    chartPadding: {
      top: 20,
      right: 5,
      bottom: 30,
      left: 20
    },
    width: '800px',
    height: '300px',
    plugins: [
      Chartist.plugins.ctAxisTitle({
        axisX: {
          axisTitle: 'Time (mins)',
          axisClass: 'ct-axis-title',
          offset: {
            x: 0,
            y: 50
          },
          textAnchor: 'middle'
        },
        axisY: {
          axisTitle: 'Goals',
          axisClass: 'ct-axis-title',
          offset: {
            x: 0,
            y: 0
          },
          textAnchor: 'middle',
          flipTitle: false
        }
      })
    ]
  },
  responsiveOptions: [
    [
      "screen and (max-width: 640px)",
      {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: function(value : any[]) {
            return value[0];
          }
        }
      }
    ]
  ],
  animation: {
    draw: function(data : any) {
      if (data.type === "bar") {
        data.element.animate({
          opacity: {
            begin: (data.index + 1) * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: "ease"
          }
        });
      }
    }
  }
};