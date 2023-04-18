import { Component, OnInit } from '@angular/core';
import { UserData } from '../_core/api/user/user-data';
import { JwtHelperService } from '@auth0/angular-jwt';
import { firstValueFrom } from 'rxjs';
import { ResponseStatusEnum } from '../_core/enum/response-status-enum';
import { PageMenuService } from './page-menu.service';
import { menuItem } from './page';

@Component({
  selector: 'app-pages',
  template: `
  <internal-app-layout>
  <internal-app-sidebar [menuInfo]="getMenuInfo"></internal-app-sidebar>
  <internal-app-header></internal-app-header>
  <router-outlet></router-outlet>
  <internal-app-footer></internal-app-footer>
  </internal-app-layout>
  `,
})
export class PagesComponent implements OnInit {

  private userInfo: any;
  private menuInfo: any;
  private username: any;
  private permissions: any;

  get getUserInfo() {
    return this.userInfo;
  }

  get getMenuInfo() {
    return this.menuInfo;
  }

  get getPermissions() {
    return this.permissions;
  }

  constructor(private userService: UserData,
    private pageService: PageMenuService) {
    let helper = new JwtHelperService();
    let token: any = localStorage.getItem('access_token');
    this.username = (helper.decodeToken(token)) ? helper.decodeToken(token).sub : '';
  }

  async ngOnInit() {
    let res = await firstValueFrom(this.userService.getUserInfo(this.username));
    if(res.message && res.message === ResponseStatusEnum.success) {
        this.userInfo = res.data;
        this.menuInfo = this.pageService.getMenu(res.data.menu, menuItem);
        this.username = res.data.username;
        this.permissions = res.data.permissions;
    }
    console.log(this.userInfo);
    console.log(this.menuInfo);

  }

}
