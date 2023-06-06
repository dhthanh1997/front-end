import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ThemeModule } from './_theme/theme.module';
import { IconsProviderModule } from './_theme/iconsProvider.module';
import { NgZorroModule } from './_theme/ng-zorro.module';
import { CoreModule } from './_core/core.module';
import { NZ_I18N, vi_VN } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import { vi } from 'date-fns/locale';
import { BaseModule } from './_base/base.module';
import { JwtInterceptorService } from './_base/interceptor/jwt-interceptor.service';
import { PageMenuService } from './pages/page-menu.service';
import { StoreDataModule } from './_base/store-data.module';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    IconsProviderModule.forRoot(),
    ThemeModule.forRoot(),
    CoreModule.forRoot(),
    StoreDataModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true
    },
    PageMenuService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
