import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as Highcharts from 'highcharts/highcharts-gantt';
import HC_dragg from 'highcharts/modules/draggable-points';
import { ProjectData } from 'src/app/_core/api/project/project-data';
HC_dragg(Highcharts);

@Component({
  selector: 'app-project-timeline',
  templateUrl: './project-timeline.component.html',
  styleUrls: ['./project-timeline.component.scss'],
})
export class ProjectTimelineComponent implements OnInit {

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: any;
  loading = true;

  today = new Date();
  day = 1000 * 60 * 60 * 24;
  isAddingTask = false;

  public subProjectList: any[] = [];
  public series: any[] = [];
  public data: any[] = [];

  constructor(private projectData: ProjectData, private route: ActivatedRoute) {}

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

    this.projectData.search(1, 999, `parentId.eq.${this.getIdProject()},`).subscribe({
      next: (res) => {
        if (res) {
          console.log(res);
          this.subProjectList = res.pagingData.content;

          let dataName = []

          for (let i = 0; i < this.subProjectList.length; i++) {
            this.data.push({
              id: i,
              name: this.subProjectList[i].name,
              start: (new Date(this.subProjectList[i].startDate)).getTime(),
              end: (new Date(this.subProjectList[i].endDate)).getTime(),
              y: i,
            });
            dataName.push(this.subProjectList[i].name);
          }

          this.chartOptions = {
            chart: {
              type: 'gantt',
            },

            title: {
              text: this.getNameProject(),
            },

            lang: {
              accessibility: {
                axis: {
                  xAxisDescriptionPlural:
                    'The chart has a two-part X axis showing time in both week numbers and days.',
                },
              },
            },

            accessibility: {},

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

            xAxis: {
              minPadding: 0.2,
              maxPadding: 0.2,
            },

            yAxis: {
              type: 'category',
              categories: dataName,
            },

            series: [
              {
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
