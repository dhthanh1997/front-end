import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjectComponent } from './project.component';
import { IconsProviderModule } from '../../_theme/iconsProvider.module';
import { NgZorroModule } from '../../_theme/ng-zorro.module';
import { ProjectFormComponent } from './project-form/project-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeleteComponent } from './delete/delete.component';
import { HttpClientModule } from '@angular/common/http';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { HighchartsChartModule } from 'highcharts-angular';
import { SubProjectComponent } from './sub-project/sub-project.component';
import { ProjectTimelineComponent } from './project-timeline/project-timeline.component';
import { ShareModule } from 'src/app/_share/share.module';
import { StoreDataModule } from 'src/app/_base/store-data.module';

@NgModule({
  declarations: [
    ProjectComponent,
    ProjectFormComponent,
    DeleteComponent,
    SubProjectComponent,
    ProjectTimelineComponent,
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    IconsProviderModule,
    NgZorroModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    CurrencyMaskModule,
    HighchartsChartModule,
    ShareModule,
    
  ],
  exports: [ProjectFormComponent, DeleteComponent],
})
export class ProjectModule {}
