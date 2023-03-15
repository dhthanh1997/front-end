import { Component, ElementRef, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { TeamData } from 'src/app/_core/api/team/team-data';
import { ModeModal } from 'src/app/_core/enum/modeModal';
import { teamContent } from 'src/app/_core/model/team';
import { DeleteComponent } from './delete/delete.component';
import { TeamFormComponent } from './team-form/team-form.component';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  constructor(
    // private service: MemberService,
    private teamData: TeamData,
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
    this.getTeam();
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
    this.getTeam();
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
    this.getTeam();
  }

  changePageNumber(event: any) {
    this.pageNumber = event;
    this.getTeam();
  }

  public getTeam() {
    this.teamData
      .search(this.pageNumber, this.pageSize, this.txtSearch)
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
        nzTitle: 'Thêm mới nhóm',
        nzClassName: 'modal-custom',
        nzContent: TeamFormComponent,
        nzWidth: 'modal-custom',
        nzCentered: true,
        nzMaskClosable: false,
        nzComponentParams: {
          mode: ModeModal.CREATE,
          title: 'Thêm mới nhóm',
        },
        nzDirection: 'ltr', // left to right
      })
      .afterClose.subscribe({
        next: (res) => {
          console.log(res);
          if (res) {
            this.notifyService.success(
              'Thành công',
              'Thêm mới nhóm',
              this.modalOptions
            );
            this.getTeam();
            // this.router.navigate(['/project/welcome/' + res.data.id]);
          }
        },
        error: (res) => {
          console.log(res);
        },
      });
  }

  onUpdate(item: teamContent): void {
    this.modalService
      .create({
        nzTitle: 'Cập nhật nhóm',
        nzClassName: 'modal-custom',
        nzContent: TeamFormComponent,
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
              'Chỉnh sửa nhóm',
              this.modalOptions
            );
          }
          this.getTeam();
        },
        error: (res) => {
          console.log(res);
        },
      });
  }

  onView(item: teamContent): void {
    this.modalService.create({
      nzTitle: 'Xem nhóm',
      nzClassName: 'modal-custom',
      nzContent: TeamFormComponent,
      nzWidth: 'modal-custom',
      nzCentered: true,
      nzMaskClosable: false,
      nzComponentParams: {
        mode: ModeModal.VIEW,
        title: 'Xem nhóm',
        id: item.id,
      },
      nzDirection: 'ltr', // left to right
    });
  }

  onDelete(id: number): void {
    this.modalService
      .create({
        nzTitle: 'Xóa nhóm',
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
            this.teamData.deleteById(id).subscribe({
              next: (res) => {
                if (res) {
                  this.notifyService.success(
                    'Thành công',
                    'Xóa nhóm',
                    this.modalOptions
                  );
                }
                this.getTeam();
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
        nzTitle: 'Xóa nhiều nhóm',
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
            this.teamData.deleteSelectedId(listId).subscribe({
              next: (res) => {
                if (res) {
                  this.notifyService.success(
                    'Thành công',
                    'Xóa nhóm',
                    this.modalOptions
                  );
                }
                this.getTeam();
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
