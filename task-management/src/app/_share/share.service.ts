import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable()
export class ShareService {

  public taskDataShare: Subject<any> = new Subject<any>();
  public taskDetailShare: Subject<any> = new Subject<any>();

  // events
  public isAddRow: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isChanged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isOutSide: Subject<any> = new Subject<any>();
  public isInside: Subject<any> = new Subject<any>();
  public isLoading: Subject<boolean> = new Subject<boolean>(); // dung cho spinner
  public isKeyUp: Subject<any> = new Subject<any>();
  public isAddSub: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isDialogSave: Subject<any> = new Subject<any>();
  public isAddSubTask: Subject<any> = new Subject<any>();
  public isCollapseDetailTask: Subject<any> = new Subject<any>();
  public isCloseDetailTask: Subject<boolean> = new Subject<boolean>();
  public isFilterTask: Subject<any> = new Subject<any>();
  public isSortTask: Subject<any> = new Subject<any>();
  // end events

  constructor() { }
}
