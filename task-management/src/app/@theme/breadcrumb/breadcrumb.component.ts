import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'internal-app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnInit {
  @Input() breadcrumbs: any;

  constructor() {
    // do something
  }

  ngOnInit(): void {
    // do something
    this.breadcrumbs = [
      {
        label: 'Home',
        path: 'home',
      },
      {
        label: 'link 1',
        path: 'home',
      },
    ];
  }
}
