import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskRoutingModule } from './task-routing.module';
import { TaskComponent } from './task.component';
import { IconsProviderModule } from '../_theme/iconsProvider.module';
import { NgZorroModule } from '../_theme/ng-zorro.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TaskHeaderComponent } from './task-header/task-header.component';
import { TaskTableComponent } from './task-table/task-table.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { ShareModule } from '../_share/share.module';
import { TaskDetailFrmComponent } from './task-detail/task-detail-frm/task-detail-frm.component';
import { TaskRowTableComponent } from './task-detail/common/task-row-table/task-row-table.component';
import { TaskDetailTableComponent } from './task-detail/common/task-detail-table/task-detail-table.component';


@NgModule({
  declarations: [
    TaskComponent,
    TaskHeaderComponent,
    TaskTableComponent,
    TaskDetailComponent,
    TaskDetailFrmComponent,
    TaskDetailTableComponent,
    TaskRowTableComponent,
  ],
  imports: [
    CommonModule,
    IconsProviderModule.forRoot(),
    NgZorroModule.forRoot(),
    TaskRoutingModule,
    DragDropModule,
    ReactiveFormsModule,
    ShareModule,
  ]
})
export class TaskModule { }
