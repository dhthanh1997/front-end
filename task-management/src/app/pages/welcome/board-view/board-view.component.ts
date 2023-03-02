/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-debugger */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { animate, style, transition, trigger } from '@angular/animations';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { AfterViewChecked, Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { sectionContent } from 'src/app/_core/model/section';
import { TaskData } from 'src/app/_core/api/task/task-data';
import { ModeModal } from 'src/app/_core/enum/modeModal';
import { Task } from 'src/app/_core/model/task';
import { BoardTaskFormComponent } from './board-task-form/board-task-form.component';
import { DeleteComponent } from './delete/delete.component';
import { SectionData } from 'src/app/_core/api/section/section-data';

@Component({
  selector: 'internal-app-board-view',
  templateUrl: './board-view.component.html',
  styleUrls: ['./board-view.component.scss'],
})
export class BoardViewComponent implements OnInit, AfterViewChecked {
  public pageNumber = 1;
  public pageSize = 999;
  public txtSearch: string | undefined;
  public totalElements = 0;
  public totalPages: number | undefined;

  // public tagList: any;
  public taskList: any;
  public sectionList: any;

  modalOptions: any = {
    nzDuration: 2000,
  };

  editIdx: number | null = null;
  public isEdit = false;

  public t: unknown;
  isVisible = false;
  addSection: number | null = null;

  constructor(
    private taskData: TaskData,
    private sectionData: SectionData,
    private modalService: NzModalService,
    private element: ElementRef,
    private notifyService: NzNotificationService,
    private route: ActivatedRoute
  ) {}

  ngAfterViewChecked(): void {
    // this.checkInput();
  }

  ngOnInit(): void {
    // this.getTag();
    this.getTask();
    this.getSection();
  }

  onKeydown(e: any) {
    e.preventDefault();
  }

  public getIdProject() {
    let id = this.route.snapshot.paramMap.get('id');
    this.txtSearch = `projectId.eq.${id},`;
    return this.txtSearch;
  }

  public getIdProjectTask() {
    let id = this.route.snapshot.paramMap.get('id');
    return parseInt(id!);
  }

  public getTask() {
    this.getIdProject();
    this.taskData
      .search(this.pageNumber, this.pageSize, this.txtSearch)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.taskList = res.pagingData.content;
          // console.log(this.listData);
          this.totalElements = res.pagingData.totalElements;
          this.totalPages = res.pagingData.totalPages;
          console.log(this.taskList);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  onView(item: Task): void {
    this.modalService.create({
      nzTitle: 'View Task',
      nzClassName: 'modal-custom',
      nzContent: BoardTaskFormComponent,
      nzWidth: 'modal-custom',
      nzCentered: true,
      nzMaskClosable: false,
      nzComponentParams: {
        mode: ModeModal.VIEW,
        title: 'Xem chi tiết yêu cầu',
        id: item.id,
      },
      nzDirection: 'ltr', // left to right
    });
  }

  onCreate(): void {
    this.modalService
      .create({
        nzTitle: 'New Task',
        nzClassName: 'modal-custom',
        nzContent: BoardTaskFormComponent,
        nzWidth: 'modal-custom',
        nzCentered: true,
        nzMaskClosable: false,
        nzComponentParams: {
          mode: ModeModal.CREATE,
          title: 'Thêm yêu cầu',
          projectId: this.getIdProjectTask(),
        },
        nzDirection: 'ltr', // left to right
      })
      .afterClose.subscribe({
        next: (res) => {
          console.log(res);
          if (res) {
            this.notifyService.success(
              'Thành công',
              'Thêm mới yêu cầu',
              this.modalOptions
            );
          }
          this.getTask();
        },
        error: (res) => {
          console.log(res);
        },
      });
  }

  onUpdate(item: Task): void {
    this.modalService
      .create({
        nzTitle: 'Update Task',
        nzClassName: 'modal-custom',
        nzContent: BoardTaskFormComponent,
        nzWidth: 'modal-custom',
        nzCentered: true,
        nzMaskClosable: false,
        nzComponentParams: {
          mode: ModeModal.UPDATE,
          id: item.id,
        },
        nzDirection: 'ltr', // left to right
      })
      .afterClose.subscribe({
        next: (res) => {
          console.log(res);
          if (res) {
            this.notifyService.success(
              'Thành công',
              'Chỉnh sửa yêu cầu',
              this.modalOptions
            );
          }
          this.getTask();
        },
        error: (res) => {
          console.log(res);
        },
      });
  }

  onDelete(id: number): void {
    this.modalService
      .create({
        nzTitle: 'Delete Project',
        nzClassName: 'modal-custom',
        nzContent: DeleteComponent,
        nzCentered: true,
        nzMaskClosable: false,
        nzDirection: 'ltr', // left to right
      })
      .afterClose.subscribe({
        next: (res) => {
          console.log(res);
          if (res) {
            this.taskData.deleteById(id).subscribe({
              next: (res) => {
                if (res) {
                  this.notifyService.success(
                    'Thành công',
                    'Xóa yêu cầu',
                    this.modalOptions
                  );
                }
                this.getTask();
              },
              error: (err) => {
                console.log(err);
              },
              complete: () => {},
            });
          }
        },
        error: (res) => {
          console.log(res);
        },
      });
  }

  public getSection() {
    this.sectionData.search(this.pageNumber, this.pageSize).subscribe({
      next: (res) => {
        console.log(res);
        this.sectionList = res.pagingData.content;
        // console.log(this.listData);
        this.totalElements = res.pagingData.totalElements;
        this.totalPages = res.pagingData.totalPages;
        console.log(this.taskList);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  startCreate() {
    // debugger;
    this.addSection = 1;
    let inputAddSection = this.element.nativeElement.querySelector('#input-add-section');
    setTimeout(async() => {
      await inputAddSection.focus();
    }, 10)
  }



  createSection() {
    // debugger;
    let input = this.element.nativeElement.querySelector('#input-add-section');
    const item: sectionContent = {
      name: ''
    };
    item.name = input.value;
    if(item.name !== '') {
      this.sectionData.save(item).subscribe({
        next: (res: sectionContent) => {
          console.log(res);
          if (res) {
            this.getSection();
            input.value = '';
            // this.modelRef.close(res);
          }
        },
        error: (err: any) => {
          console.log(err);
        },
        complete: () => {
          this.addSection = null;
          console.log('done');
        },
      });
    }
  }

  startEdit(index: number): void {
    // debugger;
    this.editIdx = index;
    let editElement = this.element.nativeElement.querySelectorAll('.sectionName');
    setTimeout(async () => {
      await editElement[index].focus();
    }, 50)
  }

  editSection(id: number, index: number) {
    // debugger;
    let input = this.element.nativeElement.querySelectorAll('.sectionName');
    if(input[index].value.length > 0) {
      const item: sectionContent = { name: '' };
      item.name = input[index].value;
      item.id = id;
      this.sectionData.update(id, item).subscribe({
        next: (res: sectionContent) => {
          console.log(res);
          if (res) {
            this.getSection();
            // this.modelRef.close(res);
          }
        },
        error: (err: any) => {
          console.log(err);
        },
        complete: () => {
          this.editIdx = null;
          console.log('done');
        },
      });
    }
  }

  deleteSection(id: number) {
    this.modalService
      .create({
        nzTitle: 'Delete Section',
        nzClassName: 'modal-custom',
        nzContent: DeleteComponent,
        nzCentered: true,
        nzMaskClosable: false,
        nzDirection: 'ltr', // left to right
      })
      .afterClose.subscribe({
        next: (res) => {
          console.log(res);
          if (res) {
            this.sectionData.deleteById(id).subscribe({
              next: (res) => {
                if (res) {
                  this.notifyService.success(
                    'Thành công',
                    'Xóa yêu cầu',
                    this.modalOptions
                  );
                }
                this.getSection();
              },
              error: (err) => {
                console.log(err);
              },
              complete: () => {},
            });
          }
        },
        error: (res) => {
          console.log(res);
        },
      });
  }

  drop(event: CdkDragDrop<sectionContent[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      console.log(event.item);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      console.log(event.container.data[event.currentIndex]);
    }
  }

  dropGroup(event: CdkDragDrop<Task[]>) {
    moveItemInArray(this.taskList, event.previousIndex, event.currentIndex);
  }

  canDrop() {
    if(this.editIdx === null) return this.isEdit;
    else return !this.isEdit;
  }
}
