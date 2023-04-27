import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { forEach } from 'lodash';
import { BinarySearchService } from '../util';
import { StoreDataService } from '../store-data.service';

@Injectable()
export class PermissionGuardService implements CanActivateChild {

  private menuInfo: any[] = [];
  constructor(private storeDataService: StoreDataService, private binarySearchService: BinarySearchService) {
    this.getMenuInfo();
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    console.log(childRoute);
    let currentRouter = state.url
    if (this.menuInfo) {
      let item = this.binarySearchService.binaryCheckItemInTree(this.menuInfo, 'children', currentRouter);
      if (item) {
        console.log(item);
      }
    }
    return of(true);
  }

  getMenuInfo() {
    this.storeDataService.menuInfoData.subscribe({
      next: (res) => {
        if (res) {
          this.menuInfo = res;
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

 
}
