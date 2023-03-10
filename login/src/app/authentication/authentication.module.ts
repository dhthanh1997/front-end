import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationComponent } from './authentication.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { AuthenticationService } from './authentication.service';
import { IconsProviderModule } from '../_core/iconsProvider.module';

// Nz Zorro Modules
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzIconModule, NZ_ICONS } from 'ng-zorro-antd/icon';

const NZ_MODULES = [
  NzFormModule,
  NzInputModule,
  NzCheckboxModule,
  NzAlertModule,
  NzIconModule,
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthenticationRoutingModule,
    HttpClientModule,
    IconsProviderModule,
    ...NZ_MODULES,
  ],
  declarations: [AuthenticationComponent, LoginComponent],
  providers: [
    AuthenticationService
  ],
  exports: [AuthenticationComponent, LoginComponent]
})
export class AuthenticationModule { }
