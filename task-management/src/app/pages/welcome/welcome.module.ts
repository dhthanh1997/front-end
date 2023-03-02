import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WelcomeRoutingModule } from './welcome-routing.module';
import { IconsProviderModule } from '../../_theme/iconsProvider.module';
import { NgZorroModule } from '../../_theme/ng-zorro.module';
import { WelcomeComponent } from './welcome.component';
import { TableViewComponent } from './table-view/table-view.component';
import { BoardViewComponent } from './board-view/board-view.component';
import { TimelineComponent } from './timeline/timeline.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HighchartsChartModule } from 'highcharts-angular';
import { registerLocaleData } from '@angular/common';
import vn from '@angular/common/locales/en';
import { BoardTaskFormComponent } from './board-view/board-task-form/board-task-form.component';
import { DeleteComponent } from './board-view/delete/delete.component';
import { OverviewComponent } from './overview/overview.component';
import { HttpClientModule } from '@angular/common/http';
import { ShareModule } from '../../_share/share.module';
registerLocaleData(vn);

@NgModule({
  declarations: [
    WelcomeComponent,
    TableViewComponent,
    BoardViewComponent,
    TimelineComponent,
    DeleteComponent,
    OverviewComponent,
    BoardTaskFormComponent
  ],
  imports: [
    CommonModule,
    WelcomeRoutingModule,
    NgZorroModule.forRoot(),
    DragDropModule,
    FormsModule,
    IconsProviderModule.forRoot(),
    // NzDatePickerModule,
    HighchartsChartModule,
    ReactiveFormsModule,
    NzUploadModule,
    HttpClientModule,
    ShareModule,
  ],
})
export class WelcomeModule {}
