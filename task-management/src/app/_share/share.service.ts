import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export class ShareService {

  taskData: Subject<any> = new Subject<any>();

  // events
  public isAddRow: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isChanged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isOutSide: Subject<any> = new Subject<any>();
  public isInside: Subject<any> = new Subject<any>();
  public isLoading: Subject<boolean> = new Subject<boolean>(); // dung cho spinner


  // end events

  constructor() { }
}
