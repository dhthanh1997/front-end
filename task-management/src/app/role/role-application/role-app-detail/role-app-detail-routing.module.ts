import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleAppDetailComponent } from './role-app-detail.component';

const routes: Routes = [
  {
    path: '',
    component: RoleAppDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoleAppDetailRoutingModule {}
