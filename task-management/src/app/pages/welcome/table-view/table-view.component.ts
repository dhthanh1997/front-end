/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop';
import { en_US, NzI18nService } from 'ng-zorro-antd/i18n';

interface todoTable {
  id: number;
  name: string;
  date: Date;
  dateCreated: Date;
  status: string;
  expand: boolean;
}

interface todoTableChild {
  id: number;
  name: string;
  age: number;
}

@Component({
  selector: 'internal-app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss'],
})
export class TableViewComponent implements OnInit {
  // @Input() tabName!: string;

  editId: number | null = null;

  date = null;

  public listOfData: todoTable[] = [
    {
      id: 1,
      name: 'John Brown',
      date: new Date(),
      dateCreated: new Date(),
      status: 'To Do',
      expand: false,
    },
    {
      id: 2,
      name: 'John Wick',
      date: new Date(),
      dateCreated: new Date(),
      status: 'Doing',
      expand: false,
    },
    {
      id: 3,
      name: 'Testing',
      date: new Date(),
      dateCreated: new Date(),
      status: 'Done',
      expand: false,
    },
  ];

  public listOfChildrenData: todoTableChild[] = [
    {
      id: 1,
      name: 'Child',
      age: 23,
    },
    {
      id: 2,
      name: 'Good',
      age: 14,
    },
  ];

  constructor(private i18n: NzI18nService) {}

  ngOnInit(): void {
    this.changeLanguage();
  }

  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.listOfData, event.previousIndex, event.currentIndex);
  }

  startEdit(id: number): void {
    this.editId = id;
  }

  stopEdit(): void {
    this.editId = null;
  }

  onChange(result: Date): void {
    console.log('onChange: ', result);
  }

  changeLanguage(): void {
    this.i18n.setLocale(en_US);
  }
}
