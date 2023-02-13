import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskData } from './api/task/task-data';
import { TaskService } from './api/task/task.service';
import { TaskApi } from './api/task/task.api';
import { BaseModule } from '../_base/base.module';

const API = [
  TaskApi
]

const SERVICES = [
  {provide: TaskData, useClass: TaskService}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BaseModule.forRoot()
  ],
  exports: []
})
export class CoreModule { 
  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        ...API,
        ...SERVICES,
      ]
    }
  }
}
