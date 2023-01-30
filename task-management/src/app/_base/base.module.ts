import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpService } from './http.service';
import { JwtInterceptorService } from './interceptor/jwt-interceptor.service';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NotifyService } from './notify.service';

const PROVIDERS = [
  HttpService,
  JwtInterceptorService
]

const SERVICES = [
  NotifyService
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NzNotificationModule
  ]
})
export class BaseModule {
  static forRoot(): ModuleWithProviders<BaseModule> {
    return {
      ngModule: BaseModule,
      providers: [
        ...PROVIDERS,
        ...SERVICES
      ]
    }
  }
}
