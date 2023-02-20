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
import { NzMenuItemDirective } from 'ng-zorro-antd/menu';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';



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
  public params: ParamSearch = {};

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
    this.params.filterName = EnumUtils.getKeyByValue(Filter, Filter.NOT_DONE);
    this.params.sortName = EnumUtils.getKeyByValue(Sort, Sort.name_asc);
    this.sortName = Sort.name_asc;
    this.filterName = Filter.NOT_DONE;
    this.params.sorts = EnumUtils.getEnumValues(Sort, EnumType.String);
    this.params.filters = EnumUtils.getEnumValues(Filter, EnumType.String);
    
  }


  addTask() {
    

  }


  selectedItemFilter(event: any) {
    console.log(event);
    this.params.filterName = EnumUtils.getKeyByValue(Filter, event);
    this.shareService.isFilterTask.next(this.params);
    this.filterName = event;
    
  }

  selectedItemSort(event: any) {
    console.log(event);
    this.params.sortName = EnumUtils.getKeyByValue(Sort, event);
    this.shareService.isSortTask.next(this.params);
    this.sortName = event;
  }


}
