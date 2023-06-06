import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export class StoreDataService {

  public menuInfoData: Subject<any> = new Subject();
  public permissions: Subject<any> = new Subject();
  public permissionsData: any = {};
  public menuInfo: any = {};

  constructor() { }
}
