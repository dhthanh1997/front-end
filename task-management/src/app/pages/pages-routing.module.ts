import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '../_component/not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { PagesComponent } from './pages.component';
import { PermissionGuardService } from '../_base/guard/permission-guard.service';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivateChild: [PermissionGuardService],
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
        
      },
      {
        path: 'welcome',
        loadChildren: () => import('./welcome/welcome.module').then((m) => m.WelcomeModule),
      },
      {
        path: 'project',
        loadChildren: () =>
          import('./project/project.module').then((m) => m.ProjectModule),
      },
      {
        path: 'task',
        loadChildren: () => import('./task/task.module').then((m) => m.TaskModule),
      },
      {
        path: 'permission',
        loadChildren: () =>
          import('./permission/permission.module').then((m) => m.PermissionModule),
      },
      {
        path: 'member',
        loadChildren: () =>
          import('./member/member.module').then((m) => m.MemberModule),
      },
      {
        path: 'team',
        loadChildren: () =>
          import('./team/team.module').then((m) => m.TeamModule),
      },
      {
        path: 'roles-app',
        loadChildren: () =>
          import('./role/role-application/role-application.module').then(
            (m) => m.RoleApplicationModule
          ),
      },
      {
        path: 'user-profile',
        loadChildren: () =>
          import('./user/profile/profile.module').then(
            (m) => m.ProfileModule
          ),
      },
      {
        path: 'user-setting',
        loadChildren: () =>
          import('./user/setting/setting.module').then(
            (m) => m.SettingModule
          ),
      },
      {
        path: 'report',
        loadChildren: () => import('./report/report.module').then((m) => m.ReportModule),
      },
      {
        path: '**',
        redirectTo: 'home',
        pathMatch: 'full'
      },
    ]
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
