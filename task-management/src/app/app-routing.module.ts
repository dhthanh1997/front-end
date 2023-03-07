import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './_base/guard/auth-guard.service';

const routes: Routes = [
  {
    path: 'pages',
    loadChildren: () =>
      import('./pages/pages.module').then((m) => m.PagesModule),
    // canActivate: [AuthGuardService]
  },
  {
    path: '**',
    redirectTo: 'pages',
    pathMatch: 'full'
  },
  // {
  //   path: '',
  //   redirectTo: 'pages/home',
  //   pathMatch: 'full'
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
