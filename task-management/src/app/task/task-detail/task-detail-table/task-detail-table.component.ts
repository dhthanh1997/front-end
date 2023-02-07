import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { AfterViewInit, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import * as _ from 'lodash';
import { forEach } from 'lodash';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { catchError, concatMap, debounceTime, firstValueFrom, map, merge, of, pairwise, startWith, Subscription, switchMap, take, tap, throwError } from 'rxjs';
import { NotifyService } from 'src/app/_base/notify.service';
import { initDataObject, initFormArray, initFormObject, setDataInFormArray, updateControlInArray } from 'src/app/_base/util';
import { TaskData } from 'src/app/_core/api/task/taskData';
import { ResponseStatus } from 'src/app/_core/enum/responseStatus';
import { Task } from 'src/app/_core/model/task';
import { ResponseDataObject } from 'src/app/_core/other/responseDataObject';
import { ShareService } from 'src/app/_share/share.service';

@Component({
  selector: 'app-task-detail-table',
  templateUrl: './task-detail-table.component.html',
  // template: `

  // `,
  styleUrls: ['./task-detail-table.component.scss'],
})
export class TaskDetailTableComponent implements OnInit, AfterViewInit {

  private sub: Subscription = new Subscription()

  public isCompleted: boolean = false;

  private task: Task = new Task();

  @Input() public isDialog: boolean = false;

  public formValidation!: FormGroup;

  public idTask: number = 0;
  public indexSubTask: number = 0;

  public isShow: boolean = false;
  public isNotAddRow: boolean = false;
  public listOfData: Task[] = [];


  constructor(private fb: FormBuilder,
    private taskData: TaskData,
    private shareService: ShareService,
    private notifyService: NotifyService,
    private modelRef: NzModalRef<TaskDetailTableComponent>
  ) {
    this.formValidation = initFormArray("subTask");

  }

  ngAfterViewInit(): void {

  }

  get subTask() {
    return this.formValidation.get("subTask") as FormArray;
  }

  get lastItemArray() {
    const array = this.subTask;
    return array.controls[array.controls.length - 1] as FormGroup;
  }

  ngOnInit(): void {
    // debugger;
    this.getSubData();
    this.task.setStartDate(new Date());
    this.task.setEndDate(new Date());
    const formGroup = initFormObject(this.task, new Task());
    this.subTask.push(formGroup);
    console.log(this.formValidation);

  }

  getSubData() {
    this.taskData.getByParentId(this.idTask).subscribe(
      {
        next: (res) => {
          console.log(res);
          if (res?.message === ResponseStatus.success) {
            console.log("--- detail ok");
            this.formValidation = setDataInFormArray(res.data, 'subTask', this.formValidation, this.task);
          } else {
            this.notifyService.error("Có lỗi xảy ra");
          }
        },
        error: (err) => {
          console.log(err);
        }
      }
    )
  }


  // event
  autoFocus(item: any) {
    // const array = this.taskArray;
    const lastItem = this.lastItemArray;
    if (lastItem == item) {
      this.shareService.isAddRow.next(true);
    }
  }

  mouseOver(event: any, index: number) {
    // console.log(event);
    this.subTask.controls[index].get('isShow')?.setValue(true);
  }

  mouseLeave(event: any, index: number) {
    // console.log(event);
    this.subTask.controls[index].get('isShow')?.setValue(false);
  }

  onOpenChange($event: any) {

  }

  onDrop(event: CdkDragDrop<string[]>) {
    console.log(event);
    let data = this.subTask.controls;
    moveItemInArray(data, event.previousIndex, event.currentIndex);
  }


  addSubTask() {
    const array = this.subTask;
    if (array && array.controls.length > 0) {
      let lastItem = this.lastItemArray;
      console.log(lastItem);
      // ten cua task ma null thi khong duoc add tiep vao array
      if (lastItem.get('name')?.value) {
        // console.log(lastItem.get('name')?.value)
        const form: FormGroup = initDataObject(this.task, this.task);
        this.subTask.controls.push(form);
      } else {
        this.isNotAddRow = !this.isNotAddRow;
        this.autoFocus(lastItem);
      }
    }
    else {
      const form: FormGroup = initDataObject(this.task, this.task);
      this.subTask.push(form);
    }

  }

  saveListTask() {
    const item = this.formValidation.get('subTask')?.value;
    this.taskData.saveListTask(item).subscribe({
      next: (res) => {
        if (res.message === ResponseStatus.error) {
          this.notifyService.error(res.error);
        }
        if (res.message === ResponseStatus.success) {
          this.notifyService.success("Thành công");
          this.dismiss(res.data);
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  close() {
    this.modelRef.close();
  }

  dismiss(item: any) {
    this.modelRef.close(item);
  }

}
