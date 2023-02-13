import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PermissionService } from 'src/app/_core/api/permission/permission.service';
import { rolePermissionContent } from 'src/app/_core/api/rolePermission/role-permission';
import { RolePermissionService } from 'src/app/_core/api/rolePermission/role-permission.service';

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

  constructor(
    private service: PermissionService,
    private rolePerService: RolePermissionService,
    private route: ActivatedRoute,
    private rolePermission: RolePermissionService
  ) {}

  ngOnInit(): void {
    this.getPermission();
  }

  public getIdRole() {
    // debugger;
    let id = this.route.snapshot.paramMap.get('id');
    this.txtRolePer =  `roleId.eq.${id},`;
    console.log(id);
    return parseInt(id!);
  }

  async getPermission() {
    // debugger;
    this.getRolePer();
    this.service
      .getPermission(this.pageNumber, this.pageSize, this.txtSearch)
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
    this.rolePerService
      .getRolePer(this.pageNumber, this.pageSize, this.txtRolePer)
      .subscribe({
        next: (res) => {
          console.log("on role per");
          this.listRolePer = res.pagingData.content;
          console.log(this.listRolePer);
          this.totalElements = res.pagingData.totalElements;
          this.totalPages = res.pagingData.totalPages;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  onCreate() {
    debugger;
    let items:any = [];
    for(let i=0; i<this.listId.length; i++) {

    let item: rolePermissionContent = {} ;
      item.roleId = this.getIdRole();
      item.permissionId = this.listId[i];
      items.push(item);
    }
    this.rolePermission.createRolePer(items).subscribe({
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
          // console.log(this.listId);
        }
      }
    );
  }

  rolePerChecked() {
    // debugger;
    setTimeout(() => {
      for(let i = 0; i < this.listRolePer.length; i++) {
        for(let j = 0; j < this.listData.length; j++) {
          if(this.listRolePer[i].permissionId === this.listData[j].id) {
            this.listData[j].isChecked = true;
          }
        }
      }
    }, 100)

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
