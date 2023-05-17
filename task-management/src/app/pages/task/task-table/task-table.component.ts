import {

  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { ShareService } from 'src/app/_share/share.service';
import * as _ from 'lodash';
import { Sort } from 'src/app/_core/enum/sort-enum';
import { Filter } from 'src/app/_core/enum/filter-enum';
import { EnumType, EnumUtils, initFormObject, setDataInFormArray } from 'src/app/_base/util';
import { ParamSearch } from 'src/app/_core/model/params-search';
import { SectionData } from 'src/app/_core/api/section/section-data';
import { Section, sectionContent } from 'src/app/_core/model/section';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ResponseStatusEnum } from 'src/app/_core/enum/response-status-enum';
import { NzModalService } from 'ng-zorro-antd/modal';
import { TaskExportComponent } from '../task-export/task-export.component';

export const DEMO_DATA: any[] = [
  {
    uId: '0',
    name: 'Group 1',
    children: [
      {
        uId: '1',
        name: 'Group 1 - 1',
        children: [
          {
            uId: '2',
            name: 'Group 1 - 1 -1',
            children: []
          }
        ]
      }
    ]
  },
  {
    uId: '3',
    name: 'Group 2',
    children: []
  },
  {
    uId: '4',
    name: 'Group 3',
    children: []
  }
];


@Component({
  selector: 'app-task-table',
  templateUrl: './task-table.component.html',
  styleUrls: ['./task-table.component.scss'],
})
export class TaskTableComponent implements OnInit, OnDestroy {
  public formValidation!: FormGroup;
  // public section!: FormGroup;
  public isNotAddRow: boolean = false;
  public isCollapsed: boolean = true;
  public Collapse: boolean = false;
  public sorts: any[] = [];
  public filters: any[] = [];
  public sortName: string = '';
  public filterName: string = '';
  public sectionList: any = [];
  public addSections: number | null = null;
  public params: ParamSearch = {
    sorts: [],
    filters: [],
    sortName: '',
    filterName: '',
  };
  public isAddSections: boolean = false;
  public editIdx: number | null = null;
  public section: Section = new Section()

  constructor(
    private fb: FormBuilder,
    private shareService: ShareService,
    private sectionData: SectionData,
    private element: ElementRef,
    private modalService: NzModalService,
  ) {
    // const formGroup = this.fb.array([
    //   this.fb.group({
    //     id: new FormControl(0, []),
    //     name: new FormControl('', []),
    //     note: new FormControl('', []),
    //   }),
    // ]);

    this.formValidation = initFormObject(this.params, this.params);
    this.formValidation.addControl('sections', this.fb.array([]));

    this.root = { uId: '-1', name: 'root', children: DEMO_DATA }

  }

  get sections() {
    return this.formValidation.get('sections') as FormArray;
  }

  ngOnDestroy(): void { }

  ngOnChanges(changes: SimpleChanges): void { }

  ngOnInit() {
    this.buildParams();
    this.getSection();
    // this.closeFromDetailTask();
    this.collapseListenEventFromRow();
    console.log(this.sections);
  }

  // test export data
  test(): void {
    this.modalService.create({
      nzTitle: 'Test Export',
      nzClassName: 'modal-custom',
      nzContent: TaskExportComponent,
      nzCentered: true,
      nzDirection: 'ltr',
      nzMaskClosable: false,
      nzClosable: true,
      nzWidth: '1400px'
    })
  }

  // event

  collapseEventTaskRow(event: any) {
    // console.log(event);
    this.isCollapsed = !this.isCollapsed;
    console.log(this.isCollapsed);
  }

  collapseEvent(event: any) {
    // console.log(event);
    this.isCollapsed = !this.isCollapsed;
    console.log(this.isCollapsed);
  }


  collapseListenEventFromRow() {
    this.shareService.isCollapseDetailTask.subscribe(res => {
      // console.log(res);
      // if (res) {
      this.isCollapsed = !this.isCollapsed;
      console.log(this.isCollapsed);
      // }
    })
  }


  closeFromDetailTask() {
    this.shareService.isCloseDetailTask.subscribe(res => {
      if (res) {
        console.log(res);
        this.isCollapsed = !this.isCollapsed;
      }
    });
  }

  onDragDropSection = (event: CdkDragDrop<string[]>) => {
    console.log(event);
    let data = this.sections.controls;
    moveItemInArray(data, event.previousIndex, event.currentIndex);
    // if (event.previousContainer === event.container) {
    // moveItemInArray(
    //   data,
    //   event.previousIndex,
    //   event.currentIndex
    // );
    // }
  };

  // test

  public root: any;

  get connectedTo(): string[] {
    return this.getIdsRecursive(this.root).reverse();
  }

  private getIdsRecursive(item: any): string[] {
    let ids = [item.uId];
    item.children.forEach((childItem: any) => {
      ids = ids.concat(this.getIdsRecursive(childItem));
    });
    return ids;
  }

  // end event


  buildParams() {
    this.params.filterName = EnumUtils.getKeyByValue(Filter, Filter.NOT_DONE);
    this.params.sortName = EnumUtils.getKeyByValue(Sort, Sort.name_asc);
    this.sortName = Sort.name_asc;
    this.filterName = Filter.NOT_DONE;
    this.params.sorts = EnumUtils.getEnumValues(Sort, EnumType.String);
    this.params.filters = EnumUtils.getEnumValues(Filter, EnumType.String);
  }

  getSection() {
    this.sectionData.search(1, 999).subscribe({
      next: (res) => {
        console.log(res);
        this.sectionList = res.pagingData.content;
        // console.log(this.listData);
        console.log(this.sectionList);
        this.formValidation = setDataInFormArray(this.sectionList, "sections", this.formValidation, this.section);

      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  addTask() {
    // this.sections.at(0).
    this.sections.at(0).get('isAddRowEvent')?.setValue(true);

    // set lại giá trị isAddRowEvent để onChange trong task-table-row hoạt động
    setTimeout(() => {
      this.sections.at(0).get('isAddRowEvent')?.setValue(false);
    }, 1000);
    // console.log(this.sections.at(0));
  }

  addSection() {
    this.addSections = 1;
    let inputAddSection = this.element.nativeElement.querySelector('#input-add-section');
    setTimeout(() => {
      inputAddSection.focus();
    }, 100)
  }

  createSection() {
    let input = this.element.nativeElement.querySelector('#input-add-section');
    if(input.value.length > 0) {
      const item: sectionContent = {
        id: 0,
        name: ''
      };
      item.name = input.value;
      // debugger;
      this.sectionData.save(item).subscribe({
        next: (res) => {
          console.log(res);
          if (res.message === ResponseStatusEnum.success) {
            input.value = '';
            this.addSections = null;
            let form = this.fb.group({
                createdBy: "UNKOWNS",
                createdDate:  new Date(),
                id: 0,
                isAddRowEvent: false,
                lastModifiedBy: "UNKOWNS",
                lastModifiedDate:  new Date(),
                name: "",
                note: "",
            });
            this.sections.push(form);
            let index = this.sections.controls.length - 1;
            this.sections.controls[index].patchValue(res.data);
            console.log(this.sections.controls[index]);
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
    else {
      this.addSections = null;
    }

  }

  isEdit(event: number) {
    // debugger;
    let index = this.sections.controls.findIndex(x => x.value.id === event);
    this.editIdx = index;
  }

  addToSectionArr(value: string, index: number) {
    this.sections.at(index).get('name')!.setValue(value);
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
