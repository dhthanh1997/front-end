import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { StoreDataService } from '../store-data.service';
import { BinarySearchService } from '../util';

@Injectable()
export class HasPermissionService {
  
  constructor(
    public storeDataService: StoreDataService,
    private binarySearchService: BinarySearchService
  ) { 
    

  }


  hasPermission(permission: any): boolean {
    let result = permission.action + '_' + permission.menu
    this.binarySearchService.binarySearchTreePermission(this.storeDataService.permissionsData, 'children', result.toUpperCase());
    let item = this.binarySearchService.resultPermission;
    if (!item) {
        return false;
    };
    return true;
  }

  
}
