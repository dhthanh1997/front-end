/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Project, projectContent } from '../../../_core/model/project';
import { ProjectData } from '../../../_core/api/project/project-data';
import {
  initDataObject,
  initFormArray,
  initFormObject,
  setDataInFormArray,
  updateControlInArray,
} from 'src/app/_base/util';
import { SubProjectComponent } from '../sub-project/sub-project.component';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { DeleteComponent } from '../delete/delete.component';

enum ModeModal {
  CREATE = 'create',
  UPDATE = 'update',
  VIEW = 'view',
}

@Component({
  selector: 'internal-app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss'],
})
export class ProjectFormComponent implements OnInit {
  formValidation!: FormGroup;
  isConfirmLoading = false;
  checked = false;

  subProjectList: any[] = [];

  @Input() mode!: string;

  @Input() title: string = '';

  @Input() id!: number;

  isVisible = false;

  modalOptions: any = {
    nzDuration: 2000,
  };

  constructor(
    private element: ElementRef,
    private fb: FormBuilder,
    private projectData: ProjectData,
    private modal: NzModalService,
    private notifyService: NzNotificationService,
    private modelRef: NzModalRef<ProjectFormComponent>
  ) {}

  get name() {
    return this.formValidation.get('name');
  }

  get parentId() {
    return this.formValidation.get('parentId');
  }

  get revenue() {
    return this.formValidation.get('revenue');
  }

  get startDate() {
    return this.formValidation.get('rangeDate')?.value[0];
  }

  get endDate() {
    return this.formValidation.get('rangeDate')?.value[1];
  }

  get rangeDate(): FormArray {
    return this.formValidation.get('rangeDate') as FormArray;
  }

  // get realStartDate() {
  //   return this.formValidation.get('realStartDate');
  // }

  // get realEndDate() {
  //   return this.formValidation.get('realEndDate');
  // }

  get totalCost() {
    return this.formValidation.get('totalCost');
  }

  get totalHour() {
    return this.formValidation.get('totalHour');
  }

  ngOnInit(): void {
    this.formValidation = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      parentId: ['', []],
      revenue: [0 , []],
      startDate: ['', []],
      endDate: ['', []],
      rangeDate: ['', []],
      // realStartDate: ['', []],
      // realEndDate: ['', []],
      totalCost: [0 , []],
      totalHour: [0, []],
      // isChecked: [this.checked, []],
    });

    this.getSubProject();

    if (this.mode != ModeModal.CREATE) {
      if (this.id) {
        this.getById(this.id);
      }
    }
  }

  addSubProject() {
    this.modal
      .create({
        nzContent: SubProjectComponent,
        nzTitle: 'Thêm mới dự án con',
        nzCentered: true,
        nzMaskClosable: false,
        nzDirection: 'ltr',
        nzClassName: 'modal-custom',
        nzWidth: '700px',
        nzClosable: true,
        nzComponentParams: {
          // formValidation: this.formValidation
          mode: ModeModal.CREATE,
          projectId: this.id,
          rangeDateValue: this.formValidation.get('rangeDate')!.value,
        },
      })
      .afterClose.subscribe({
        next: (res) => {
          console.log(res);
          this.getSubProject();
        },
        error: (err) => {
          console.log(err);
        },
      })
  }

  changeChecked() {
    this.checked = !this.checked;
  }

  getById(id: number) {
    this.projectData.getProjectById(id).subscribe({
      next: (res) => {
        console.log(res);
        this.formValidation.setValue({
          // id: res.data.id,
          name: res.data.name,
          parentId: res.data.parentId,
          revenue: res.data.revenue,
          startDate: res.data.startDate,
          endDate: res.data.endDate,
          rangeDate: [res.data.startDate, res.data.endDate],
          // realStartDate: res.data.realStartDate,
          // realEndDate: res.data.realEndDate,
          totalCost: res.data.totalCost,
          totalHour: res.data.totalHour,
          // isChecked: res.data.isChecked,
        });
      },
    });
  }

  getSubProject() {
    if (this.mode == ModeModal.UPDATE || this.mode == ModeModal.VIEW) {
      this.projectData.search(1, 999, `parentId.eq.${this.id},`).subscribe({
        next: (res) => {
          if (res) {
            console.log(res);
            this.subProjectList = res.pagingData.content;
          }
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
  }

  onView(item: projectContent): void {
    this.modal.create({
      nzTitle: 'Xem dự án con',
      nzClassName: 'modal-custom',
      nzContent: SubProjectComponent,
      nzWidth: '700px',
      nzCentered: true,
      nzMaskClosable: false,
      nzComponentParams: {
        title: 'Chi tiết dự án con',
        id: item.id,
        mode: ModeModal.VIEW,
      },
      nzDirection: 'ltr', // left to right
    });
  }

  getSubById(id: number) {
    this.projectData.getProjectById(id).subscribe({
      next: (res) => {
        if(res) {
          console.log(res);
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  onUpdate(item: projectContent) {
    this.modal
      .create({
        nzTitle: 'Chỉnh sửa dự án',
        nzClassName: 'modal-custom',
        nzContent: SubProjectComponent,
        nzWidth: '700px',
        nzCentered: true,
        nzMaskClosable: false,
        nzComponentParams: {
          mode: ModeModal.UPDATE,
          id: item.id,
          projectId: this.id,
          rangeDateValue: this.formValidation.get('rangeDate')!.value,
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
          this.getSubProject();
        },
        error: (res) => {
          console.log(res);
        },
      });
  }

  onDelete(id: number): void {
    this.modal
      .create({
        nzTitle: 'Xóa dự án con',
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
                    'Xóa dự án con',
                    this.modalOptions
                  );
                }
                this.getSubProject();
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

  handleOk(): void {
    // debugger;
    this.isConfirmLoading = true;
    const item: projectContent = this.formValidation.value;
    item.startDate = this.startDate;
    item.endDate = this.endDate;
    console.log(item.startDate);
    if (this.mode == ModeModal.CREATE) {
      this.projectData.addProject(item).subscribe({
        next: (res: projectContent) => {
          console.log(res);
          if (res) {
            this.isVisible = false;
            this.isConfirmLoading = false;
            this.modelRef.close(res);
          }
        },
        error: (err: any) => {
          console.log(err);
        },
        complete: () => {
          console.log('done');
        },
      });
    } else if (this.mode == ModeModal.UPDATE) {
      this.projectData.updateProject(this.id, item).subscribe({
        next: (res: projectContent) => {
          console.log(res);
          if (res) {
            this.isVisible = false;
            this.isConfirmLoading = false;
            this.modelRef.close(res);
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
  }

  handleCancel(): void {
    this.isVisible = false;
    this.modelRef.close();
  }
}
