import { Component, ElementRef, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { permissionContent } from '../../_core/model/permission';
// import { PermissionService } from '../_core/api/permission/permission.service';
import { ModeModal } from '../../_core/enum/modeModal';
import { DeleteComponent } from './delete/delete.component';
import { PermissionFormComponent } from './permission-form/permission-form.component';
import { PermissionData } from '../../_core/api/permission/permission-data';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.scss'],
})
export class PermissionComponent implements OnInit {
  constructor(
    private permissionData: PermissionData,
    private modalService: NzModalService,
    private notifyService: NzNotificationService,
    private element: ElementRef
  ) {}

  public listData: any;
  public listId: number[] = [];
  public searchField = ['Name', 'Email', 'Advanced Filter'];

  public pageNumber = 1;
  public pageSize = 10;
  public txtSearch: string | undefined;
  public totalElements = 0;
  public totalPages: number | undefined;

  checkedBoxAll = false;
  FilterValue = '';
  disableRoute = false;
  isCollapse = false;

  modalOptions: any = {
    nzDuration: 2000,
  };

  ngOnInit(): void {
    this.getPermission();
    console.log(this.listId);
  }

  isCollapsed() {
    this.isCollapse = !this.isCollapse;
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
    this.getPermission();
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
    this.getPermission();
  }

  changePageNumber(event: any) {
    this.pageNumber = event;
    this.getPermission();
  }

  public async getPermission() {
    this.permissionData
      .search(this.pageNumber, this.pageSize, this.txtSearch)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.listData = res.pagingData.content;
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
        nzTitle: 'Thêm mới role',
        nzClassName: 'modal-custom',
        nzContent: PermissionFormComponent,
        nzWidth: 'modal-custom',
        nzCentered: true,
        nzMaskClosable: false,
        nzComponentParams: {
          mode: ModeModal.CREATE,
          title: 'Thêm mới role',
        },
        nzDirection: 'ltr', // left to right
      })
      .afterClose.subscribe({
        next: (res) => {
          console.log(res);
          if (res) {
            this.notifyService.success(
              'Thành công',
              'Thêm mới role',
              this.modalOptions
            );
            this.getPermission();
            // this.router.navigate(['/project/welcome/' + res.data.id]);
          }
        },
        error: (res) => {
          console.log(res);
        },
      });
  }

  onUpdate(item: permissionContent): void {
    this.modalService
      .create({
        nzTitle: 'Chỉnh sửa role',
        nzClassName: 'modal-custom',
        nzContent: PermissionFormComponent,
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
              'Chỉnh sửa role',
              this.modalOptions
            );
          }
          this.getPermission();
        },
        error: (res) => {
          console.log(res);
        },
      });
  }

  onView(item: permissionContent): void {
    this.modalService.create({
      nzTitle: 'Xem role',
      nzClassName: 'modal-custom',
      nzContent: PermissionFormComponent,
      nzWidth: 'modal-custom',
      nzCentered: true,
      nzMaskClosable: false,
      nzComponentParams: {
        mode: ModeModal.VIEW,
        title: 'Xem role',
        id: item.id,
      },
      nzDirection: 'ltr', // left to right
    });
  }

  onDelete(id: number): void {
    this.modalService
      .create({
        nzTitle: 'Xóa role',
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
            this.permissionData.deleteById(id).subscribe({
              next: (res) => {
                if (res) {
                  this.notifyService.success(
                    'Thành công',
                    'Xóa role',
                    this.modalOptions
                  );
                }
                this.getPermission();
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
        nzTitle: 'Xóa nhiều role',
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
            this.permissionData.deleteSelectedId(listId).subscribe({
              next: (res) => {
                if (res) {
                  this.notifyService.success(
                    'Thành công',
                    'Xóa role',
                    this.modalOptions
                  );
                }
                this.getPermission();
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
}
