import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-row-table',
  templateUrl: './row-table.component.html',
  styleUrls: ['./row-table.component.scss']
})
export class RowTableComponent implements OnInit {

  public isCollapsed: boolean = true;
  public Collapse: boolean = false;
  @Input() public item!: FormGroup;
  @Output() public collapseEvent = new EventEmitter();


  constructor() { }

  ngOnInit(): void {
  }


  onOpenChange($event: any) {

  }

  detectClickEvent() {

  }

  mouseOver(event: any) {
    // console.log(event);
    this.item.get('isShow')?.setValue(true);
    // this.isHover = true;
  }

  mouseLeave(event: any) {
    // console.log(event);
    this.item.get('isShow')?.setValue(false);
  }

  // collapseEvent(event: any) {
  //   console.log(event);
  //   this.isCollapsed = event.value;
  //   // clear array sau khi collapse
  //   // this.taskArray.clear();
  //   // await this.search();
  //   // await this.initForm();
  //   // console.log(this.formValidation);

  // }

  detailTask() {

  }

  addTask() {

  }

}
