import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleProjectRoutingModule } from './role-project-routing.module';
import { RoleProjectComponent } from './role-project.component';

@NgModule({
  declarations: [
    RoleProjectComponent
  ],
  imports: [CommonModule, RoleProjectRoutingModule],
})
export class RoleProjectModule {}
