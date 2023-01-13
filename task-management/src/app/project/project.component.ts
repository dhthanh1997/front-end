/* eslint-disable no-debugger */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, ElementRef, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ProjectFormComponent } from './project-form/project-form.component';
import { content } from './service/project';
import { ProjectService } from './service/project.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { DeleteComponent } from './delete/delete.component';

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
    private service: ProjectService,
    private modalService: NzModalService,
    private notifyService: NzNotificationService,
    private element: ElementRef
  ) {}

  public listData: any;
  public listId: number[] = [];
  public searchField = ['name', 'revenue'];

  public pageNumber = 1;
  public pageSize = 10;
  public txtSearch: string | undefined;
  public totalElements = 0;
  public totalPages: number | undefined;

  checkedBoxAll = false;
  FilterValue = '';
  disableRoute = false;

  modalOptions: any = {
    nzDuration: 2000,
  };

  ngOnInit(): void {
    this.getProject();
    this.service.switchLanguage();
    console.log(this.listId);
  }

  search() {
    const input = this.element.nativeElement.querySelector('#search');
    if (this.FilterValue === '') {
      console.log(this.FilterValue);
      this.txtSearch = `name.cn.${input.value},`;
    } else {
      console.log(this.FilterValue);
      this.txtSearch = `${this.FilterValue}.cn.${input.value},`;
      console.log(this.txtSearch);
    }
    this.getProject();
  }

  getFilterValue(index: number) {
    console.log(this.searchField[index]);
    this.FilterValue = this.searchField[index];
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
    this.service
      .getProject(this.pageNumber, this.pageSize, this.txtSearch)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.listData = res.pagingData.content;
          // console.log(this.listData);
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
        nzTitle: 'New Project',
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
              'Thêm mới yêu cầu',
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

  onUpdate(item: content): void {
    this.modalService
      .create({
        nzTitle: 'Update Project',
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
              'Chỉnh sửa yêu cầu',
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

  onView(item: content): void {
    this.modalService.create({
      nzTitle: 'View Project',
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
        nzTitle: 'Delete Project',
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
            this.service.deleteProject(id).subscribe({
              next: (res) => {
                if (res) {
                  this.notifyService.success(
                    'Thành công',
                    'Xóa yêu cầu',
                    this.modalOptions
                  );
                }
                this.getProject();
              },
              error: (err) => {
                console.log(err);
              },
              complete: () => {},
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
        nzTitle: 'Delete Selected Project',
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
            this.service.deleteSelectedProject(listId).subscribe({
              next: (res) => {
                if (res) {
                  this.notifyService.success(
                    'Thành công',
                    'Xóa yêu cầu',
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
              complete: () => {},
            });
          }
        },
        error: (res) => {
          console.log(res);
        },
      });
  }

  // public addProject() {
  //   this.service.addProject(this.postData).subscribe({
  //     next: (res) => {
  //       // console.log(res);
  //       this.postData = res.data;
  //       console.log(res.data);
  //       // this.router.navigateByUrl('welcome');
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     },
  //   });
  // }
}
