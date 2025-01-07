import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutAuthComponent } from './layout-auth.component';
import { LoginComponent } from './site/login/login.component';
import { RegisterComponent } from './site/register/register.component';
import { ForgotPasswordComponent } from './site/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './site/verify-email/verify-email.component';
import { ResetPasswordComponent } from './site/reset-password/reset-password.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutAuthComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
      { path: 'verify-email', component: VerifyEmailComponent },
      { path: 'reset-password', component: ResetPasswordComponent },
      { path: '', redirectTo: '/login', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutAuthRoutingModule { }
