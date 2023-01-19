import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { NgZorroModule } from '../@theme/ng-zorro.module';
import { IconsProviderModule } from '../@theme/iconsProvider.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NgZorroModule.forRoot(),
    IconsProviderModule.forRoot(),
  ],
})
export class HomeModule {}
