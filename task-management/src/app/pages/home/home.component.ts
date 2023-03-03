import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2,
} from '@angular/core';
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

  public pageNumber = 1;
  public pageSize = 7;
  public txtSearch: string | undefined;

  isHidden = false;

  constructor(
    private projectData: ProjectData,
    private memberData: MemberData,
    private taskData: TaskData,
    private element: ElementRef
  ) {}

  ngOnInit(): void {
    this.getProject();
    this.getMember();
    this.getTask();
  }

  public getProject() {
    this.projectData
      .search(this.pageNumber, this.pageSize, this.txtSearch)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.listData = res.pagingData.content;
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
    this.isHidden = true;
  }

  showLessProject() {
    this.pageSize = 7;
    this.getProject();
    this.isHidden = false;
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
    this.isHidden = true;
  }

  showLessMember() {
    this.pageSize = 7;
    this.getMember();
    this.isHidden = false;
  }

  public getTask() {
    this.taskData
      .search(this.pageNumber, this.pageSize, this.txtSearch)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.listTasks = res.pagingData.content;
          // console.log(this.listData);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  showAllTask() {
    this.pageSize = 99999;
    this.getMember();
    this.isHidden = true;
  }

  showLessTask() {
    this.pageSize = 7;
    this.getMember();
    this.isHidden = false;
  }
}
