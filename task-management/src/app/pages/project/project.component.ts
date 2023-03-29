/* eslint-disable no-debugger */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, ElementRef, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ProjectFormComponent } from './project-form/project-form.component';
import { projectContent } from '../.././_core/model/project';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { DeleteComponent } from './delete/delete.component';
import { Router } from '@angular/router';
import { ProjectData } from '../../_core/api/project/project-data';
import { timer } from 'rxjs';
import { TaskData } from 'src/app/_core/api/task/task-data';

enum ModeModal {
  CREATE = 'create',
  UPDATE = 'update',
  VIEW = 'view',
}

@Component({
  selector: 'internal-app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {
  constructor(
    private projectData: ProjectData,
    private taskData: TaskData,
    private modalService: NzModalService,
    private notifyService: NzNotificationService,
    private element: ElementRef,
    private router: Router
  ) { }

  public listData: any;
  public listId: number[] = [];
  public filterField = ['Tên', 'Doanh thu'];
  public sortField = ['Tăng dần (tên)', 'Giảm dần (tên)'];

  public taskList: any[] = [];
  public idTaskList: any[] = [];

  public pageNumber = 1;
  public pageSize = 10;
  public txtSearch: string | undefined = '';
  public totalElements = 0;
  public totalPages: number | undefined;

  checkedBoxAll: boolean = false;
  FilterValue = '';
  SorterValue = 'name_asc,';

  FilterDisplay = 'Tên';
  SorterDisplay = 'Tăng dần (tên)';

  disableRoute = false;

  modalOptions: any = {
    nzDuration: 2000,
  };

  ngOnInit(): void {
    this.getProject();
    // this.projectData.switchLanguage();
    console.log(this.listId);
    this.getTask();
  }


  // event
  // navigationTask(id: any) {
  //   this.router.navigate(['pages/task/project-task', id]);
  // }

  search() {
    // debugger;
    const input = this.element.nativeElement.querySelector('#search');
    if (this.FilterValue === '') {
      console.log(this.FilterValue);
      this.txtSearch += `name.cn.${input.value},`;
    } else {
      console.log(this.FilterValue);
      this.txtSearch += `${this.FilterValue}.cn.${input.value},`;
      console.log(this.txtSearch);
    }
    this.getProject();
    this.txtSearch = 'parentId.nu.null,';
  }

  getFilterValue(index: number) {
    console.log(this.filterField[index]);
    this.FilterValue = this.filterField[index];
    if (this.FilterValue === 'Tên') {
      this.FilterValue = 'name';
      this.FilterDisplay = 'Tên'
    }
    else if (this.FilterValue === 'Doanh thu') {
      this.FilterValue = 'revenue';
      this.FilterDisplay = 'Doanh thu';
    }
  }

  getSorterValue(index: number) {
    console.log(this.sortField[index]);
    this.SorterValue = this.sortField[index];
    if (this.SorterValue === 'Tăng dần (tên)') {
      this.SorterValue = 'name_asc,';
      this.SorterDisplay = 'Tăng dần (tên)';
    } else if (this.SorterValue === 'Giảm dần (tên)') {
      this.SorterValue = 'name_des,';
      this.SorterDisplay = 'Giảm dần (tên)';
    }
    this.getProject();
  }

  checkedAll(event: any) {
    console.log(event);
    this.listData.forEach((item: { isChecked: any; id: number }) => {
      item.isChecked = event;
      if (item.isChecked === true && this.listId.indexOf(item.id) === -1)
        this.listId.push(item.id);
      else if (item.isChecked === true && this.listId.indexOf(item.id) !== -1) {
        return;
      } else this.listId = [];
      // console.log(item.isChecked);
      console.log(this.listId);
    });
  }

  isChecked(event: any, index: number) {
    this.listData[index].isChecked = event;
    this.checkIntoArr(index);
    // console.log(this.listData[index].isChecked);
    console.log(this.listId);
  }

  checkIntoArr(index: number) {
    let a = this.listData[index];
    // debugger;
    if (a.isChecked === true && this.listId.indexOf(a.id) === -1) {
      this.listId.push(a.id);
    } else {
      let b = this.listId.indexOf(a.id);
      console.log(b);
      // debugger;
      if (b > -1) {
        this.listId.splice(b, 1);
      }
    }
  }

  changePageSize(event: any) {
    this.pageSize = event;
    this.getProject();
  }

  changePageNumber(event: any) {
    this.pageNumber = event;
    this.getProject();
  }

  public getProject() {
    this.projectData
      .search(this.pageNumber, this.pageSize, this.txtSearch, this.SorterValue)
      .subscribe({
        next: (res) => {
          // debugger;
          console.log(res);
          this.listData = res.pagingData.content;
          console.log(this.listData);
          this.totalElements = res.pagingData.totalElements;
          this.totalPages = res.pagingData.totalPages;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  onCreate(): void {
    this.modalService
      .create({
        nzTitle: 'Thêm mới dự án',
        nzClassName: 'modal-custom',
        nzContent: ProjectFormComponent,
        nzWidth: 'modal-custom',
        nzCentered: true,
        nzMaskClosable: false,
        nzComponentParams: {
          mode: ModeModal.CREATE,
          title: 'Thêm yêu cầu',
        },
        nzDirection: 'ltr', // left to right
      })
      .afterClose.subscribe({
        next: (res) => {
          console.log(res);
          if (res) {
            this.notifyService.success(
              'Thành công',
              'Thêm mới dự án',
              this.modalOptions
            );
            this.getProject();
            // this.router.navigate(['pages/task/project-task' + res.data.id]);
          }
        },
        error: (res) => {
          console.log(res);
        },
      });
  }

  onUpdate(item: projectContent): void {
    this.modalService
      .create({
        nzTitle: 'Chỉnh sửa dự án',
        nzClassName: 'modal-custom',
        nzContent: ProjectFormComponent,
        nzWidth: 'modal-custom',
        nzCentered: true,
        nzMaskClosable: false,
        nzComponentParams: {
          mode: ModeModal.UPDATE,
          id: item.id,
        },
        nzDirection: 'ltr', // left to right
      })
      .afterClose.subscribe({
        next: (res) => {
          console.log(res);
          if (res) {
            this.notifyService.success(
              'Thành công',
              'Chỉnh sửa dự án',
              this.modalOptions
            );
          }
          this.getProject();
        },
        error: (res) => {
          console.log(res);
        },
      });
  }

  onView(item: projectContent): void {
    this.modalService.create({
      nzTitle: 'Xem dự án',
      nzClassName: 'modal-custom',
      nzContent: ProjectFormComponent,
      nzWidth: 'modal-custom',
      nzCentered: true,
      nzMaskClosable: false,
      nzComponentParams: {
        mode: ModeModal.VIEW,
        title: 'View Project',
        id: item.id,
      },
      nzDirection: 'ltr', // left to right
    });
  }

  onDelete(id: number): void {
    this.modalService
      .create({
        nzTitle: 'Xóa dự án',
        nzClassName: 'modal-custom',
        nzContent: DeleteComponent,
        nzCentered: true,
        nzMaskClosable: false,
        nzDirection: 'ltr', // left to right
      })
      .afterClose.subscribe({
        next: (res) => {
          console.log(res);
          if (res) {
            this.projectData.deleteProject(id).subscribe({
              next: (res) => {
                if (res) {
                  this.notifyService.success(
                    'Thành công',
                    'Xóa dự án',
                    this.modalOptions
                  );
                  this.deleteTaskList(id);
                }
                this.getProject();
              },
              error: (err) => {
                console.log(err);
              },
              complete: () => { },
            });
          }
        },
        error: (res) => {
          console.log(res);
        },
      });
  }

  onDeleteAll(listId: number[]) {
    this.modalService
      .create({
        nzTitle: 'Xóa nhiều dự án',
        nzClassName: 'modal-custom',
        nzContent: DeleteComponent,
        nzCentered: true,
        nzMaskClosable: false,
        nzDirection: 'ltr', // left to right
      })
      .afterClose.subscribe({
        next: (res) => {
          console.log(res);
          if (res) {
            this.projectData.deleteSelectedProject(listId).subscribe({
              next: (res) => {
                if (res) {
                  this.notifyService.success(
                    'Thành công',
                    'Xóa dự án',
                    this.modalOptions
                  );
                }
                this.getProject();
              },
              error: (err) => {
                console.log(err);
                console.log(listId);
                console.log(this.listData);
              },
              complete: () => { },
            });
          }
        },
        error: (res) => {
          console.log(res);
        },
      });
  }

  public getTask() {
    this.taskData.search(1, 999).subscribe({
      next: (res) => {
        console.log(res);
        if (res) {
          this.taskList = res.pagingData.content;
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  deleteTaskList(id: number) {
    for (let item of this.taskList) {
      if (item.projectId === id) {
        this.idTaskList.push(item.id);
      }
    }
    this.taskData.deleteSelectedId(this.idTaskList).subscribe({
      next: (res) => {
        console.log(res);
        if (res) {
          // do sth
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
