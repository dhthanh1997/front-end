/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import * as Highcharts from 'highcharts/highcharts-gantt';
import HC_dragg from 'highcharts/modules/draggable-points';
HC_dragg(Highcharts);

@Component({
  selector: 'internal-app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
})
export class TimelineComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;

  today = new Date();
  day = 1000 * 60 * 60 * 24;
  isAddingTask = false;

  constructor(private element: ElementRef, private renderer2: Renderer2) {}

  ngOnInit(): void {}

  // Update disabled status of the remove button, depending on whether or not we
  // have any selected points.
  updateRemoveButtonStatus() {
    const chart = Highcharts.Series;
    console.log(chart);
    // Run in a timeout to allow the select to update
    // setTimeout(function () {
    //   btnRemoveTask.disabled = !chart.getSelectedPoints().length ||
    //     isAddingTask;
    // }, 10);
  }

  chartOptions: Highcharts.Options = {
    chart: {
      type: 'gantt',
    },

    title: {
      text: 'Highcharts draggable gantt demo',
    },

    lang: {
      accessibility: {
        axis: {
          xAxisDescriptionPlural:
            'The chart has a two-part X axis showing time in both week numbers and days.',
        },
      },
    },

    accessibility: {
      // point: {
      //   descriptionFormatter: function (point) {
      //     return Highcharts.format(
      //       point.milestone ?
      //         '{point.name}, milestone for {point.yCategory} at {point.x:%Y-%m-%d}.' :
      //         '{point.name}, assigned to {point.yCategory} from {point.x:%Y-%m-%d} to {point.x2:%Y-%m-%d}.',
      //       { point }
      //     );
      //   }
      // }
    },

    plotOptions: {
      series: {
        animation: false, // Do not animate dependency connectors
        dragDrop: {
          draggableX: true,
          draggableY: true,
          dragMinY: 0,
          dragMaxY: 2,
          dragPrecisionX: this.day / 3, // Snap to eight hours
        },
        // stickyTracking: false,
        // dragDrop: {
        //   draggableY: true,
        // },
        dataLabels: {
          enabled: true,
          format: '{point.name}',
          style: {
            cursor: 'default',
            pointerEvents: 'none',
          },
        },
        allowPointSelect: true,
        point: {
          events: {
            select: this.updateRemoveButtonStatus,
            unselect: this.updateRemoveButtonStatus,
            remove: this.updateRemoveButtonStatus,
          },
        },
      },
    },

    xAxis: {
      minPadding: 0.2,
      maxPadding: 0.2,
    },

    yAxis: {
      type: 'category',
      categories: ['A', 'B', 'C'],
      min: 0,
      max: 2,
    },

    series: [
      {
        name: 'Project 1',
        type: 'gantt',
        // dragDrop: {
        //   liveRedraw: false,
        //   draggableX: true,
        //   draggableY: true,
        //   dragMinY: 0,
        //   dragMaxY: 2,
        // },
        data: [
          {
            start: Date.UTC(2014, 11, 1),
            end: Date.UTC(2014, 11, 2),
            completed: 0.95,
            y: 0,
          },
          {
            start: Date.UTC(2014, 11, 3),
            end: Date.UTC(2014, 11, 5),
            y: 0,
          },
          {
            start: Date.UTC(2014, 11, 2),
            end: Date.UTC(2014, 11, 5),
            y: 1,
          },
        ],
      },
    ],
  };
}
