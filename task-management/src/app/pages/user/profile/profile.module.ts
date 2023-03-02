import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IconsProviderModule } from '../../../_theme/iconsProvider.module';
import { NgZorroModule } from '../../../_theme/ng-zorro.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';


@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    IconsProviderModule.forRoot(),
    NgZorroModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ProfileModule { }
