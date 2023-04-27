import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskData } from './api/task/task-data';
import { TaskService } from './api/task/task.service';
import { TaskApi } from './api/task/task.api';
import { BaseModule } from '../_base/base.module';
import { CommentData } from './api/comment/comment-data';
import { CommentService } from './api/comment/comment.service';
import { CommentApi } from './api/comment/comment.api';
import { MemberApi } from './api/member/member.api';
import { MemberData } from './api/member/member-data';
import { MemberService } from './api/member/member.service';
import { PermissionApi } from './api/permission/permission.api';
import { PermissionData } from './api/permission/permission-data';
import { PermissionService } from './api/permission/permission.service';
import { RoleAppApi } from './api/role-application/role-app.api';
import { RoleAppData } from './api/role-application/role-app-data';
import { RoleAppService } from './api/role-application/role-app.service';
import { RolePermissionApi } from './api/role-permission/role-permission.api';
import { RolePermissionData } from './api/role-permission/role-permission-data';
import { RolePermissionService } from './api/role-permission/role-permission.service';
import { TagApi } from './api/tag/tag.api';
import { TagData } from './api/tag/tag-data';
import { TagService } from './api/tag/tag.service';
import { SectionApi } from './api/section/section.api';
import { SectionData } from './api/section/section-data';
import { SectionService } from './api/section/section.service';
import { UploadFileService } from './api/upload-file/upload-file.service';
import { UploadFileData } from './api/upload-file/upload-file-data';
import { UploadFileApi } from './api/upload-file/upload-file.api';
import { ProjectData } from './api/project/project-data';
import { ProjectService } from './api/project/project.service';
import { ProjectApi } from './api/project/project.api';
import { TeamApi } from './api/team/team.api';
import { TeamData } from './api/team/team-data';
import { TeamService } from './api/team/team.service';
import { UserApi } from './api/user/user.api';
import { UserData } from './api/user/user-data';
import { UserService } from './api/user/user.service';
import { ReportApi } from './api/report/report.api';
import { ReportData } from './api/report/report-data';
import { ReportService } from './api/report/report.service';

const API = [
  TaskApi,
  CommentApi,
  MemberApi,
  PermissionApi,
  RoleAppApi,
  RolePermissionApi,
  TagApi,
  SectionApi,
  UploadFileApi,
  ProjectApi,
  TeamApi,
  UserApi,
  ReportApi
];

const SERVICES = [
  { provide: TaskData, useClass: TaskService },
  { provide: CommentData, useClass: CommentService },
  { provide: MemberData, useClass: MemberService },
  { provide: PermissionData, useClass: PermissionService },
  { provide: RoleAppData, useClass: RoleAppService },
  { provide: RolePermissionData, useClass: RolePermissionService },
  { provide: TagData, useClass: TagService },
  { provide: SectionData, useClass: SectionService },
  { provide: UploadFileData, useClass: UploadFileService },
  { provide: ProjectData, useClass: ProjectService },
  { provide: TeamData, useClass: TeamService },
  { provide: UserData, useClass: UserService },
  { provide: ReportData, useClass: ReportService },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, BaseModule.forRoot()],
  exports: [],
})
export class CoreModule {
  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [...API, ...SERVICES],
    };
  }
}
