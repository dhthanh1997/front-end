import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskRoutingModule } from './task-routing.module';
import { TaskComponent } from './task.component';
import { IconsProviderModule } from '../_theme/iconsProvider.module';
import { NgZorroModule } from '../_theme/ng-zorro.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TaskTableComponent } from './task-table/task-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { ShareModule } from '../_share/share.module';
import { TaskDetailFrmComponent } from './task-detail/task-detail-frm/task-detail-frm.component';
import { TaskRowTableComponent } from './task-detail/common/task-row-table/task-row-table.component';
import { TaskDetailTableComponent } from './task-detail/common/task-detail-table/task-detail-table.component';
import { ComponentModule } from '../_component/component.module';
import { TaskUploadFileComponent } from './task-detail/task-upload-file/task-upload-file.component';

@NgModule({
  declarations: [
    TaskComponent,
    TaskTableComponent,
    TaskDetailComponent,
    TaskDetailFrmComponent,
    TaskDetailTableComponent,
    TaskRowTableComponent,
    TaskUploadFileComponent,
  ],
  imports: [
    CommonModule,
    IconsProviderModule,
    NgZorroModule,
    TaskRoutingModule,
    DragDropModule,
    ReactiveFormsModule,
    ShareModule,
    ComponentModule,
    FormsModule
  ]
})
export class TaskModule { }
