import {
  ChangeDetectorRef,
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
  addSections: number | null = null;
  public params: ParamSearch = {
    sorts: [],
    filters: [],
    sortName: '',
    filterName: '',
  };
  public isAddSections: boolean = false;
  public section: Section = new Section()

  constructor(
    private fb: FormBuilder,
    private shareService: ShareService,
    private sectionData: SectionData,
    private element: ElementRef,
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
    console.log(this.formValidation);
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
    const item: sectionContent = {
      id: 0,
      name: ''
    };
    item.name = input.value;
    // debugger;
    if (item.name !== '') {
      this.sectionData.save(item).subscribe({
        next: (res: sectionContent) => {
          console.log(res);
          if (res) {
            input.value = '';
            this.addSections = null;
            this.sections.push(
              this.fb.group({
                id: new FormControl(item.id!, []),
                name: new FormControl(item.name, []),
              })
            );
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
