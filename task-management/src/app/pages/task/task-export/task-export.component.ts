import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

export interface Item {
  name: string;
  uId: string;
  children: Item[];
}

export const DEMO_DATA: Item[] = [
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
            name: 'Group 1 - 1 - 1',
            children: [
              {
                uId: '6',
                name: 'Group 1 - 1 - 1 - 1',
                children: []
              }
            ]
          }
        ]
      }
    ]
  },
  {
    uId: '3',
    name: 'Group 2',
    children: [
      {
        uId: '5',
        name: 'Group 2 - 1',
        children: []
      }
    ]
  },
  {
    uId: '4',
    name: 'Group 3',
    children: []
  }
];

@Component({
  selector: 'app-task-export',
  templateUrl: './task-export.component.html',
  styleUrls: ['./task-export.component.scss']
})
export class TaskExportComponent implements OnInit {

  public root: Item;
  public get connectedTo(): string[] {
    return this.getIdsRecursive(this.root).reverse();
  }

  public expandSet = new Set<string>();

  constructor() {
    this.root = { uId: '-1', name: 'root', children: DEMO_DATA } as Item;
  }

  ngOnInit(): void { }

  onDragDrop = (event: CdkDragDrop<any>) => {
    if (event.previousContainer === event.container) {
      console.log("move");
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      console.log("trans");
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  };

  private getIdsRecursive(item: Item): string[] {
    let ids = [item.uId];
    item.children.forEach(childItem => {
      ids = ids.concat(this.getIdsRecursive(childItem));
    });
    return ids;
  }

  onExpandChange(id: string, checked: boolean, index: number, item: any) {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }

}
