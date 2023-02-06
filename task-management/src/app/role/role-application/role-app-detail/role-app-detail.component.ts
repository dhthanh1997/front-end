import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  OnInit,
} from '@angular/core';
import { PermissionService } from 'src/app/_core/api/permission/permission.service';

@Component({
  selector: 'app-role-app-detail',
  templateUrl: './role-app-detail.component.html',
  styleUrls: ['./role-app-detail.component.scss'],
})
export class RoleAppDetailComponent implements OnInit, AfterViewInit {
  public listData: any;
  public list1: any;
  public list2: any;
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
    console.log(this.listData);
  }

  ngAfterViewInit() {
    console.log(this.listData);
    // this.pushArr();
  }

  // ngAfterViewChecked() {
  //   console.log(this.listData);
  // }

  public getPermission() {
    debugger;
    this.service
      .getPermission(this.pageNumber, this.pageSize, this.txtSearch)
      .subscribe({
        next: (res) => {
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

  pushArr() {
    // debugger;
    for (let item of this.listData) {
      if (item.code === 'string') {
        this.list1.push(item);
      } else this.list2.push(item);
    }
    console.log(this.list1);
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
}
