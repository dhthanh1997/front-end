import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareService } from './share.service';
import { AutoFocusDirective } from './directive/auto-focus.directive';
import { ClickOutsideAndUpdateDirective } from './directive/click-outside-and-update.directive';
import { StateTaskPipe } from './pipe/state-task.pipe';
import { TestDirective } from './directive/test.directive';
import { ValueArrayPipe } from './pipe/value-array.pipe';



@NgModule({
  declarations: [
    AutoFocusDirective,
    ClickOutsideAndUpdateDirective,
    StateTaskPipe,
    TestDirective,
    ValueArrayPipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AutoFocusDirective,
    ClickOutsideAndUpdateDirective,
    TestDirective,
    StateTaskPipe,
    ValueArrayPipe
  ],
  providers: [
    ShareService
  ]
})
export class ShareModule { }
