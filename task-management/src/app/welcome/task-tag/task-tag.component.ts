/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { DeleteComponent } from '../board-view/delete/delete.component';
import { content } from './service/tag';
import { TaskTagService } from './service/task-tag.service';

@Component({
  selector: 'internal-app-task-tag',
  templateUrl: './task-tag.component.html',
  styleUrls: ['./task-tag.component.scss'],
})
export class TaskTagComponent implements OnInit {
  formValidation!: FormGroup;
  isConfirmLoading = false;
  isVisible = false;
  editIdx: number | null = null;

  modalOptions: any = {
    nzDuration: 2000,
  };

  public listData: any;
  public pageNumber = 1;
  public pageSize = 999;
  public txtSearch: string | undefined;

  constructor(
    private fb: FormBuilder,
    private service: TaskTagService,
    private modalService: NzModalService,
    private notifyService: NzNotificationService,
    private modelRef: NzModalRef<TaskTagComponent>
  ) {}

  get name() {
    return this.formValidation.get('name');
  }

  ngOnInit(): void {
    this.getTag();
    this.formValidation = this.fb.group({
      name: ['', []],
    });
  }

  public getTag() {
    this.service
      .getTag(this.pageNumber, this.pageSize, this.txtSearch)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.listData = res.pagingData.content;
          // console.log(this.listData);
          // this.totalElements = res.pagingData.totalElements;
          // this.totalPages = res.pagingData.totalPages;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  public createTag() {
    this.isConfirmLoading = true;
    const item: content = this.formValidation.value;
    this.service.addTag(item).subscribe({
      next: (res: content) => {
        console.log(res);
        if (res) {
          this.isVisible = false;
          this.isConfirmLoading = false;
          this.getTag();
          // this.modelRef.close(res);
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

  public onDelete(id: number): void {
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
            this.service.deleteTag(id).subscribe({
              next: (res) => {
                if (res) {
                  this.notifyService.success(
                    'Thành công',
                    'Xóa yêu cầu',
                    this.modalOptions
                  );
                }
                this.getTag();
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

  startEdit(idx: number): void {
    this.editIdx = idx;
  }

  stopEdit(): void {
    this.editIdx = null;
  }

  handleCancel(): void {
    this.isVisible = false;
    this.modelRef.close();
  }

  // getById(id: number) {
  //   this.service.getProjectById(id).subscribe({
  //     next: (res) => {
  //       console.log(res);
  //       this.formValidation.setValue({
  //         // id: res.data.id,
  //         name: res.data.name,
  //         parentId: res.data.parentId,
  //         revenue: res.data.revenue,
  //         startDate: res.data.startDate,
  //         endDate: res.data.endDate,
  //         rangeDate: [res.data.startDate, res.data.endDate],
  //         // realStartDate: res.data.realStartDate,
  //         // realEndDate: res.data.realEndDate,
  //         totalCost: res.data.totalCost,
  //         totalHour: res.data.totalHour,
  //         // isChecked: res.data.isChecked,
  //       });
  //     },
  //   });
  // }
}
