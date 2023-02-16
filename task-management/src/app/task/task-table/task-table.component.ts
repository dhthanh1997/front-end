import { ChangeDetectorRef, Component,  OnDestroy, OnInit, Renderer2, SimpleChanges } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { NotifyService } from 'src/app/_base/notify.service';
import { TaskData } from 'src/app/_core/api/task/task-data';
import { ShareService } from 'src/app/_share/share.service';
import * as _ from 'lodash';



@Component({
  selector: 'app-task-table',
  templateUrl: './task-table.component.html',
  styleUrls: ['./task-table.component.scss']
})
export class TaskTableComponent implements OnInit, OnDestroy {

  public formValidation!: FormGroup;
  public isNotAddRow: boolean = false;
  public isCollapsed: boolean = true;
  public Collapse: boolean = false;
  constructor(private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private notifyService: NotifyService,
    private shareService: ShareService,
    private taskData: TaskData) {
  

  }

  ngOnDestroy(): void {

  }


  ngOnChanges(changes: SimpleChanges): void {

  }

  async ngOnInit() {
  
  }

 

  collapseEventTaskRow(event: any) {
    // console.log(event);
    this.isCollapsed = !this.isCollapsed;
    console.log(this.isCollapsed);

  }

  collapseEvent(event: any) {
    console.log(event);
    this.isCollapsed = !this.isCollapsed;
  }

  

  addTask() {
   

  }

  filter() {

  }


}
