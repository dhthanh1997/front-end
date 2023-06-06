import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { IconsProviderModule } from '../_theme/iconsProvider.module';
import { NgZorroModule } from '../_theme/ng-zorro.module';
import { ThemeModule } from '../_theme/theme.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from '../_core/core.module';
import { BaseModule } from '../_base/base.module';
import { JwtInterceptorService } from '../_base/interceptor/jwt-interceptor.service';
import { ShareModule } from '../_share/share.module';
import { StoreDataService } from '../_base/store-data.service';
import { StoreDataModule } from '../_base/store-data.module';


@NgModule({
  declarations: [
    PagesComponent,
    // HomeComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ThemeModule,
    ShareModule,
    IconsProviderModule.forRoot(),
    NgZorroModule.forRoot(),
    StoreDataModule
  ],
  providers: [
    // StoreDataService
  ]

})
export class PagesModule { }
