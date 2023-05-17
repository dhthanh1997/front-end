import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskRoutingModule } from './task-routing.module';
import { TaskComponent } from './task.component';
import { IconsProviderModule } from '../../_theme/iconsProvider.module';
import { NgZorroModule } from '../../_theme/ng-zorro.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TaskTableComponent } from './task-table/task-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { ShareModule } from '../../_share/share.module';
import { TaskDetailFrmComponent } from './task-detail/task-detail-frm/task-detail-frm.component';
import { TaskRowTableComponent } from './task-detail/common/task-row-table/task-row-table.component';
import { TaskDetailTableComponent } from './task-detail/common/task-detail-table/task-detail-table.component';
import { ComponentModule } from '../../_component/component.module';
import { TaskUploadFileComponent } from './task-detail/task-upload-file/task-upload-file.component';
import { TaskTagComponent } from './task-detail/task-tag/task-tag.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { NgxColorsModule } from 'ngx-colors';
import { TaskSubTableComponent } from './task-detail/common/task-sub-table/task-sub-table.component';
import { TaskExportComponent } from './task-export/task-export.component';
import { SubItemComponent } from './task-export/sub-item/sub-item.component';

@NgModule({
  declarations: [
    TaskComponent,
    TaskTableComponent,
    TaskDetailComponent,
    TaskDetailFrmComponent,
    TaskDetailTableComponent,
    TaskRowTableComponent,
    TaskUploadFileComponent,
    TaskTagComponent,
    TaskSubTableComponent,
    TaskExportComponent,
    SubItemComponent,
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
    FormsModule,
    ColorPickerModule,
    NgxColorsModule,
  ]
})
export class TaskModule { }
