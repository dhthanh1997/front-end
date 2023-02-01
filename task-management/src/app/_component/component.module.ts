import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareModule } from '../_share/share.module';
import { RowTableComponent } from './row-table/row-table.component';
import { NgZorroModule } from '../_theme/ng-zorro.module';



@NgModule({
  declarations: [
    RowTableComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    NgZorroModule.forRoot()
  ]
})
export class ComponentModule { }
