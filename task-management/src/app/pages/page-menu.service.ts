import { Injectable } from '@angular/core';
import { menuItem } from '../pages/page';

@Injectable()
export class PageMenuService {

  constructor() { }

  getMenu(items: any[], menu: any[]): any[] {
    menu = menu.filter(item => items.includes(item.code.toUpperCase()));
    menu.forEach((v, k) => {
      if (v.children && v.children.length > 0) {
        v.isOpen = false;
        this.getMenu(items, v.children);
      }
    });

    return menu;
  }



}
