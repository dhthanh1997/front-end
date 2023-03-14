import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzBadgeModule } from 'ng-zorro-antd/badge';

// NgZorro local english language settings
import { NZ_I18N, en_US, vi_VN } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzProgressModule } from 'ng-zorro-antd/progress';
registerLocaleData(en);

const NZ_MODULES = [
  NzButtonModule,
  NzCardModule,
  NzDropDownModule,
  NzTableModule,
  NzTabsModule,
  NzDatePickerModule,
  NzInputModule,
  NzModalModule,
  NzSelectModule,
  NzNotificationModule,
  NzPaginationModule,
  NzCheckboxModule,
  NzGridModule,
  NzFormModule,
  NzUploadModule,
  NzMessageModule,
  NzTagModule,
  NzToolTipModule,
  NzSpinModule,
  NzMenuModule,
  NzLayoutModule,
  NzCollapseModule,
  NzRadioModule,
  NzPageHeaderModule,
  NzSpaceModule,
  NzDescriptionsModule,
  NzListModule,
  NzSkeletonModule,
  NzProgressModule,
  NzSwitchModule,
  NzPopconfirmModule,
  NzAlertModule,
  NzBadgeModule,
];

@NgModule({
  imports: [CommonModule, ...NZ_MODULES],
  declarations: [],
  exports: [NZ_MODULES],
  providers: [{ provide: NZ_I18N, useValue: vi_VN }],
})
export class NgZorroModule {
  static forRoot(): ModuleWithProviders<NgZorroModule> {
    return {
      ngModule: NgZorroModule,
      providers: [],
    };
  }

}
