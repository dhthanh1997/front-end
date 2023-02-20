import { Component, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-task-upload-file',
  templateUrl: './task-upload-file.component.html',
  styleUrls: ['./task-upload-file.component.scss']
})
export class TaskUploadFileComponent implements OnInit {

  constructor(
    private modelRef: NzModalRef<TaskUploadFileComponent>
  ) { }

  ngOnInit(): void {
  }


  save() {
    
  }

  close() {
   
  }
  

}
