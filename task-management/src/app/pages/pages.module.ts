import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { IconsProviderModule } from '../_theme/iconsProvider.module';
import { NgZorroModule } from '../_theme/ng-zorro.module';
import { ThemeModule } from '../_theme/theme.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from '../_core/core.module';


@NgModule({
  declarations: [
    PagesComponent,
    // HomeComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ThemeModule,
    // IconsProviderModule,
    // NgZorroModule,
  ]
})
export class PagesModule { }
