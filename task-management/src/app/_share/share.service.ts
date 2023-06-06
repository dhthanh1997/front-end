import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable()
export class ShareService {

  public taskDataShare: Subject<any> = new Subject<any>();
  public taskDetailShare: Subject<any> = new Subject<any>();
  public permissionsShare: Subject<any> = new Subject<any>();

  // events
  public isAddRow: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isOutSide: Subject<any> = new Subject<any>();
  public isInside: Subject<any> = new Subject<any>();
  public isLoading: Subject<boolean> = new Subject<boolean>(); // dung cho spinner
  public isAddSub: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isDialogSave: Subject<any> = new Subject<any>();
  public isAddSubTask: Subject<any> = new Subject<any>();
  public isCollapseDetailTask: Subject<any> = new Subject<any>();
  public isCloseDetailTask: Subject<boolean> = new Subject<boolean>();
  public isFilterTask: Subject<any> = new Subject<any>();
  public isSortTask: Subject<any> = new Subject<any>();
  public isLoadingModal: Subject<boolean> = new Subject<boolean>(); // dung cho spinner tại modal

  // end events

  //store data
  public menuInfoData: Subject<any> = new Subject();
  public permissions: Subject<any> = new Subject();
  //

  constructor() { }
}
