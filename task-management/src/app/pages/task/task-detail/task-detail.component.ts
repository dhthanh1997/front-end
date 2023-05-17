import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
} from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import {
  catchError,
  concatMap,
  debounceTime,
  firstValueFrom,
  from,
  map,
  of,
  pairwise,
  startWith,
  Subscription,
  take,
  throwError,
} from 'rxjs';
import { NotifyService } from 'src/app/_base/notify.service';
import {
  initDataObject,
  initFormArray,
  initFormObject,
  setDataInFormArray,
  updateControlInArray,
} from 'src/app/_base/util';
import { TaskData } from 'src/app/_core/api/task/task-data';
import { ResponseStatusEnum } from 'src/app/_core/enum/response-status-enum';
import { Task } from 'src/app/_core/model/task';
import { ShareService } from 'src/app/_share/share.service';
import { TaskDetailFrmComponent } from './task-detail-frm/task-detail-frm.component';
import * as _ from 'lodash';
import { ResponseDataObject } from 'src/app/_core/other/responseDataObject';
import { TaskDetailTableComponent } from './common/task-detail-table/task-detail-table.component';
import { InputFileComponent } from 'src/app/_component/input-file/input-file.component';
import { TaskUploadFileComponent } from './task-upload-file/task-upload-file.component';
import { TaskTagComponent } from './task-tag/task-tag.component';
import { TagData } from 'src/app/_core/api/tag/tag-data';
import { ProjectData } from 'src/app/_core/api/project/project-data';
import { UploadFileData } from 'src/app/_core/api/upload-file/upload-file-data';
import { MemberData } from 'src/app/_core/api/member/member-data';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss'],
})
export class TaskDetailComponent implements OnInit, OnDestroy {
  private sub: Subscription = new Subscription();

  public isCompleted: boolean = false;

  // public subTask: Task[] = [];

  private task: Task = new Task();

  formValidation!: FormGroup;

  public tagId: number = 0;
  public tagList: any = {
    name: '',
  };
  public listProject: any[] = [];
  public listMember: any[] = [];

  public idTask: number = 0;
  public indexTask: number = 0;

  public isShow: boolean = false;
  public isNotAddRow: boolean = false;

  public isCollapsedTaskDetail: boolean = true;
  public files: any[] = [];

  @Input() isCollapsed: boolean = true;
  @Output() collapEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() watchChange: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private fb: FormBuilder,
    private taskData: TaskData,
    private memberData: MemberData,
    private tagData: TagData,
    private shareService: ShareService,
    private notifyService: NotifyService,
    private projectData: ProjectData,
    private modal: NzModalService,
    private uploadService: UploadFileData
  ) {
    this.formValidation = initFormObject(this.task, this.task);
    this.formValidation.addControl('subTask', this.fb.array([]));
    // this.formValidation.addControl('listProject', this.fb.array([]));
  }

  ngOnDestroy(): void { }

  ngOnInit() {
    console.log(this.isCollapsed);
    // this.initData();
    this.getData();
    this.getSubData();
    // không cần watch change, angular tự check change và update theo hàm watchForChange ở parent component
    this.getMemberData();
    this.getProjectData();
    // setTimeout(() => {
    //   this.watchForChange();
    // }, 1000);
  }

  getFileNameInTask(id: number) {
    this.uploadService.getFileInTask(id).subscribe({
      next: (res) => {
        // console.log(res);
        if (res.message === ResponseStatusEnum.success) {
          this.files = res.data;
        }
      },
    });
  }

  getProjectData() {
    this.projectData.search(1, 999).subscribe({
      next: (res) => {
        // console.log(res);
        if (res?.message === ResponseStatusEnum.success) {
          // this.formValidation.controls['listProject'].patchValue(res.data)
          this.listProject = res.pagingData.content;
          console.log('project');
          console.log(this.listProject);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getMemberData() {
    // debugger;
    this.memberData.search(1, 999).subscribe({
      next: (res) => {
        // debugger;
        console.log(res);
        if (res?.message === ResponseStatusEnum.success) {
          this.listMember = res.pagingData.content;
          // console.log(this.listMember);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getSubDataWithId() {
    this.taskData.getByParentId(this.idTask).subscribe({
      next: (res) => {
        if (res?.message === ResponseStatusEnum.success) {
          console.log('--- detail ok');
          this.subTask.clear();
          this.formValidation = setDataInFormArray(
            res.data,
            'subTask',
            this.formValidation,
            this.task
          );
        } else {
          this.notifyService.error('Có lỗi xảy ra');
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getSubData() {
    const shareData$ = this.shareService.taskDataShare;
    const source$ = shareData$.asObservable().pipe(
      concatMap((res) => {
        console.log(res);
        if (res) {
          this.idTask = res.item.controls.id.value;
          this.indexTask = res.index;
          return this.taskData.getByParentId(this.idTask);
        }
        return of(null);
      }),
      catchError((err) => throwError(() => new Error(err)))
    );

    // subscribe
    source$.subscribe({
      next: (res) => {
        // console.log(res);
        if (res?.message === ResponseStatusEnum.success) {
          console.log('--- detail ok');
          this.subTask.clear();
          this.formValidation = setDataInFormArray(
            res.data,
            'subTask',
            this.formValidation,
            this.task
          );
        } else {
          this.notifyService.error('Có lỗi xảy ra');
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getData() {
    const shareData$ = this.shareService.taskDataShare;
    const source$ = shareData$.asObservable().pipe(
      concatMap((res) => {
        console.log(res);
        if (res) {
          this.idTask = res.item.controls.id.value;
          this.indexTask = res.index;
          // this.getTagById(res.item.controls.tagId.value);
          // this.tagId = res.item.controls.tagId.value;
          this.getTaskById(this.idTask);
          this.getFileNameInTask(this.idTask);
          return this.taskData.getById(this.idTask);
        }
        return of(null);
      }),
      catchError((err) => throwError(() => new Error(err)))
    );

    // subscribe
    source$.subscribe({
      next: (res) => {
        // console.log(res);
        if (res?.message === ResponseStatusEnum.success) {
          console.log('--- detail ok');
          this.formValidation.patchValue(res.data);
        } else {
          this.notifyService.error('Có lỗi xảy ra');
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  get subTask() {
    return this.formValidation.get('subTask') as FormArray;
  }

  // get lastItemArray() {
  //   const array = this.subTask;
  //   return array.controls[array.controls.length - 1] as FormGroup;
  // }

  watchForChange() {
    if (this.formValidation) {
      this.formValidation.valueChanges
        .pipe(
          startWith(undefined),
          pairwise(),
          debounceTime(2000),
          map(([prev, current]: [any, any]) => {
            // console.log(prev);
            // console.log(current);
            let prevValue = _.omit(prev, [
              'isUpdate',
              'isShow',
              'isInside',
              'expand',
              'createdBy',
              'createdDate',
              'lastModifiedBy',
              'lastModifiedDate',
              'subTask',
            ]);
            let currentValue = _.omit(current, [
              'isUpdate',
              'isShow',
              'isInside',
              'expand',
              'createdBy',
              'createdDate',
              'lastModifiedBy',
              'lastModifiedDate',
              'subTask',
            ]);
            // console.log(prevValue);
            // console.log(currentValue);
            if (prevValue) {
              if (!_.isEqual(prevValue, currentValue)) {
                console.log('different in');
                return {
                  item: _.omit(current, ['subTask']),
                  // item: current,
                  isUpdate: true,
                  index: this.indexTask,
                };
              }
            }
            return {
              item: _.omit(current, ['subTask']),
              // item: current,
              isUpdate: false,
              index: this.indexTask,
            };
          })
        )
        .subscribe((res) => {
          console.log(res);
          if (res.isUpdate) {
            this.shareService.taskDetailShare.next(res);
          }
        });
    }
  }

  // event
  collapseListenEvent() {
    this.shareService.isCollapseDetailTask.subscribe((res) => {
      console.log(res);
      // if (res) {
      // this.isCollapsed = res;
      console.log(this.isCollapsed);
      // }
    });
  }

  mouseOver(event: any) {
    this.isShow = true;
  }

  mouseLeave(event: any) {
    this.isShow = false;
  }

  onOpenChange(event: any) { }

  // end event

  markCompleted() {
    this.isCompleted = !this.isCompleted;
    const formGroup = this.formValidation.get('state') as FormControl;
    let value = 0;
    // 0: Chưa hoàn thành
    // 1: Hoàn thành
    if (formGroup.value === 0) {
      value = 1;
    }
    if (formGroup.value === 1) {
      value = 0;
    }
    formGroup.setValue(value);
    this.watchForChange();
    this.formValidation.updateValueAndValidity();
    console.log(this.formValidation);
  }

  uploadFile() {
    this.modal
      .create({
        nzContent: TaskUploadFileComponent,
        // nzTitle: "Upload file",
        nzCentered: true,
        nzMaskClosable: false,
        nzDirection: 'ltr',
        nzClassName: 'modal-custom',
        nzClosable: false,
        nzFooter: null,
        nzComponentParams: {
          title: 'Upload file',
          taskId: this.formValidation.get('id')?.value,
        },
      })
      .afterClose.subscribe({
        next: (res) => {
          console.log(res);
          this.getFileNameInTask(this.idTask);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  addSubTask() {
    // this.shareService.isAddSub.next(true);
    this.modal
      .create({
        nzContent: TaskDetailTableComponent,
        nzTitle: 'Thêm mới công việc',
        nzCentered: true,
        nzMaskClosable: false,
        nzDirection: 'ltr',
        nzClassName: 'modal-custom',
        nzClosable: true,
        nzComponentParams: {
          // formValidation: this.formValidation
          idTask: this.formValidation.get('id')?.value
            ? this.formValidation.get('id')?.value
            : 0,
          idProject: this.formValidation.get('projectId')?.value
            ? this.formValidation.get('projectId')?.value
            : 0,
          isDialog: true,
        },
      })
      .afterClose.subscribe({
        next: (res) => {
          console.log(res);
          this.getSubDataWithId();
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  fullScreen() {
    this.modal
      .create({
        // nzTitle: 'AAAA',
        nzContent: TaskDetailFrmComponent,
        nzCentered: true,
        nzMaskClosable: false,
        nzDirection: 'ltr',
        nzClassName: 'modal-custom',
        // nzFooter: null,
        nzClosable: false,
        nzComponentParams: {
          // formValidation: this.formValidation
          idTask: this.formValidation.get('id')?.value
            ? this.formValidation.get('id')?.value
            : 0,
        },
      })
      .afterClose.subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  async updateTask(item: Task) {
    let response: ResponseDataObject = await firstValueFrom(
      this.taskData.update(item.id, item)
    );
    return response;
  }

  deleteTask() {
    let id = this.formValidation.get('id')?.value;
    this.taskData.deleteById(id).subscribe({
      next: (res) => {
        console.log(res);
        if (res.message === ResponseStatusEnum.error) {
          this.notifyService.error(res.error);
        }
        if (res.message === ResponseStatusEnum.success) {
          this.close();
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  addTag() {
    this.modal
      .create({
        nzContent: TaskTagComponent,
        nzTitle: 'Quản lý tag công việc',
        nzCentered: true,
        nzMaskClosable: false,
        nzDirection: 'ltr',
        nzClassName: 'modal-custom',
        nzWidth: '600px',
        nzClosable: false,
        nzFooter: null,
        nzComponentParams: {
          title: 'Quản lý tag công việc',
          taskId: this.formValidation.get('id')?.value,
        },
      })
      .afterClose.subscribe({
        next: async (res) => {
          // debugger;
          if (res !== undefined && res !== null) this.tagId = res;
          // else this.tagId = 0;
          this.getTagById(this.tagId);
          this.updateTasks(this.idTask);
          this.getData();
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  updateTasks(id: number) {
    // debugger;
    const item: Task = this.formValidation.value;
    item.tagId = this.tagId;
    this.taskData.update(id, item).subscribe({
      next: (res) => {
        this.getData();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  saveTask(item: any) {
    this.taskData.save(item).subscribe({
      next: (res) => {
        if(res.message === ResponseStatusEnum.success) {
          this.notifyService.success("Cập nhật thành công");
          let result = {
            item: _.omit(res.data, ['subTask']),
            isUpdate: true,
            index: this.indexTask,
          }
          this.shareService.taskDetailShare.next(result);
          this.formValidation.updateValueAndValidity(res.data);
        }
        if (res.message === ResponseStatusEnum.error) {
          this.notifyService.error(res.error);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  saveForm() {
    let item = this.formValidation.value;
    this.saveTask(item);
    
  }

  getTaskById(id: number) {
    this.taskData.getById(id).subscribe({
      next: (res) => {
        this.getTagById(res.data.tagId);
        this.tagId = res.data.tagId;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getTagById(id: number) {
    // debugger;
    if (id !== 0 && id !== null && id !== undefined) {
      this.tagData.getById(id).subscribe({
        next: (res) => {
          console.log(res);
          this.tagList = res.data;
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  close() {
    this.sub.unsubscribe();
    this.collapEvent.emit({
      isChange: true,
      value: true,
    });
    // this.isCollapsed = !this.isCollapsed;
    this.shareService.isCloseDetailTask.next(true);
  }

  // hexToRGB(hex: string) {
  //   // debugger;
  //   let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  //   return result ? {
  //     r: parseInt(result[1], 16),
  //     g: parseInt(result[2], 16),
  //     b: parseInt(result[3], 16)
  //   } : {
  //     r: 0,
  //     g: 0,
  //     b: 0
  //   };
  // }
}
