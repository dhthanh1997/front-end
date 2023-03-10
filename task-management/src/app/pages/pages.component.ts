import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages',
  template: `
  <internal-app-layout>
  <internal-app-sidebar></internal-app-sidebar>
  <internal-app-header></internal-app-header>
  <router-outlet></router-outlet>
  <internal-app-footer></internal-app-footer>
  </internal-app-layout>
  `,
})
export class PagesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
