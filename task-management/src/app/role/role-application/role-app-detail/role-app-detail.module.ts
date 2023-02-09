import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoleAppDetailRoutingModule } from './role-app-detail-routing.module';
import { RoleAppDetailComponent } from './role-app-detail.component';
import { IconsProviderModule } from '../../../_theme/iconsProvider.module';
import { NgZorroModule } from '../../../_theme/ng-zorro.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [RoleAppDetailComponent],
  imports: [
    CommonModule,
    RoleAppDetailRoutingModule,
    IconsProviderModule.forRoot(),
    NgZorroModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class RoleAppDetailModule {}
