import { ChangeDetectorRef, Component, OnDestroy, OnInit, Renderer2, SimpleChanges } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { NotifyService } from 'src/app/_base/notify.service';
import { TaskData } from 'src/app/_core/api/task/task-data';
import { ShareService } from 'src/app/_share/share.service';
import * as _ from 'lodash';
import { Sort } from 'src/app/_core/enum/sort-enum';
import { Filter } from 'src/app/_core/enum/filter-enum';
import { EnumType, EnumUtils, initFormObject } from 'src/app/_base/util';
import { ParamSearch } from 'src/app/_core/model/params-search';



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
  public sorts: any[] = [];
  public filters: any[] = [];
  public sortName: string = '';
  public filterName: string = '';
  public params: ParamSearch = {
   
  }
  constructor(private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private notifyService: NotifyService,
    private shareService: ShareService,
    private taskData: TaskData) {
      this.formValidation = initFormObject(this.params, this.params);

  }

  ngOnDestroy(): void {

  }


  ngOnChanges(changes: SimpleChanges): void {

  }

  async ngOnInit() {
    this.buildParams();
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

  buildParams() {
    this.sorts = EnumUtils.getEnumKeys(Sort, EnumType.String);
    this.filters = EnumUtils.getEnumKeys(Filter, EnumType.String);
    console.log(this.sorts);
    console.log(this.filters);
  }


  addTask() {


  }

  filterTask() {
    
  }

  sortTask() {

  }


}
