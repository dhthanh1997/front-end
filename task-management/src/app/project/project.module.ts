import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjectComponent } from './project.component';
import { IconsProviderModule } from '../@theme/iconsProvider.module';
import { NgZorroModule } from '../@theme/ng-zorro.module';
import { ProjectFormComponent } from './project-form/project-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeleteComponent } from './delete/delete.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [ProjectComponent, ProjectFormComponent, DeleteComponent],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    IconsProviderModule.forRoot(),
    NgZorroModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
})
export class ProjectModule {}
