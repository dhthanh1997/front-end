import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareModule } from '../_share/share.module';
import { RowTableComponent } from './row-table/row-table.component';
import { NgZorroModule } from '../_theme/ng-zorro.module';
import { InputFileComponent } from './input-file/input-file.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';


@NgModule({
  declarations: [
    RowTableComponent,
    InputFileComponent,
    ProgressBarComponent
  ],
  imports: [
    CommonModule,
    // ShareModule,
    NgZorroModule.forRoot()
  ],
  exports: [
    RowTableComponent,
    InputFileComponent,
    ProgressBarComponent
  ]
})
export class ComponentModule { }
