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
import { CurrencyMaskModule } from "ng2-currency-mask";
import { CoreModule } from '../../_core/core.module';

@NgModule({
  declarations: [ProjectComponent, ProjectFormComponent, DeleteComponent],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    IconsProviderModule,
    NgZorroModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    CurrencyMaskModule
  ],
  exports: [
    ProjectFormComponent, DeleteComponent
  ],
})
export class ProjectModule {}
