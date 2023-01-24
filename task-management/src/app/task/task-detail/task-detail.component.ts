import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, Renderer2 } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Subscription } from 'rxjs';
import { ShareService } from 'src/app/_share/share.service';
import { TaskDetailFrmComponent } from './task-detail-frm/task-detail-frm.component';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit, OnDestroy {

  private sub: Subscription = new Subscription()

  public isCompleted: boolean = false;

  @Input() isCollapsed: boolean = true;
  @Output() collapEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  private item: any;

  constructor(private elementRef: ElementRef, private renderer2: Renderer2, private shareService: ShareService, private modal: NzModalService) { }

  ngOnDestroy(): void {

  }

  ngOnInit(): void {
    this.initData();
  }

  initData() {
    this.shareService.taskData.subscribe({
      next: (res) => {
        console.log(res);
        this.item = res;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }



  markCompleted() {
    this.isCompleted = !this.isCompleted;
  }

  uploadFile() {

  }

  addSubNode() {

  }

  fullScreen() {
    this.modal.create({
      nzContent: TaskDetailFrmComponent,
      nzCentered: true,
      nzMaskClosable: false,
      nzDirection: 'ltr',
      nzClassName: 'modal-custom',
      nzFooter: null,
      nzClosable: false
    }).afterClose.subscribe({
      next: res => {
        console.log(res);
      },
      error: err => {
        console.log(err);
      }
    })
  }

  close() {
    this.sub.unsubscribe();
    this.collapEvent.emit(true);
  }

}
