import { Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private messageOptions: any = {
    nzDuration: 3000
  }

  constructor(
    private service: NzMessageService
  ) { }

  success(message: string) {
    this.service.success(message, this.messageOptions);
  }

  error(message: string) {
    this.service.error(message, this.messageOptions);
  }

  warning(message: string) {
    this.service.warning(message, this.messageOptions );
  }

  info(message: string) {
    this.service.info(message, this.messageOptions);
  }

  loading(message: string) {
    this.service.loading(message, this.messageOptions);
  }
}
