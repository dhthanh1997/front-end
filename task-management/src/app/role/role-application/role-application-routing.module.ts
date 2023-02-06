import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleApplicationComponent } from './role-application.component';

const routes: Routes = [
  {
    path: '',
    component: RoleApplicationComponent,
  },
  {
    path: 'roles-app-detail/:id',
    loadChildren: () =>
      import('./role-app-detail/role-app-detail.module').then(
        (m) => m.RoleAppDetailModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoleApplicationRoutingModule {}
