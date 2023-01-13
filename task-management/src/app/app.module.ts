import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ThemeModule } from './@theme/theme.module';
import { IconsProviderModule } from './@theme/iconsProvider.module';
import { NgZorroModule } from './@theme/ng-zorro.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ThemeModule,
    HttpClientModule,
    IconsProviderModule.forRoot(),
    NgZorroModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
