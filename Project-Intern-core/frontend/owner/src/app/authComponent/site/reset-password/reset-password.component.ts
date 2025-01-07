import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastsService } from 'src/app/mainComponent/featrue/toasts/toasts.service';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  postForm: FormGroup;
  email: string;
  password: string = '';
  confirmPassword: string = '';
  errors: any[] = [];
  
  constructor(
    private fb: FormBuilder,
    private toastService: ToastsService,
    private authService: AuthService,
    private router: Router,
  ) {
    this.postForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    })
  };

  ngOnInit(): void {
    const emailFromStorage = localStorage.getItem('email');
    this.email = emailFromStorage ? emailFromStorage : '';
    this.loadToast();
  };

  onSubmit(): void {
    this.authService.resetPassword(this.email, this.password, this.confirmPassword).subscribe({
      next: (data: any) => {
        this.setNoty(data["message"], "toast--success", 4000)
        setTimeout(() => {
          this.router.navigate(['/auth/login'])
        }, 500);
    },
    error: (error) => {
        if (error["error"]["status"] === 401) {
          this.toastService.show({template: "OTP Failed", classname: "toast--error", delay: 4000})
        } else {
          this.errors = error["error"]["data"]["errors"];
          this.errors.forEach((error) => this.toastService.show({template: error["message"], classname: "toast--error", delay: 4000}));
        }
      }
    })
  };

  setNoty(message: string, classname: string, delay: any): void {
    localStorage.setItem('template', message);
    localStorage.setItem('classname', classname);
    localStorage.setItem('delay', delay);
    localStorage.setItem('msg', "Change password successfully.");
  };

  loadToast() {
    const template = localStorage.getItem('template');
    const classname = localStorage.getItem('classname');
    const delay = localStorage.getItem('delay');
    const msg = localStorage.getItem('msg') || "";
    if (template && classname && delay) {
      this.toastService.show({template, msg, classname, delay: Number(delay)});
      localStorage.removeItem('template');
      localStorage.removeItem('classname');
      localStorage.removeItem('delay');
      localStorage.removeItem('msg');
    }
  };
}
