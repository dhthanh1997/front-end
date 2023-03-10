import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { NgZorroModule } from '../../_theme/ng-zorro.module';
import { IconsProviderModule } from '../../_theme/iconsProvider.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NgZorroModule,
    IconsProviderModule,
  ],
})
export class HomeModule {}
