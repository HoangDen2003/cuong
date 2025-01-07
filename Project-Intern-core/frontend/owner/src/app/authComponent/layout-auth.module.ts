import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutAuthRoutingModule } from './layout-auth-routing.module';
import { LayoutAuthComponent } from './layout-auth.component';
import { LoginComponent } from './site/login/login.component';
import { RegisterComponent } from './site/register/register.component';
import { ForgotPasswordComponent } from './site/forgot-password/forgot-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VerifyEmailComponent } from './site/verify-email/verify-email.component';
import { ResetPasswordComponent } from './site/reset-password/reset-password.component';


@NgModule({
  declarations: [
    LayoutAuthComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutAuthRoutingModule
  ],
  exports: [
    LayoutAuthComponent,
  ]
})
export class LayoutAuthModule { }
