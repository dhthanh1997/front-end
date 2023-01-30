import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareService } from './share.service';
import { AutoFocusDirective } from './directive/auto-focus.directive';
import { ClickOutsideAndUpdateDirective } from './directive/click-outside-and-update.directive';



@NgModule({
  declarations: [
    AutoFocusDirective,
    ClickOutsideAndUpdateDirective,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AutoFocusDirective,
    ClickOutsideAndUpdateDirective,
  ],
  providers: [
    ShareService
  ]
})
export class ShareModule { }
