import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MemberRoutingModule } from './member-routing.module';
import { MemberComponent } from './member.component';
import { IconsProviderModule } from '../../_theme/iconsProvider.module';
import { NgZorroModule } from '../../_theme/ng-zorro.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeleteComponent } from './delete/delete.component';
import { HttpClientModule } from '@angular/common/http';
import { MemberFormComponent } from './member-form/member-form.component';
import { CurrencyMaskModule } from "ng2-currency-mask";

@NgModule({
  declarations: [MemberComponent, DeleteComponent, MemberFormComponent],
  imports: [
    CommonModule,
    MemberRoutingModule,
    IconsProviderModule.forRoot(),
    NgZorroModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CurrencyMaskModule,
  ],
})
export class MemberModule {}
