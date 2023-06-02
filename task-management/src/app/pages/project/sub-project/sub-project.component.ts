import { DatePipe } from '@angular/common';
import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { createMask } from '@ngneat/input-mask';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { ProjectData } from 'src/app/_core/api/project/project-data';
import { ModeModal } from 'src/app/_core/enum/modeModal';
import { projectContent } from 'src/app/_core/model/project';

export const start: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  if (control.parent) {
    const start = new Date(control.value).getTime();
    const end = new Date(control.parent.value['endDate']).getTime();
    console.log('validators called');
    console.log(start, end);

    if (start === null || end === null || start > end) {
      return { start: true };
    }
  }

  return null;
};

export const end: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  if (control.parent) {
    const start = new Date(control.value).getTime();
    const end = new Date(control.parent.value['startDate']).getTime();
    console.log('validators called');
    console.log(start, end);
    if (start === null || end === null || start < end) {
      return { end: true };
    }
  }

  return null;
};

@Component({
  selector: 'app-sub-project',
  templateUrl: './sub-project.component.html',
  styleUrls: ['./sub-project.component.scss'],
  providers: [DatePipe]
})
export class SubProjectComponent implements OnInit {
  formValidation!: FormGroup;
  isConfirmLoading = false;
  checked = false;
  format = 'yyyy-MM-dd';

  subProjectList: any[] = [];

  @Input() projectId!: number;
  @Input() startDateValue: string = '';
  @Input() endDateValue: string = '';
  @Input() title!: string;
  @Input() id!: number;
  @Input() mode!: string;

  isVisible = false;

  dateInputMask = createMask<Date>({
    alias: 'datetime',
    inputFormat: 'yyyy-mm-dd',
    parser: (value: string) => {
      const values = value.split('-');
      const year = +values[0];
      const month = +values[1] - 1;
      const date = +values[2];
      const res = new Date(year, month, date);
      console.log('mask parser', { textValue: value, parsedValue: res });
      return res;
    },
  });

  constructor(
    private element: ElementRef,
    private fb: FormBuilder,
    private service: ProjectData,
    private modal: NzModalService,
    public datePipe: DatePipe,
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
    return this.formValidation.get('startDate');
  }

  get startDatePicker() {
    return this.formValidation.get('startDatePicker');
  }

  get endDate() {
    return this.formValidation.get('endDate');
  }

  get endDatePicker() {
    return this.formValidation.get('endDatePicker');
  }

  startDateInputChange() {
    if (this.startDate?.value != 'Invalid Date') {
      this.startDatePicker?.setValue(
        this.datePipe.transform(new Date(this.startDate?.value), this.format)
      );
    }
  }

  startDateCalendarChange() {
    this.startDate?.setValue(this.datePipe.transform(new Date(this.startDatePicker?.value), this.format));
  }

  endDateInputChange() {
    if (this.endDate?.value != 'Invalid Date') {
      this.endDatePicker?.setValue(
        this.datePipe.transform(new Date(this.endDate?.value), this.format)
      );
    }
  }

  endDateCalendarChange() {
    this.endDate?.setValue(this.datePipe.transform(new Date(this.endDatePicker?.value), this.format));
  }

  ngOnInit(): void {
    console.log(this.formValidation);

    this.formValidation = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      parentId: ['', []],
      revenue: [0, []],
      startDate: ['', [Validators.required, start]],
      startDatePicker: ['', [Validators.required]],
      endDate: ['', [Validators.required, end]],
      endDatePicker: ['', [Validators.required]],
    });

    if (this.mode != ModeModal.CREATE) {
      if (this.id) {
        this.getById(this.id);
      }
    }
  }

  disabledStartDate = (current: Date) => {
    let prev = new Date(this.startDateValue);
    let next = new Date(this.endDateValue);
    prev.setDate(prev.getDate() - 1);
    if(this.endDatePicker?.value !== '') {
      return current <= prev || current >= next || current >= this.endDatePicker?.value;
    }
    else {
      return current <= prev || current >= next;
    }

  };

  disabledEndDate = (current: Date) => {
    let prev = new Date(this.startDateValue);
    let next = new Date(this.endDateValue);
    prev.setDate(prev.getDate() - 1);
    if(this.startDatePicker?.value !== '') {
      return current <= prev || current >= next || current <= this.startDatePicker?.value;
    }
    else {
      return current <= prev || current >= next;
    }
  };

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
          startDatePicker: res.data.startDate,
          endDatePicker: res.data.endDate,
        });
      },
    });
  }

  handleOk(): void {
    this.isConfirmLoading = true;
    const item: projectContent = this.formValidation.value;
    item.parentId = this.projectId;
    item.startDate = new Date(this.startDate?.value).toISOString();
    item.endDate = new Date(this.endDate?.value).toISOString();
    item.id = this.id;
    debugger;
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

  // disabledStartDate = (startValue: Date): boolean => {
  //   if (!startValue || !new Date(this.endDate?.value)) {
  //     return false;
  //   }
  //   return startValue.getTime() > new Date(this.endDate?.value).getTime();
  // };

  // disabledEndDate = (endValue: Date): boolean => {
  //   if (!endValue || !new Date(this.startDate?.value)) {
  //     return false;
  //   }
  //   return endValue.getTime() <= new Date(this.startDate?.value).getTime();
  // };
}
