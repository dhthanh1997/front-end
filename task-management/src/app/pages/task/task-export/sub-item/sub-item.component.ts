import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Item } from '../task-export.component';

@Component({
  selector: 'app-sub-item',
  templateUrl: './sub-item.component.html',
  styleUrls: ['./sub-item.component.scss']
})
export class SubItemComponent {

  @Input() item!: Item;
  @Input() connectedTo!: string[];
  @Input() idx!: number;
  @Output() itemDrop: EventEmitter<CdkDragDrop<Item>>;

  public expandSet = new Set<string>();

  constructor() {
    this.itemDrop = new EventEmitter();
  }

  public onDragDrop(event: CdkDragDrop<any>): void {
    this.itemDrop.emit(event);
  }

  onExpandChange(id: string, checked: boolean, index: number, item: any) {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }

}
