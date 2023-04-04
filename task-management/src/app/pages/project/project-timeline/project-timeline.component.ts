import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as Highcharts from 'highcharts/highcharts-gantt';
import HC_dragg from 'highcharts/modules/draggable-points';
import { ProjectData } from 'src/app/_core/api/project/project-data';
HC_dragg(Highcharts);

Highcharts.setOptions({
  lang: {
    months: [
      'Tháng 1',
      'Tháng 2',
      'Tháng 3',
      'Tháng 4',
      'Tháng 5',
      'Tháng 6',
      'Tháng 7',
      'Tháng 8',
      'Tháng 9',
      'Tháng 10',
      'Tháng 11',
      'Tháng 12',
    ],
    shortMonths: [
      '01',
      '02',
      '03',
      '04',
      '05',
      '06',
      '07',
      '08',
      '09',
      '10',
      '11',
      '12',
    ],
    weekdays: [
      'Thứ 2 ',
      'Thứ 3',
      'Thứ 4',
      'Thứ 5',
      'Thứ 6',
      'Thứ 7',
      'Chủ nhật',
    ],
    shortWeekdays: ['2', '3', '4', '5', '6', '7', 'CN'],
  },

  time: {
    useUTC: true,
    timezone: 'Asia/Ho_Chi_Minh',
  },
});

@Component({
  selector: 'app-project-timeline',
  templateUrl: './project-timeline.component.html',
  styleUrls: ['./project-timeline.component.scss'],
})
export class ProjectTimelineComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};
  loading = true;

  today = new Date();
  day = 1000 * 60 * 60 * 24;
  isAddingTask = false;

  public subProjectList: any[] = [];
  public series: any[] = [];
  public data: any[] = [];

  constructor(
    private projectData: ProjectData,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getSubProject();
  }

  getIdProject() {
    // debugger;
    let id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    return parseInt(id!);
  }

  getNameProject() {
    let name = this.route.snapshot.paramMap.get('name');
    return name;
  }

  getSubProject() {
    this.projectData
      .search(1, 999, `parentId.eq.${this.getIdProject()},`)
      .subscribe({
        next: (res) => {
          if (res) {
            // debugger;
            console.log(res);
            this.subProjectList = res.pagingData.content;

            let dataName: any[] = [];

            for (let i = 0; i < this.subProjectList.length; i++) {
              this.data.push({
                id: i,
                name: this.subProjectList[i].name,
                // start: new Date(this.subProjectList[i].startDate).getTime(),
                start: Date.parse(this.subProjectList[i].startDate),
                end: Date.parse(this.subProjectList[i].endDate),
                y: i,
              });
              dataName.push(this.subProjectList[i].name);
            }

            const timezone = new Date().getTimezoneOffset();

            this.chartOptions = {
              chart: {
                type: 'gantt',
              },

              title: {
                text: 'Dự án: ' + this.getNameProject(),
              },

              time: {
                useUTC: true,
                timezone: 'Asia/Ho_Chi_Minh',
              },

              tooltip: {
                xDateFormat: '%A, %b %e, %Y',
                formatter: function () {
                  return (
                    'Tên project: ' +
                    this.point.name +
                    '</br>' +
                    'Ngày bắt đầu: ' +
                    Highcharts.dateFormat(
                      '%A, %d/%b/%Y',
                      Number(this.series.data[this.point.index].x)
                    ) +
                    '</br>' +
                    'Ngày kết thúc: ' +
                    Highcharts.dateFormat(
                      '%A, %d/%b/%Y',
                      Number(this.series.data[this.point.index].x2)
                    )
                  );
                },
              },

              plotOptions: {
                series: {
                  animation: false, // Do not animate dependency connectors
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

              xAxis: [
                {
                  minPadding: 0.2,
                  maxPadding: 0.2,
                },
                {
                  dateTimeLabelFormats: {
                    week: 'Tuần %W',
                  },
                },
              ],

              yAxis: {
                type: 'category',
                categories: dataName,
              },

              series: [
                {
                  type: 'gantt',
                  data: this.data,
                },
              ],
            };

            this.loading = false;
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  updateRemoveButtonStatus() {
    const chart = Highcharts.Series;
    console.log(chart);
  }
}
