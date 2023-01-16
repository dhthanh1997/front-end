import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskRoutingModule } from './task-routing.module';
import { TaskComponent } from './task.component';
import { IconsProviderModule } from '../@theme/iconsProvider.module';
import { NgZorroModule } from '../@theme/ng-zorro.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TaskHeaderComponent } from './task-header/task-header.component';
import { TaskTableComponent } from './task-table/task-table.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TaskComponent,
    TaskHeaderComponent,
    TaskTableComponent
  ],
  imports: [
    CommonModule,
    IconsProviderModule.forRoot(),
    NgZorroModule.forRoot(),
    TaskRoutingModule,
    DragDropModule,
    ReactiveFormsModule
  ]
})
export class TaskModule { }
