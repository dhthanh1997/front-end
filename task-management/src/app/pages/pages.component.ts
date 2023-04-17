import { Component, OnInit } from '@angular/core';
import { UserData } from '../_core/api/user/user-data';
import { JwtHelperService } from '@auth0/angular-jwt';
import { firstValueFrom } from 'rxjs';
import { ResponseStatusEnum } from '../_core/enum/response-status-enum';

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

  private userInfo: any;
  private menuInfo: any;
  private username: any;

  get getUserInfo() {
    return this.userInfo;
  }

  get getMenuInfo() {
    return this.menuInfo;
  }

  constructor(private userService: UserData) {
    let helper = new JwtHelperService();
    let token: any = localStorage.getItem('access_token');
    this.username = (helper.decodeToken(token)) ? helper.decodeToken(token) : '';
  }

  async ngOnInit() {
    let res = await firstValueFrom(this.userService.getUserInfo(this.username));
    if(res.message && res.message === ResponseStatusEnum.success) {
        this.userInfo = res.data.userInfo;
        this.menuInfo = res.data.menuInfo;
    }
  }

}
