import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2,
} from '@angular/core';
import { Router } from '@angular/router';
import { MemberData } from 'src/app/_core/api/member/member-data';
import { TaskData } from 'src/app/_core/api/task/task-data';
import { ProjectData } from '../../_core/api/project/project-data';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public now = new Date();

  public listData: any;
  public listMember: any;
  public listTasks: any;

  public totalProject: number = 0;
  public totalTask: number = 0;

  public pageNumber = 1;
  public pageSize = 8;
  public txtSearch: string | undefined;

  isProjectHidden = false;
  isMemberHidden = false;
  isTaskHidden = false;

  constructor(
    private projectData: ProjectData,
    private memberData: MemberData,
    private taskData: TaskData,
    private element: ElementRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getProject();
    this.getMember();
    this.getTask();
    this.refresh();
  }

  public getProject() {
    this.projectData
      .search(this.pageNumber, this.pageSize, 'parentId.nu.nu,')
      .subscribe({
        next: (res) => {
          console.log(res);
          this.listData = res.pagingData.content;
          this.totalProject = res.pagingData.totalElements;
          // console.log(this.listData);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  showAllProject() {
    this.pageSize = 99999;
    this.getProject();
    this.isProjectHidden = true;
  }

  showLessProject() {
    this.pageSize = 8;
    this.getProject();
    this.isProjectHidden = false;
  }

  public getMember() {
    this.memberData
      .search(this.pageNumber, this.pageSize, this.txtSearch)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.listMember = res.pagingData.content;
          // console.log(this.listData);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  showAllMember() {
    this.pageSize = 99999;
    this.getMember();
    this.isMemberHidden = true;
  }

  showLessMember() {
    this.pageSize = 8;
    this.getMember();
    this.isMemberHidden = false;
  }

  public getTask() {
    this.taskData
      .search(this.pageNumber, this.pageSize, 'parentId.nu.nu,')
      .subscribe({
        next: (res) => {
          console.log(res);
          this.listTasks = res.pagingData.content;
          this.totalTask = res.pagingData.totalElements;
          // console.log(this.listData);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  showAllTask() {
    this.pageSize = 99999;
    this.getTask();
    this.isTaskHidden = true;
  }

  showLessTask() {
    this.pageSize = 8;
    this.getTask();
    this.isTaskHidden = false;
  }

  projectNav(id: any) {
    this.router.navigate(['pages/task/project-task', id]);
  }

  realTime() {
    setTimeout(() => {
      this.refresh();
    }, 1000);
  }

  refresh() {
    let a = new Date();
    let b = a.getHours( ) >= 12 ? ' PM' : ' AM';
    this.element.nativeElement.querySelector(
      '.date-time'
    ).innerHTML = `Ngày ${a.getDate()} tháng ${a.getMonth()+1} năm ${a.getFullYear()} - ${a.getHours()}:${a.getMinutes()} ${b}`;
    this.realTime();
  }
}
