import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class ShareService {

  taskData: Subject<any> = new Subject<any>();
  // collapse: Subject<boolean> = new Subject<boolean>();

  constructor() { }
}
