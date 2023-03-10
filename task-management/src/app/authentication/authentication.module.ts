import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationComponent } from './authentication.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { AuthenticationService } from './authentication.service';
import { IconsProviderModule } from '../_theme/iconsProvider.module';
import { NgZorroModule } from '../_theme/ng-zorro.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthenticationRoutingModule,
    HttpClientModule,
    IconsProviderModule.forRoot(),
    NgZorroModule.forRoot(),
  ],
  declarations: [AuthenticationComponent, LoginComponent],
  providers: [
    AuthenticationService
  ],
  exports: [AuthenticationComponent, LoginComponent]
})
export class AuthenticationModule { }
