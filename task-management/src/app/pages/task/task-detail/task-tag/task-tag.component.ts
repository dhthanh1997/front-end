import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { TagData } from 'src/app/_core/api/tag/tag-data';
import { TaskData } from 'src/app/_core/api/task/task-data';
import { tagContent } from 'src/app/_core/model/tag';
import { Task } from 'src/app/_core/model/task';

@Component({
  selector: 'app-task-tag',
  templateUrl: './task-tag.component.html',
  styleUrls: ['./task-tag.component.scss'],
})
export class TaskTagComponent implements OnInit {
  form!: FormGroup;

  colorCustom: any = [
    '#ab47bc',
    '#3f51b5',
    '#4fc3f7',
    '#66bb6a',
    '#ffeb3b',
    '#ffa726',
    '#ff5722',
    '#795548',
    '#37474f',
  ];

  @Input() title: string = '';
  @Input() taskId: number = 0;
  @Output() id: EventEmitter<number> = new EventEmitter<number>();

  isAdd: number | null = 1;

  color: string = '#0070f3';

  public listTag: any;

  gridStyle = {
    width: '25%',
    textAlign: 'center',
  };

  taskList: any[] = [];
  deleteTags = false;

  constructor(
    private modelRef: NzModalRef<TaskTagComponent>,
    private element: ElementRef,
    private tagData: TagData,
    private taskData: TaskData,
    private nzMessageService: NzMessageService
  ) {}

  ngOnInit(): void {
    this.getTag();
  }

  getTag() {
    this.tagData.search(1, 999).subscribe({
      next: (res) => {
        console.log(res);
        this.listTag = res.pagingData.content;
        // console.log(this.listData);
        console.log(this.listTag);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  startAddTag() {
    this.isAdd = null;
  }

  createTag() {
    // debugger;
    let input = this.element.nativeElement.querySelector('#input-add-tag');
    if (input.value.length > 0) {
      const item: any = {};
      item.name = input.value;
      item.color = this.color;
      this.tagData.save(item).subscribe({
        next: (res: tagContent) => {
          console.log(res);
          if (res) {
            input.value = '';
            this.isAdd = 1;
            this.getTag();
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

  deleteTag(id: number) {
    this.tagData.deleteById(id).subscribe({
      next: (res) => {
        // debugger;
        this.getTask(id);
        this.getTag();
        console.log(this.listTag);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getTask(id: number) {
    this.taskData.search(1,999,`tagId.eq.${id},`).subscribe({
      next: async (res) => {
        console.log(res);
        this.taskList = res.pagingData.content;
        console.log(this.taskList);
        this.editTaskWhenTagDeleted();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  editTaskWhenTagDeleted() {
    for(let i = 0; i < this.taskList.length; i++) {
      this.taskList[i].tagId = 0;
    }
    this.taskData.updateListTask(this.taskList).subscribe({
      next: (res) => {
        this.deleteTags = true;
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  chooseTag(id: number) {
    // this.id.emit(id);
    console.log(this.id);
    this.modelRef.close(id);
  }

  close() {
    if(this.deleteTags) {
      return this.modelRef.close(0);
    }
    else return this.modelRef.close();
  }
}
