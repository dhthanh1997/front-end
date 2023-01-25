import { Component, Input, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-task-detail-frm',
  templateUrl: './task-detail-frm.component.html',
  styleUrls: ['./task-detail-frm.component.scss']
})
export class TaskDetailFrmComponent implements OnInit {

  @Input() isCompleted: boolean = false;
  
  constructor(private modelRef: NzModalRef<TaskDetailFrmComponent> ) { }

  ngOnInit(): void {
  }

  onOpenChange(event: any) {

  }


  markCompleted() {
    this.isCompleted = !this.isCompleted;
  }

  uploadFile() {

  }

  addSubNode() {

  }

  save() {

  }

  close() {
      this.modelRef.close();
  }

}
