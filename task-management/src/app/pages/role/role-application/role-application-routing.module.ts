import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleAppDetailComponent } from './role-app-detail/role-app-detail.component';
import { RoleApplicationComponent } from './role-application.component';

const routes: Routes = [
  {
    path: '',
    component: RoleApplicationComponent,
    children: [
      {
        path: 'roles-app-detail/:id',
        component: RoleAppDetailComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoleApplicationRoutingModule {}
