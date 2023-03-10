import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpService } from './http.service';
import { JwtInterceptorService } from './interceptor/jwt-interceptor.service';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NotifyService } from './notify.service';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { MessageService } from './message.service';
import { AuthGuardService } from './guard/auth-guard.service';
import { AuthService } from './auth.service';

const PROVIDERS = [
  HttpService,
  JwtInterceptorService,
  AuthGuardService,
  AuthService
]

const SERVICES = [
  NotifyService,
  MessageService
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NzNotificationModule,
    NzMessageModule
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
