import { Component, OnInit } from '@angular/core';
import { TaskData } from 'src/app/_core/api/task/task-data';
import * as Highcharts from 'highcharts';
import { ProjectData } from 'src/app/_core/api/project/project-data';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit {
  public taskList: any[] = [];
  public inCompleteTask: any[] = [];

  public projectList: any[] = [];

  pageNumber: number = 1;
  pageSize: number = 999;
  txtSearch: string = '';
  sort: string = '';

  pieChartOptions: any;
  barChartOptions: any;
  Highcharts: typeof Highcharts = Highcharts;

  constructor(private taskData: TaskData, private projectData: ProjectData) {}

  ngOnInit(): void {
    this.getTask();
    this.pieChartOption();
    this.barChartOption();
  }

  getTask() {
    this.taskData
      .search(this.pageNumber, this.pageSize, this.txtSearch, this.sort)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.taskList = res.pagingData.content;
          this.InCompleteTask();
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  getProject() {
    this.projectData
      .search(this.pageNumber, this.pageSize, this.txtSearch, this.sort)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.projectList = res.pagingData.content;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  InCompleteTask() {
    for (let i = 0; i < this.taskList.length; i++) {
      if (this.taskList[i].state == 0)
        this.inCompleteTask.push(this.taskList[i]);
    }
  }

  pieChartOption() {
    this.pieChartOptions = {
      chart: {
        width: 450,
        height: 350,
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
      },
      title: {
        text: 'Tình trạng dự án',
        align: 'left',
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
      },
      accessibility: {
        point: {
          valueSuffix: '%',
        },
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
          },
        },
      },
      series: [
        {
          name: 'Brands',
          colorByPoint: true,
          data: [
            {
              name: 'Chrome',
              y: 70.67,
            },
            {
              name: 'Edge',
              y: 14.77,
            },
            {
              name: 'Firefox',
              y: 4.86,
            },
            {
              name: 'Safari',
              y: 2.63,
            },
            {
              name: 'Internet Explorer',
              y: 1.53,
            },
            {
              name: 'Opera',
              y: 1.4,
            },
            {
              name: 'Sogou Explorer',
              y: 0.84,
            },
            {
              name: 'QQ',
              y: 0.51,
            },
            {
              name: 'Other',
              y: 2.6,
            },
          ],
        },
      ],
    };
  }

  barChartOption() {
    this.barChartOptions = {
      chart: {
        width: 450,
        height: 350,
        type: 'column',
      },
      title: {
        text: 'Monthly Average Rainfall',
      },
      subtitle: {
        text: 'Source: WorldClimate.com',
      },
      xAxis: {
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
        crosshair: true,
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Rainfall (mm)',
        },
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat:
          '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true,
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0,
        },
      },
      series: [
        {
          name: 'Tokyo',
          data: [
            49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1,
            95.6, 54.4,
          ],
        },
        {
          name: 'New York',
          data: [
            83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5,
            106.6, 92.3,
          ],
        },
        {
          name: 'London',
          data: [
            48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3,
            51.2,
          ],
        },
        {
          name: 'Berlin',
          data: [
            42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8,
            51.1,
          ],
        },
      ],
    };
  }
}
