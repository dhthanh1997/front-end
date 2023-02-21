import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable()
export class NotifyService {

  private modalOptions: any = {
    nzDuration: 3000
  }

  constructor(private service: NzNotificationService) { }

  success(message: string) {
    this.service.success('Thành công', message, this.modalOptions);
  }

  error(message: string) {
    this.service.error('Thất bại', message , this.modalOptions);
  }

  warning(message: string) {
    this.service.warning('Cảnh báo', message , this.modalOptions);
  }

  info(message: string) {
    this.service.info('Thông tin', message , this.modalOptions);
  }

}
