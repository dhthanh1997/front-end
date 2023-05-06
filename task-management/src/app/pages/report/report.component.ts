import { Component, OnInit } from '@angular/core';
import { TaskData } from 'src/app/_core/api/task/task-data';
import * as Highcharts from 'highcharts';
import { ProjectData } from 'src/app/_core/api/project/project-data';
import { getISOWeek } from 'date-fns';
import { TeamData } from 'src/app/_core/api/team/team-data';
import { MemberData } from 'src/app/_core/api/member/member-data';
import { ReportData } from 'src/app/_core/api/report/report-data';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit {
  date = null;
  isAdvanced: boolean = false;
  loading = true;

  memberValue = '';
  projectValue = '';
  teamValue = '';

  public taskList: any[] = [];
  public inCplTask: any[] = [];
  public taskNumber: number = 0;
  public inCplTaskNumber: number = 0;

  public projectList: any[] = [];

  public teamList: any[] = [];

  public memberList: any[] = [];

  public reportList: any[] = [];

  pageNumber: number = 1;
  pageSize: number = 999;
  txtProjectSearch: string = '';
  txtTaskSearch: string = '';
  txtTeamSearch: string = '';
  txtMemberSearch: string = '';
  txtReportSearch: string = '';
  txtReportSort: string = '';
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
    private reportData: ReportData,
  ) { }

  ngOnInit(): void {
    this.getReport();
    this.getTask();
    this.pieChartOption();
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
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  getProject() {
    this.projectData
      .search(
        this.pageNumber,
        this.pageSize,
        this.txtProjectSearch,
        this.sortProject
      )
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

  getReport() {
    this.reportData.search(this.txtReportSearch, this.txtReportSort).subscribe({
      next: (res) => {
        if (res) {
          // debugger
          this.reportList = res.listData;
          this.taskNumber = res.listData.length;
          this.InCompleteTask();
          this.barChartOption();
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  search() {
    this.getReport();
    this.txtReportSearch = '';
    this.memberValue = "";
    this.projectValue = "";
    this.teamValue = "";
  }

  getProjectValue(value: any) {
    this.txtReportSearch += `projectId.eq.${value},`;
  }

  getMemberValue(value: any) {
    this.txtReportSearch += `username.eq.${value},`
  }

  getTeamValue(value: any) {
    this.txtReportSearch += `teamId.eq.${value},`
  }

  InCompleteTask() {
    this.inCplTask = [];
    for (let i = 0; i < this.reportList.length; i++) {
      if (this.reportList[i].state == 0) this.inCplTask.push(this.reportList[i]);
    }
    this.inCplTaskNumber = this.inCplTask.length;
    this.pieChartOption();
  }

  exportExcel() {
    debugger;
    let projectId = Number(this.projectValue);
    this.reportData.exportExcel(projectId).subscribe({
      next: (res: any) => {

        // const byteCharacters = atob (res);
        // const byteNumbers = new Array (byteCharacters.length);
        // for (let i = 0; i <byteCharacters.length; i ++) {
        //   byteNumbers [i] = byteCharacters.charCodeAt (i);
        // }
        // const byteArray = new Uint8Array (byteNumbers);
        // let blob = new Blob ([byteArray], {type: 'application / vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
        // const url = window.URL.createObjectURL (blob);
        // const anchor = document.createElement ('a');
        // anchor.download = `test.xlsx`;
        // anchor.href = url;
        // anchor.click ();

        console.log(res);
        const dataType = res.type;
        const binaryData = [];
        binaryData.push(res);
        const downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, { type: dataType }));
        downloadLink.setAttribute('download', "test.xlsx");
        document.body.appendChild(downloadLink);
        downloadLink.click();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  pieChartOption() {
    this.pieChartOptions = {
      chart: {
        width: 450,
        height: 400,
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
          name: 'Tổng số Task',
          colorByPoint: true,
          data: [
            {
              name: 'Task hoàn thành',
              y: this.taskNumber - this.inCplTaskNumber,
            },
            {
              name: 'Task chưa hoàn thành',
              y: this.inCplTaskNumber,
            },
          ],
        },
      ],
    };
  }

  barChartOption() {
    let data: any[] = [];
    let listProject: any[] = [];
    let listTaskDone: any[] = [];
    let listTaskNotDone: any[] = [];
    let TaskDone: number = 0;
    let TaskNotDone: number = 0;
    for (let i = 0; i < this.reportList.length; i++) {
      let obj = data.find(element => element.projectId == this.reportList[i].projectId)
      if (obj == undefined) {
        if (this.reportList[i].state == 0) {
          data.push({
            projectId: this.reportList[i].projectId,
            taskDone: TaskDone,
            taskNotDone: ++TaskNotDone,
          });
          TaskNotDone = 0;
        }
        else {
          data.push({
            projectId: this.reportList[i].projectId,
            taskDone: ++TaskDone,
            taskNotDone: TaskNotDone,
          });
          TaskDone = 0;
        }
      }
      else {
        if (this.reportList[i].state == 0) {
          obj.taskNotDone++;
        }
        else obj.taskDone++;
      }
    }
    for (let i = 0; i < data.length; i++) {
      listProject.push(data[i].projectId);
      listTaskDone.push(data[i].taskDone);
      listTaskNotDone.push(data[i].taskNotDone);
    }
    this.barChartOptions = {
      chart: {
        width: 450,
        height: 400,
        type: 'column',
      },
      title: {
        text: 'Tình trạng dự án',
        align: 'left',
      },
      xAxis: {
        categories: listProject,
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Task',
        },
        stackLabels: {
          enabled: true,
          style: {
            fontWeight: 'bold',
            // color:
            //   // theme
            //   (Highcharts.defaultOptions.title.style &&
            //     Highcharts.defaultOptions.title.style.color) ||
            //   'gray',
            textOutline: 'none',
          },
        },
      },
      // legend: {
      //   align: 'bottom',
      //   x: 30,
      //   verticalAlign: 'bottom',
      //   y: 30,
      //   // floating: true,
      //   // backgroundColor:
      //   //   Highcharts.defaultOptions.legend.backgroundColor || 'white',
      //   borderColor: '#CCC',
      //   borderWidth: 1,
      //   shadow: false,
      // },
      tooltip: {
        headerFormat: '<b>{point.x}</b><br/>',
        pointFormat: '{series.name}: {point.y}<br/>Tổng số task: {point.stackTotal}',
      },
      plotOptions: {
        column: {
          stacking: 'normal',
          dataLabels: {
            enabled: true,
          },
        },
      },
      series: [
        {
          name: 'Task hoàn thành',
          data: listTaskDone,
        },
        {
          name: 'Task chưa hoàn thành',
          data: listTaskNotDone,
        },
      ],
    };
    this.loading = false;
  }
}
