import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskRoutingModule } from './task-routing.module';
import { TaskComponent } from './task.component';
import { IconsProviderModule } from '../@theme/iconsProvider.module';
import { NgZorroModule } from '../@theme/ng-zorro.module';


@NgModule({
  declarations: [
    TaskComponent
  ],
  imports: [
    CommonModule,
    IconsProviderModule.forRoot(),
    NgZorroModule.forRoot(),
    TaskRoutingModule
  ]
})
export class TaskModule { }
