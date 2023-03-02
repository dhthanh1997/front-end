import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { PermissionData } from 'src/app/_core/api/permission/permission-data';
import { RolePermissionData } from 'src/app/_core/api/role-permission/role-permission-data';
import { rolePermissionContent } from 'src/app/_core/model/role-permission';

@Component({
  selector: 'app-role-app-detail',
  templateUrl: './role-app-detail.component.html',
  styleUrls: ['./role-app-detail.component.scss'],
})
export class RoleAppDetailComponent implements OnInit {
  public listData: any;
  public listRolePer: any;
  public listParent: any = [];
  public listChild: any = [];
  public listId: number[] = [];

  public pageNumber = 1;
  public pageSize = 999;
  public txtSearch: string | undefined;
  public txtRolePer: string | undefined;
  public totalElements = 0;
  public totalPages: number | undefined;

  checkedBoxAll = false;
  isClicked = false;

  modalOptions: any = {
    nzDuration: 2000,
  };

  constructor(
    private permissionData: PermissionData,
    private rolePerData: RolePermissionData,
    private route: ActivatedRoute,
    private notifyService: NzNotificationService,
  ) {}

  ngOnInit(): void {
    this.getPermission();
  }

  public getIdRole() {
    // debugger;
    let id = this.route.snapshot.paramMap.get('id');
    this.txtRolePer = `roleId.eq.${id},`;
    console.log(id);
    return parseInt(id!);
  }

  async getPermission() {
    // debugger;
    this.getRolePer();
    this.permissionData
      .search(this.pageNumber, this.pageSize, this.txtSearch)
      .subscribe({
        next: async (res) => {
          console.log(res);
          this.listData = res.pagingData.content;
          this.getParentCode();
          this.getChildCode();
          console.log(this.listData);
          this.totalElements = res.pagingData.totalElements;
          this.totalPages = res.pagingData.totalPages;
          await this.rolePerChecked();
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  getRolePer() {
    this.getIdRole();
    this.rolePerData
      .search(this.pageNumber, this.pageSize, this.txtRolePer)
      .subscribe({
        next: (res) => {
          // console.log("on role per");
          this.listRolePer = res.pagingData.content;
          for (let i = 0; i < this.listRolePer.length; i++) {
            this.listId.push(res.pagingData.content[i].permissionId);
          }
          console.log(this.listRolePer);
          console.log(this.listId);
          this.totalElements = res.pagingData.totalElements;
          this.totalPages = res.pagingData.totalPages;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  onCreate() {
    let items: any = [];
    let deleteItems: any = [];
    let deleteIds: any = [];
    for (let i = 0; i < this.listId.length; i++) {
      let item: rolePermissionContent = {
        id: 0,
        roleId: 0,
        permissionId: 0,
      };
      item.roleId = this.getIdRole();
      item.permissionId = this.listId[i];
      for(let j = 0; j < this.listRolePer.length; j++) {
        if(this.listRolePer[j].permissionId === item.permissionId) {
          item.id = this.listRolePer[j].id;
        }
      }
      items.push(item);
    }
    function getDifference(array1: any[], array2: any[]) {
      return array1.filter(
        object1 => !array2.some(
          object2 => object1.id === object2.id
        ),
      );
    }
    deleteItems = [
      ...getDifference(items, this.listRolePer),
      ...getDifference(this.listRolePer, items)
    ];

    for (let i = 0; i < deleteItems.length; i++) {
      deleteIds.push(deleteItems[i].id);
    }
    this.rolePerData.save(items).subscribe({
      next: (res: rolePermissionContent) => {
        // console.log(res);
        if (res) {
          console.log(res);
        }
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {
        console.log('done');
      },
    });
    this.rolePerData.deleteSelectedId(deleteIds).subscribe({
      next: async (res) => {
        // console.log(res);
        if (res) {
          await this.notify();
        }
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {
        console.log('done');
      },
    })
  }

  notify() {
    this.notifyService.success(
      'Success',
      'Role permission created successfully',
      this.modalOptions
    );
  }

  getParentCode() {
    for (let i = 0; i < this.listData.length; i++) {
      if (this.listData[i].parentCode == null)
        this.listParent.push(this.listData[i]);
      // console.log(this.listParent);
    }
  }

  getChildCode() {
    for (let i = 0; i < this.listData.length; i++) {
      if (this.listData[i].parentCode != null)
        this.listChild.push(this.listData[i]);
      // console.log(this.listChild);
    }
  }

  checkedAll(index: number, event: any) {
    console.log(event);
    this.listChild.forEach(
      (item: { isChecked: any; id: number; parentCode: string }) => {
        if (item.parentCode === this.listParent[index].code) {
          item.isChecked = event;
          if (item.isChecked === true && this.listId.indexOf(item.id) === -1)
            this.listId.push(item.id);
          else if (
            item.isChecked === true &&
            this.listId.indexOf(item.id) !== -1
          ) {
            return;
          } else this.listId = [];
          // console.log(item.isChecked);
          console.log(this.listId);
        }
      }
    );
  }

  rolePerChecked() {
    // debugger;
    setTimeout(() => {
      for (let i = 0; i < this.listRolePer.length; i++) {
        for (let j = 0; j < this.listData.length; j++) {
          if (this.listRolePer[i].permissionId === this.listData[j].id) {
            this.listData[j].isChecked = true;
          }
        }
      }
    }, 100);
  }

  isChecked(event: any, index: number) {
    // debugger;
    this.listChild[index].isChecked = event;
    this.checkIntoArr(index);
    console.log(this.listId);
  }

  checkIntoArr(index: number) {
    let a = this.listChild[index];
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
}
