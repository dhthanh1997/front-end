import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareService } from './share.service';
import { AutoFocusDirective } from './directive/auto-focus.directive';



@NgModule({
  declarations: [
    AutoFocusDirective,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AutoFocusDirective
  ],
  providers: [
    ShareService
  ]
})
export class ShareModule { }
