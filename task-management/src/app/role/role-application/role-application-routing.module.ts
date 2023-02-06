import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleApplicationComponent } from './role-application.component';

const routes: Routes = [
  {
    path: '',
    component: RoleApplicationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoleApplicationRoutingModule {}
