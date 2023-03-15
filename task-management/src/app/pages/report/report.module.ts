import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { ReportComponent } from './report.component';
import { IconsProviderModule } from 'src/app/_theme/iconsProvider.module';
import { NgZorroModule } from 'src/app/_theme/ng-zorro.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HighchartsChartModule } from 'highcharts-angular';


@NgModule({
  declarations: [
    ReportComponent
  ],
  imports: [
    CommonModule,
    ReportRoutingModule,
    IconsProviderModule,
    NgZorroModule,
    ReactiveFormsModule,
    FormsModule,
    HighchartsChartModule
  ]
})
export class ReportModule { }
