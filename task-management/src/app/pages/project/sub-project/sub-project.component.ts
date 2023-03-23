import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { ProjectData } from 'src/app/_core/api/project/project-data';
import { projectContent } from 'src/app/_core/model/project';

@Component({
  selector: 'app-sub-project',
  templateUrl: './sub-project.component.html',
  styleUrls: ['./sub-project.component.scss']
})
export class SubProjectComponent implements OnInit {

  formValidation!: FormGroup;
  isConfirmLoading = false;
  checked = false;

  subProjectList: any[] = [];

  @Input() projectId!: number;

  isVisible = false;

  constructor(
    private element: ElementRef,
    private fb: FormBuilder,
    private service: ProjectData,
    private modal: NzModalService,
    private modelRef: NzModalRef<SubProjectComponent>
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

  ngOnInit(): void {
    console.log(this.formValidation);

    this.formValidation = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      parentId: ['', []],
      revenue: [0 , []],
      startDate: ['', []],
      endDate: ['', []],
      rangeDate: ['', []],
    });
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

  handleOk(): void {
    this.isConfirmLoading = true;
    const item: projectContent = this.formValidation.value;
    item.parentId = this.projectId;
    item.startDate = this.startDate;
    item.endDate = this.endDate;
    console.log(item);
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
  }

  handleCancel(): void {
    this.isVisible = false;
    this.modelRef.close();
  }

}
