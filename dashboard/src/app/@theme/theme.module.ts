import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// ng zorro
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NZ_ICONS } from 'ng-zorro-antd/icon';

import {
  MenuFoldOutline,
  MenuUnfoldOutline,
  FormOutline,
  DashboardOutline,
  UserOutline,
  EnvironmentOutline,
  EnterOutline,
  InboxOutline,
  PhoneOutline,
  MessageOutline,
  MoneyCollectOutline,
  SolutionOutline,
  SendOutline,
  SearchOutline,
  PlusOutline,
  InsuranceOutline,
  DownCircleOutline,
  ProjectOutline,
  DollarOutline,
  FilterOutline,
  SortAscendingOutline,
  LinkOutline,
  TagsOutline,
  LaptopOutline,
  BookOutline,
  ArrowRightOutline,
  SettingOutline,
} from '@ant-design/icons-angular/icons';

const icons = [
  MenuFoldOutline,
  MenuUnfoldOutline,
  DashboardOutline,
  FormOutline,
  UserOutline,
  EnvironmentOutline,
  EnterOutline,
  InboxOutline,
  PhoneOutline,
  MessageOutline,
  MoneyCollectOutline,
  SolutionOutline,
  SendOutline,
  SearchOutline,
  PlusOutline,
  InsuranceOutline,
  DownCircleOutline,
  ProjectOutline,
  DollarOutline,
  FilterOutline,
  SortAscendingOutline,
  LinkOutline,
  TagsOutline,
  LaptopOutline,
  BookOutline,
  ArrowRightOutline,
  SettingOutline,
];

@NgModule({
  declarations: [],
  imports: [CommonModule, NzIconModule],
  exports: [NzIconModule],
})
export class ThemeModule {
  static forRoot(): ModuleWithProviders<ThemeModule> {
    return {
      ngModule: ThemeModule,
      providers: [{ provide: NZ_ICONS, useValue: icons }],
    };
  }
}
