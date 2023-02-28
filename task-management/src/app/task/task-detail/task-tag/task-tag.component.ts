import { Component, Input, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-task-tag',
  templateUrl: './task-tag.component.html',
  styleUrls: ['./task-tag.component.scss']
})
export class TaskTagComponent implements OnInit {

  @Input() title: string = '';
  @Input() taskId: number = 0;

  color = "#0070f3";

  constructor(private modelRef: NzModalRef<TaskTagComponent>,) { }

  ngOnInit(): void {
  }

  close() {
    this.modelRef.close();
  }

}
