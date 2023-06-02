import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { ReportComponent } from './report.component';
import { IconsProviderModule } from 'src/app/_theme/iconsProvider.module';
import { NgZorroModule } from 'src/app/_theme/ng-zorro.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HighchartsChartModule } from 'highcharts-angular';
import { TaskExportComponent } from './task-export/task-export.component';
import { DragDropModule } from '@angular/cdk/drag-drop';


@NgModule({
  declarations: [
    ReportComponent,
    TaskExportComponent
  ],
  imports: [
    CommonModule,
    ReportRoutingModule,
    IconsProviderModule,
    NgZorroModule,
    ReactiveFormsModule,
    FormsModule,
    HighchartsChartModule,
    DragDropModule,
  ]
})
export class ReportModule { }
