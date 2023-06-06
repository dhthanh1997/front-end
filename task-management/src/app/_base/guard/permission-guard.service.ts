import { Injectable, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { forEach } from 'lodash';
import { BinarySearchService } from '../util';
import { StoreDataService } from '../store-data.service';
import { ShareService } from 'src/app/_share/share.service';
import { take, firstValueFrom } from 'rxjs';

@Injectable()
export class PermissionGuardService implements CanActivateChild {

  private defaultRouter = "home";

  private menuInfo: any[] = [];
  constructor(
    private storeDataService: StoreDataService, 
    private binarySearchService: BinarySearchService) {
    // this.getMenuInfo();
   
  }

  // ngOnInit(): void {
  //   console.log("onInit");
  //   this.menuInfo = this.storeDataService.menuInfo;
  // }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    console.log(childRoute);
    let currentRouter = state.url
    if (this.storeDataService.menuInfo) {
      if (currentRouter.includes(this.defaultRouter)) {
        return of(true);
      }
      else {
        this.binarySearchService.binaryCheckItemInTree(this.storeDataService.menuInfo, 'children', currentRouter);
        let item = this.binarySearchService.result;
        if (item) {
          console.log(item);
          return of(true);
        }
      }
    }
    return of(false);
  }

 getMenuInfo() {
  
    // const result = await firstValueFrom(this.storeDataService.menuInfoData);
    // if(result) {
    //   this.menuInfo = result;
    // }
    // this.storeDataService.menuInfoData.subscribe({
    //   next: (res) => {
    //     console.log(res);
    //     if (res) {
    //       this.menuInfo = res;
    //     }
    //   },
    //   error: (err) => {
    //     console.log(err);
    //   }
    // })
  }


}
