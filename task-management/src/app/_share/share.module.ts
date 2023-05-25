import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareService } from './share.service';
import { AutoFocusDirective } from './directive/auto-focus.directive';
import { ClickOutsideAndUpdateDirective } from './directive/click-outside-and-update.directive';
import { StateTaskPipe } from './pipe/state-task.pipe';
import { TestDirective } from './directive/test.directive';
import { ValueArrayPipe } from './pipe/value-array.pipe';
import { HasPermissionDirective } from './directive/has-permission.directive';
import { BaseModule } from '../_base/base.module';
import { StoreDataModule } from '../_base/store-data.module';



@NgModule({
  declarations: [
    AutoFocusDirective,
    ClickOutsideAndUpdateDirective,
    StateTaskPipe,
    TestDirective,
    ValueArrayPipe,
    HasPermissionDirective,
  ],
  imports: [
    CommonModule,
    StoreDataModule
  ],
  exports: [
    AutoFocusDirective,
    ClickOutsideAndUpdateDirective,
    HasPermissionDirective,
    TestDirective,
    StateTaskPipe,
    ValueArrayPipe
  ],
  providers: [
    ShareService,
  ]
})
export class ShareModule { }
