import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskComponent } from '../task/task.component';
import { ProjectComponent } from './project.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectComponent,
    // redirectTo: 'welcome',
    children: [
      {
        path: 'project-task/:id',
        loadChildren:() => import('../task/task.module').then((m) => m.TaskModule)
      }
    ]
  },
  {
    path: 'welcome/:id',
    loadChildren: () =>
      import('../welcome/welcome.module').then((m) => m.WelcomeModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectRoutingModule { }
