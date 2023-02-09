import { Component, OnInit } from '@angular/core';
import { PermissionService } from 'src/app/_core/api/permission/permission.service';

@Component({
  selector: 'app-role-app-detail',
  templateUrl: './role-app-detail.component.html',
  styleUrls: ['./role-app-detail.component.scss'],
})
export class RoleAppDetailComponent implements OnInit {
  public listData: any;
  public listParent: any = [];
  public listChild: any = [];
  public listId: number[] = [];

  public pageNumber = 1;
  public pageSize = 999;
  public txtSearch: string | undefined;
  public totalElements = 0;
  public totalPages: number | undefined;

  checkedBoxAll = false;
  isClicked = false;

  constructor(private service: PermissionService) {}

  ngOnInit(): void {
    this.getPermission();
  }

  getPermission() {
    // debugger;
    this.service
      .getPermission(this.pageNumber, this.pageSize, this.txtSearch)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.listData = res.pagingData.content;
          this.getParentCode();
          this.getChildCode();
          console.log(this.listData);
          this.totalElements = res.pagingData.totalElements;
          this.totalPages = res.pagingData.totalPages;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  getParentCode() {
    for (let i = 0; i < this.listData.length; i++) {
      if (this.listData[i].parentCode == null)
        this.listParent.push(this.listData[i]);
      console.log(this.listParent);
    }
  }

  getChildCode() {
    for (let i = 0; i < this.listData.length; i++) {
      if (this.listData[i].parentCode != null)
        this.listChild.push(this.listData[i]);
      console.log(this.listChild);
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

  isChecked(event: any, index: number) {
    // debugger;
    this.listChild[index].isChecked = event;
    this.checkIntoArr(index);
    // console.log(this.listData[index].isChecked);
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
