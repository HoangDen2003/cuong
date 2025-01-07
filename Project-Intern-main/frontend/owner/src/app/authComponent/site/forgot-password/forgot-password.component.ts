import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { ToastsService } from 'src/app/mainComponent/featrue/toasts/toasts.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  postForm: FormGroup;

  errors: any[] = [];

  toastService = inject(ToastsService);

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.postForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  };
  
  ngOnInit(): void {};

  onSubmit(): void {
    const email = this.postForm.get('email')?.value;
    localStorage.setItem('email', email);
    this.authService.forgotPassword(email).subscribe({
      next: (data: any) => {
          this.setNoty(data["message"], "toast--success", 4000)
          setTimeout(() => {
            this.router.navigate(['/auth/verify-email'])
          }, 500);
      },
      error: (error) => {
        this.errors = error["error"]["data"]["errors"];
        this.errors.forEach((error) => this.toastService.show({template: error["message"], classname: "toast--error", delay: 4000}));
      }
    })
  };

  setNoty(message: string, classname: string, delay: any): void {
    localStorage.setItem('template', message)
    localStorage.setItem('classname', classname)
    localStorage.setItem('delay', delay)
    localStorage.setItem('msg', "Send OTP successfully.")
  };

}
