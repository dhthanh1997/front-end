import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareService } from './share.service';
import { AutoFocusDirective } from './directive/auto-focus.directive';
import { ClickOutsideAndUpdateDirective } from './directive/click-outside-and-update.directive';
import { StateTaskPipe } from './pipe/state-task.pipe';
import { TestDirective } from './directive/test.directive';



@NgModule({
  declarations: [
    AutoFocusDirective,
    ClickOutsideAndUpdateDirective,
    StateTaskPipe,
    TestDirective,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AutoFocusDirective,
    ClickOutsideAndUpdateDirective,
    TestDirective,
    StateTaskPipe
  ],
  providers: [
    ShareService
  ]
})
export class ShareModule { }
