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

  constructor(
    private element: ElementRef,
    private fb: FormBuilder,
    private service: ProjectData,
    private modal: NzModalService,
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
    console.log(this.formValidation);

    this.formValidation = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      parentId: [0, []],
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
        nzClosable: true,
        nzComponentParams: {
          // formValidation: this.formValidation
          projectId: this.id,
          // isDialog: true,
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
    this.service.getProjectById(id).subscribe({
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
    this.service.search(1, 999, `parentId.eq.${this.id},`).subscribe({
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

  handleOk(): void {
    this.isConfirmLoading = true;
    const item: projectContent = this.formValidation.value;
    item.startDate = this.startDate;
    item.endDate = this.endDate;
    console.log(item);
    if (this.mode == ModeModal.CREATE) {
      this.service.addProject(item).subscribe({
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
      this.service.updateProject(this.id, item).subscribe({
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
