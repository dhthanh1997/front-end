/* eslint-disable no-debugger */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BoardViewService } from '../service/board-view.service';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { content } from '../service/task';
import { tagContent } from '../service/tag';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { TaskTagService } from '../../task-tag/service/task-tag.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CommentService } from 'src/app/_core/api/comment/comment.service';
import { commentContent } from 'src/app/_core/api/comment/comment';
import { ModeModal } from 'src/app/_core/enum/modeModal';

@Component({
  selector: 'internal-app-board-task-form',
  templateUrl: './board-task-form.component.html',
  styleUrls: ['./board-task-form.component.scss'],
})
export class BoardTaskFormComponent implements OnInit {
  @ViewChild('inputElement', { static: false }) inputElement?: ElementRef;
  public fileAction: string | null = null;
  formValidation!: FormGroup;
  isConfirmLoading = false;
  checked = false;

  @Input() mode!: string;

  @Input() title: string = '';

  @Input() id!: number;

  @Input() projectId!: number;

  isVisible = false;

  error = '';

  startValue: any;
  endValue: Date | null = null;

  buttonDisable = true;

  public listData: any;
  public listComment: any;
  public pageNumber = 1;
  public pageSize = 999;
  public txtTagSearch: string | undefined;
  public txtCommentSearch: string | undefined;

  inputVisible = false;
  inputValue = '';

  modalOptions: any = {
    nzDuration: 2000,
  };

  constructor(
    private fb: FormBuilder,
    private service: BoardViewService,
    private tagService: TaskTagService,
    private commentService: CommentService,
    private msg: NzMessageService,
    private notifyService: NzNotificationService,
    private element: ElementRef,
    private modelRef: NzModalRef<BoardTaskFormComponent>
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

  get realStartDate() {
    return this.formValidation.get('realStartDate');
  }

  get realEndDate() {
    return this.formValidation.get('realEndDate');
  }

  get totalCost() {
    return this.formValidation.get('totalCost');
  }

  get totalHour() {
    return this.formValidation.get('totalHour');
  }

  get description() {
    return this.formValidation.get('description');
  }

  get attachFile() {
    return this.formValidation.get('attachFile');
  }

  get comment() {
    return this.formValidation.get('comment')?.value;
  }

  ngOnInit(): void {
    this.formValidation = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      parentId: ['', []],
      revenue: ['', [Validators.pattern('^[0-9]*$')]],
      startDate: ['', []],
      endDate: ['', []],
      rangeDate: ['', []],
      // realStartDate: ['', []],
      // realEndDate: ['', []],
      totalCost: ['', []],
      totalHour: ['', []],
      description: ['', []],
      attachFile: ['', []],
      comment: ['', []],
    });

    this.getTag();
    this.getComment();

    console.log(this.projectId);

    if (this.mode != ModeModal.CREATE) {
      if (this.id) {
        this.getById(this.id);
      }
    }
  }

  handleChange(info: NzUploadChangeParam): void {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      this.msg.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      this.msg.error(`${info.file.name} file upload failed.`);
    }

    this.fileAction = info.file.name;
  }

  public searchComment() {
    console.log(this.id);
    this.txtCommentSearch = `taskId.eq.${this.id},`;
    return this.txtCommentSearch;
  }

  getById(id: number) {
    this.service.getTaskById(id).subscribe({
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
          description: res.data.description,
          attachFile: res.data.attachFile,
          // isChecked: res.data.isChecked,
        });
      },
    });
  }

  public getTag() {
    this.tagService
      .getTag(this.pageNumber, this.pageSize, this.txtTagSearch)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.listData = res.pagingData.content;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  public createTag() {
    const item: tagContent = {
      createdBy: '',
      createdDate: '',
      id: 0,
      lastModifiedBy: '',
      lastModifiedDate: '',
      name: '',
      slug: '',
      status: '',
    };
    const tagName = this.element.nativeElement.querySelector('#addTag').value;
    item.name = tagName;
    console.log(tagName);

    this.tagService.addTag(item).subscribe({
      next: (res: content) => {
        console.log(res);
        if (res) {
          this.inputVisible = false;
          this.inputValue = '';
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
    this.tagService.deleteTag(id).subscribe({
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

  public getComment() {
    this.searchComment();
    this.commentService
      .getComment(this.pageNumber, this.pageSize, this.txtCommentSearch)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.listComment = res.pagingData.content;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  public createComment() {
    const item: commentContent = {
      content: '',
      description: '',
      id: 0,
      name: '',
      taskId: 0,
    };
    item.description = this.comment;
    item.taskId = this.id;
    this.commentService.addComment(item).subscribe({
      next: (res: content) => {
        console.log(res);
        if (res) {
          this.getComment();
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

  sliceTagName(tag: string): string {
    const isLongTag = tag.length > 20;
    return isLongTag ? `${tag.slice(0, 20)}...` : tag;
  }

  showInput(): void {
    this.inputVisible = true;
    setTimeout(() => {
      this.inputElement?.nativeElement.focus();
    }, 10);
  }

  handleInputConfirm(): void {
    if (this.inputValue && this.listData.indexOf(this.inputValue) === -1) {
      this.listData = [...this.listData, this.inputValue];
    }
    this.inputValue = '';
    this.inputVisible = false;
  }

  handleOk(): void {
    this.isConfirmLoading = true;
    const item: content = this.formValidation.value;
    item.startDate = this.startDate;
    item.endDate = this.endDate;
    item.projectId = this.projectId;
    if (this.mode == ModeModal.CREATE) {
      this.service.addTask(item).subscribe({
        next: (res: content) => {
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
      this.service.updateTask(this.id, item).subscribe({
        next: (res: content) => {
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

  getStartDate() {
    this.startValue = this.formValidation.get('startDate')?.value;
    let a = this.startDate;
    console.log(this.startValue);
    console.log(a);
    return console.log(this.startValue);
  }

  getCommentInput() {
    debugger;
    let commentInput = this.element.nativeElement.querySelector('#comment');
    if (
      commentInput.value != null &&
      commentInput.value != undefined &&
      commentInput.value != ''
    ) {
      this.buttonDisable = false;
    } else this.buttonDisable = true;
    console.log(commentInput.value);
  }
}
