import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainService } from './main/service/main.service';
import { HttpClientModule } from '@angular/common/http';
import { ThemeModule } from './@theme/theme.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ThemeModule.forRoot(),
  ],
  providers: [MainService],
  bootstrap: [AppComponent],
})
export class AppModule {}
