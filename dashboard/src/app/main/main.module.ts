import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
// import { provideSvgIcons } from '@ngneat/svg-icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { HighchartsChartModule } from 'highcharts-angular';
import { MainComponent } from './main.component';
import { NzIconModule } from 'ng-zorro-antd/icon';

@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    NzModalModule,
    HighchartsChartModule,
    NzIconModule,
  ],
  providers: [],
})
export class MainModule {}
