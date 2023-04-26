import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { PermissionData } from 'src/app/_core/api/permission/permission-data';
import { RolePermissionData } from 'src/app/_core/api/role-permission/role-permission-data';
import { rolePermissionContent } from 'src/app/_core/model/role-permission';
import { permissionContent } from 'src/app/_core/model/permission';
import { Location } from '@angular/common';

@Component({
  selector: 'app-role-app-detail',
  templateUrl: './role-app-detail.component.html',
  styleUrls: ['./role-app-detail.component.scss'],
})
export class RoleAppDetailComponent implements OnInit {
  public listData: any;
  public listRolePer: any;
  public listParent: any[] = [];
  public listChild: any[] = [];
  public listSubChild: any[] = [];
  public listId: number[] = [];

  public pageNumber = 1;
  public pageSize = 999;
  public txtSearch: string | undefined;
  public txtRolePer: string | undefined;
  public totalElements = 0;
  public totalPages: number | undefined;

  public checkedBoxAll = false;
  public isClicked = false;

  modalOptions: any = {
    nzDuration: 2000,
  };

  constructor(
    private permissionData: PermissionData,
    private rolePerData: RolePermissionData,
    private route: ActivatedRoute,
    private notifyService: NzNotificationService,
    private _location: Location
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

  getPermission() {
    // debugger;
    this.getRolePer();
    this.permissionData
      .search(this.pageNumber, this.pageSize, this.txtSearch)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.listData = this.sortArray(res.pagingData.content);
          this.rolePerChecked();
          console.log(this.listData);
          this.totalElements = res.pagingData.totalElements;
          this.totalPages = res.pagingData.totalPages;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  sortArray(array: any[]) {
    array.sort((a, b) => a.code.localeCompare(b.code));
    array.forEach((item) => {
      const children = array.filter((child) => child.parentCode === item.code);
      if (children.length > 0) {
        this.sortArray(children);
        item.children = children;
      }
    });
    return array.filter((item) => !item.parentCode);
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
      for (let j = 0; j < this.listRolePer.length; j++) {
        if (this.listRolePer[j].permissionId === item.permissionId) {
          item.id = this.listRolePer[j].id;
        }
      }
      items.push(item);
    }
    function getDifference(array1: any[], array2: any[]) {
      return array1.filter(
        (object1) => !array2.some((object2) => object1.id === object2.id)
      );
    }
    deleteItems = [
      ...getDifference(items, this.listRolePer),
      ...getDifference(this.listRolePer, items),
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
    });
    // this.rolePerData.saveList(this.listData).subscribe({
    //   next: (res) => {
    //     if(res) {
    //       console.log(res);
    //     }
    //   },
    //   error: (err) => {
    //     console.log(err);
    //   }
    // })
  }

  notify() {
    this.notifyService.success('Thành công', 'Phân quyền', this.modalOptions);
  }

  checkedAll(arr: any, event: any, id: number) {
    // item.children.forEach(
    //   (item1: { isChecked: any; id: number;}) => {
    //       item1.isChecked = event;
    //       if (item1.isChecked === true && this.listId.indexOf(item1.id) === -1)
    //         this.listId.push(item1.id);
    //       else if (
    //         item1.isChecked === true &&
    //         this.listId.indexOf(item1.id) !== -1
    //       ) {
    //         return;
    //       } else {
    //         const index = this.listId.indexOf(item1.id);
    //         this.listId.splice(index, 1);
    //       }
    //       // console.log(item.isChecked);
    //       console.log(this.listId);
    //   }
    // );

    return arr.reduce((a: any, item: any) => {
      if (a) return a;
      if (item.id === id) {
        item.isCheckedAll = event;
        if (item.children) {
          item.children.map((x: { id: number; isCheckedAll: boolean; isChecked: boolean; type: number; children: any[] }) => {
            if(x.type == 0) {
              x.isCheckedAll = event;
              x.children.map((y: { id: number; isCheckedAll: boolean; isChecked: boolean; type: number; children: any[] }) => {
                y.isChecked = event;
                if (y.isChecked === true && this.listId.indexOf(y.id) === -1)
                  this.listId.push(y.id);
                else if (
                  x.isChecked === true &&
                  this.listId.indexOf(y.id) !== -1
                ) {
                  return;
                } else {
                  const index = this.listId.indexOf(y.id);
                  this.listId.splice(index, 1);
                }
                return y;
              });
              return x;
            }
            else {
              x.isChecked = event;
              if (x.isChecked === true && this.listId.indexOf(x.id) === -1)
                this.listId.push(x.id);
              else if (
                x.isChecked === true &&
                this.listId.indexOf(x.id) !== -1
              ) {
                return;
              } else {
                const index = this.listId.indexOf(x.id);
                this.listId.splice(index, 1);
              }
              return x;
            }
          });
          return;
        }
      }
      if (item.children) {
        return this.checkedAll(item.children, event, id);
      }
    }, null);

  }

  rolePerChecked() {
    setTimeout(() => {
      for (let i = 0; i < this.listRolePer.length; i++) {
        for (let j = 0; j < this.listData.length; j++) {
          for (let k = 0; k < this.listData[j].children.length; k++) {
            if(!this.listData[j].children[k].hasOwnProperty('children')) {
              if (this.listRolePer[i].permissionId === this.listData[j].children[k].id) {
                this.listData[j].children[k].isChecked = true;
              }
            }
            if(this.listData[j].children[k].hasOwnProperty('children')) {
              for (let t = 0; t < this.listData[j].children[k].children.length; t++) {
                if (this.listRolePer[i].permissionId === this.listData[j].children[k].children[t].id) {
                  this.listData[j].children[k].children[t].isChecked = true;
                }
              }
            }
          }
        }
      }
    }, 100);
  }

  isChecked(arr: any, event: any, id: number) {
    return arr.reduce((a: any, item: any) => {
      if (a) return a;
      if (item.id === id) {
        item.isChecked = event;
        return this.checkIntoArr(item);
      }
      if (item.children) return this.isChecked(item.children, event, id);
    }, null);
  }

  checkIntoArr(item: any) {
    let a = item;
    if (a.isChecked === true && this.listId.indexOf(a.id) === -1) {
      this.listId.push(a.id);
      console.log(this.listData);

    } else {
      let b = this.listId.indexOf(a.id);
      console.log(b);
      if (b > -1) {
        this.listId.splice(b, 1);
      }
    }
  }

  goBack() {
    this._location.back();
  }
}
