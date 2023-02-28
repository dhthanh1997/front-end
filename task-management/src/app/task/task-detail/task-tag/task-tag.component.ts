import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { TagData } from 'src/app/_core/api/tag/tag-data';
import { tagContent } from 'src/app/_core/model/tag';

@Component({
  selector: 'app-task-tag',
  templateUrl: './task-tag.component.html',
  styleUrls: ['./task-tag.component.scss'],
})
export class TaskTagComponent implements OnInit {
  form!: FormGroup;

  @Input() title: string = '';
  @Input() taskId: number = 0;

  isAdd: number | null = 1;

  color: string = '#0070f3';

  public listTag: any;

  gridStyle = {
    width: '25%',
    textAlign: 'center',
  };

  constructor(
    private modelRef: NzModalRef<TaskTagComponent>,
    private element: ElementRef,
    private tagData: TagData,
    private nzMessageService: NzMessageService,
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
      const item: tagContent = {
        id: 0,
        color: '',
        name: '',
      };
      item.name = input.value;
      item.color = this.color;
      // debugger;
      this.tagData.save(item).subscribe({
        next: (res: tagContent) => {
          console.log(res);
          if (res) {
            input.value = '';
            this.isAdd = 1;
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
  }

  deleteTag(id: number) {
    this.tagData.deleteById(id).subscribe({
      next: (res) => {
        this.getTag();
        // console.log(this.listData);
        console.log(this.listTag);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  close() {
    this.modelRef.close();
  }
}
