import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ChangeDetectorRef, Component, DoCheck, ElementRef, HostListener, OnChanges, OnDestroy, OnInit, Renderer2, SimpleChanges } from '@angular/core';
import { AbstractControl, ControlContainer, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { BehaviorSubject, debounce, debounceTime, firstValueFrom, map, merge, Subject, take, takeUntil } from 'rxjs';
import { NotifyService } from 'src/app/_base/notify.service';
import { initDataObject, initFormArray, initListDataObject, setDataInFormArray } from 'src/app/_base/util';
import { TaskData } from 'src/app/_core/api/task/taskData';
import { ResponseStatus } from 'src/app/_core/enum/responseStatus';
import { Task, taskList, todoTable } from 'src/app/_core/model/task';
import { ResponseDataObject } from 'src/app/_core/other/responseDataObject';
import { ShareService } from 'src/app/_share/share.service';

@Component({
  selector: 'app-task-table',
  templateUrl: './task-table.component.html',
  styleUrls: ['./task-table.component.scss']
})
export class TaskTableComponent implements OnInit, OnDestroy {

  public formValidation!: FormGroup;
  public isHover: boolean = false;
  public isOpen: boolean = true;
  public isNotAddRow: boolean = false;
  public isCollapsed: boolean = true;
  public Collapse: boolean = false;
  public listOfData: Task[] = [];
  public task = new Task();
  changesUnsubscribe = new Subject();

  constructor(private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private notifyService: NotifyService,
    private shareService: ShareService,
    private taskData: TaskData) {
    this.formValidation = initFormArray("taskArray");
    // this.search();
  }

  ngOnDestroy(): void {

  }




  ngOnChanges(changes: SimpleChanges): void {

  }

  async ngOnInit() {
    await this.search();
    await this.initForm();
    await this.isOutSide();
    // this.watchForChanges();
  }

  initForm() {
    this.formValidation = setDataInFormArray(this.listOfData, "taskArray", this.formValidation, this.task);
    console.log(this.formValidation);
  }


  get taskArray() {
    return this.formValidation.get("taskArray") as FormArray;
  }

  get lastItemArray() {
    const array = this.taskArray;
    return array.controls[array.controls.length - 1] as FormGroup;
  }


  onDrop(event: CdkDragDrop<string[]>) {
    console.log(event);
    let data = this.taskArray.controls;
    moveItemInArray(data, event.previousIndex, event.currentIndex);
  }

  onOpenChange($event: any) {

  }


  mouseOver(event: any, index: number) {
    // console.log(event);
    this.taskArray.controls[index].get('isShow')?.setValue(true);
    // this.isHover = true;
  }

  mouseLeave(event: any, index: number) {
    // console.log(event);
    this.taskArray.controls[index].get('isShow')?.setValue(false);
  }

  async collapseEvent(event: any) {
    console.log(event);
    this.isCollapsed = event.value;
    // clear array sau khi collapse
    this.taskArray.clear();
    await this.search();
    await this.initForm();
    console.log(this.formValidation);
    
  }

  autoFocus(item: any) {
    // const array = this.taskArray;
    const lastItem = this.lastItemArray;
    if (lastItem == item && this.isNotAddRow) {
      this.shareService.isAddRow.next(true);
    }
  }

  isOutSide() {
    this.shareService.isOutSide.pipe(take(1)).subscribe(
      {
        next: (res) => {
          console.log(res);
          if (res) {
            this.watchForChanges();
          }
        },
        error: (err) => {
          console.log(err);
        }
      }
    )
  }


  detailTask(item: any) {
    console.log(item);
    this.isCollapsed = !this.isCollapsed;
    this.shareService.taskData.next(item);
  }

  getTask(item: any) {
    console.log(item);
    this.shareService.taskData.next(item);
  }

  addTask() {
    // const array = this.taskArray;
    let lastItem = this.lastItemArray;
    console.log(lastItem);
    // ten cua task ma null thi khong duoc add tiep vao array
    if (lastItem.get('name')?.value) {
      const form: FormGroup = initDataObject(this.task, this.task);
      this.taskArray.controls.push(form);
      setTimeout(() => {
        this.shareService.isAddRow.next(true);
        lastItem = this.lastItemArray;
        lastItem.valueChanges.pipe(debounceTime(500), take(1)).subscribe(
          {
            next: (res) => {
              if (res) {
                console.log(res);
                let task: Task = lastItem.value;
                this.saveTask(task);
              }
            },
            error: (err) => {
              console.log(err);
            },
            complete: () => {

            }
          }
        );

      }, 100);
      // console.log("into")
      // debugger;
      // save task sau 0,5s neu khong typing tiep

    } else {
      this.isNotAddRow = !this.isNotAddRow;
      this.autoFocus(lastItem);
    }
  }


  saveTask(item: any) {
    this.taskData.save(item).subscribe({
      next: (res) => {
        if (res.message === ResponseStatus.error) {
          this.notifyService.error(res.error);
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  watchForChanges() {
    // clear 
    // check control changes trong array
    const array = this.taskArray.controls.map((control: AbstractControl, index: number) => {
      control.valueChanges.pipe(takeUntil(this.changesUnsubscribe), map(value => ({
        rowIndex: index,
        control: control,
        data: value
      })));
    });

    merge(array).subscribe(changes => {
      console.log(changes);
    })
    // array.valueChanges.subscribe(res => {

    // })
  }

  updateTask(item: Task) {
    this.taskData.update(item.id, item).subscribe({
      next: (res) => {
        if (res.message === ResponseStatus.error) {
          this.notifyService.error(res.error);
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  deleteTask(id: number) {
    this.taskData.deleteById(id).subscribe({
      next: (res) => {
        if (res.message === ResponseStatus.error) {
          this.notifyService.error(res.error);
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  async search() {
    // this.taskData.search(1, 10).subscribe({
    //   next: (res) => {
    //     console.log(res);
    //     this.listOfData = res.pagingData.content
    //   },
    //   error: (err) => {
    //     console.log(err);
    //   }
    // });
    let response: ResponseDataObject = await firstValueFrom(this.taskData.search(1, 10));
    if (response.message === ResponseStatus.success) {
      this.listOfData = response.pagingData.content;
    }
  }

}
