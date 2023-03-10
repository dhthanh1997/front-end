import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
// import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { RouterModule } from '@angular/router';
import { IconsProviderModule } from './iconsProvider.module';
import { NZ_I18N, vi_VN } from 'ng-zorro-antd/i18n';
import vi from '@angular/common/locales/vi';
import { ShareService } from './shared/share.service';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NgZorroModule } from './ng-zorro.module';
import { ProjectModule } from '../pages/project/project.module';

registerLocaleData(vi);

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    IconsProviderModule.forRoot(),
    NzDropDownModule,
    NgZorroModule.forRoot(),
    ProjectModule
  ],
  declarations: [
    LayoutComponent,
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    // BreadcrumbComponent,
  ],
  exports: [
    IconsProviderModule,
    LayoutComponent,
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    // BreadcrumbComponent,
  ],
  providers: [
    {
      provide: NZ_I18N,
      useValue: vi_VN,
    },
    ShareService,
  ],
})
export class ThemeModule {
  static forRoot(): ModuleWithProviders<ThemeModule> {
    return {
      ngModule: ThemeModule,
      providers: [],
    };
  }
}
