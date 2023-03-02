import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { IconsProviderModule } from '../../_theme/iconsProvider.module';
import { NgZorroModule } from '../../_theme/ng-zorro.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PermissionRoutingModule } from './permission-routing.module';
import { PermissionComponent } from './permission.component';
import { PermissionFormComponent } from './permission-form/permission-form.component';
import { DeleteComponent } from './delete/delete.component';

@NgModule({
  declarations: [PermissionComponent, PermissionFormComponent, DeleteComponent],
  imports: [
    CommonModule,
    PermissionRoutingModule,
    HttpClientModule,
    IconsProviderModule,
    NgZorroModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class PermissionModule {}
