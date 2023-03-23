import { Component, OnInit } from '@angular/core';
import { TaskData } from 'src/app/_core/api/task/task-data';
import * as Highcharts from 'highcharts';
import { ProjectData } from 'src/app/_core/api/project/project-data';
import { getISOWeek } from 'date-fns';
import { TeamData } from 'src/app/_core/api/team/team-data';
import { MemberData } from 'src/app/_core/api/member/member-data';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit {
  date = null;
  isAdvanced: boolean = false;

  public taskList: any[] = [];
  public inCplTask: any[] = [];
  public taskNumberInProject: number = 0;
  public inCplTaskNumberInProject: number = 0;

  public projectList: any[] = [];

  public teamList: any[] = [];

  public memberList: any[] = [];

  pageNumber: number = 1;
  pageSize: number = 999;
  txtProjectSearch: string = '';
  txtTaskSearch: string = '';
  txtTeamSearch: string = '';
  txtMemberSearch: string = '';
  sortProject: string = '';
  sortTask: string = '';

  pieChartOptions: any;
  barChartOptions: any;
  Highcharts: typeof Highcharts = Highcharts;

  constructor(
    private taskData: TaskData,
    private projectData: ProjectData,
    private teamData: TeamData,
    private memberData: MemberData,
  ) {}

  ngOnInit(): void {
    this.getTask();
    this.pieChartOption();
    this.barChartOption();
    this.getTeam();
    this.getProject();
    this.getMember();
  }

  getWeek(result: Date[]): void {
    console.log('week: ', result.map(getISOWeek));
  }

  getTask() {
    this.taskData
      .search(this.pageNumber, this.pageSize, this.txtTaskSearch, this.sortTask)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.taskList = res.pagingData.content;
          this.taskNumberInProject = this.taskList.length;
          this.InCompleteTask();
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  getProject() {
    this.projectData
      .search(this.pageNumber, this.pageSize, this.txtProjectSearch, this.sortProject)
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

  getTeam() {
    this.teamData
      .search(this.pageNumber, this.pageSize, this.txtTeamSearch)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.teamList = res.pagingData.content;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  getMember() {
    this.memberData
      .search(this.pageNumber, this.pageSize, this.txtMemberSearch)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.memberList = res.pagingData.content;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  search() {
    this.getTask();
    this.txtTaskSearch = '';
  }

  getProjectValue(value: any) {
    this.txtTaskSearch += `projectId.eq.${value},`
  }

  InCompleteTask() {
    this.inCplTask = [];
    for (let i = 0; i < this.taskList.length; i++) {
      if (this.taskList[i].state == 0)
        this.inCplTask.push(this.taskList[i]);
    }
    this.inCplTaskNumberInProject = this.inCplTask.length;
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
          name: 'Số task hoàn thành',
          colorByPoint: true,
          data: [
            {
              name: 'Dự án 1',
              y: 70.67,
            },
            {
              name: 'Dự án 2',
              y: 14.77,
            },
            {
              name: 'Dự án 3',
              y: 4.86,
            },
            {
              name: 'Dự án 4',
              y: 2.63,
            },
            {
              name: 'Dự án 5',
              y: 1.53,
            },
            {
              name: 'Dự án 6',
              y: 1.4,
            },
            {
              name: 'Dự án 7',
              y: 0.84,
            },
            {
              name: 'Dự án 8',
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
        text: 'Tình trạng dự án',
      },
      xAxis: {
        categories: [
          'Dự án 1',
          'Dự án 2',
          'Dự án 3',
        ],
        crosshair: true,
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Số Task',
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
          name: 'Tổng Task',
          data: [
            10, 20, 15
          ],
        },
        {
          name: 'Task hoàn thành',
          data: [
            3, 8, 5
          ],
        },
        {
          name: 'Task chưa hoàn thành',
          data: [
            7, 12, 10
          ],
        },
      ],
    };
  }
}
