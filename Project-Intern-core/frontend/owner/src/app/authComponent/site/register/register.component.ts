import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastsService } from 'src/app/mainComponent/featrue/toasts/toasts.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  postForm: FormGroup;
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errors: any[] = [];

  toastService = inject(ToastsService)

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) { 
    this.postForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  register(): void {
    this.authService.register(this.username, this.email, this.password, this.confirmPassword).subscribe({
      next: (data: any) => {
        this.setNoty(data["message"], "toast--success", 4000)
        setTimeout(() => {
          this.router.navigate(['/auth/login']);
        }, 500);
      },
      error: (error) => {
        this.errors = error["error"]["data"]["errors"];
        this.errors.forEach((error) => this.toastService.show({template: error["message"], classname: "toast--error", delay: 5000}));
      }
    });
  };

  setNoty(message: string, classname: string, delay: any): void {
    localStorage.setItem('template', message)
    localStorage.setItem('classname', classname)
    localStorage.setItem('delay', delay)
  };
}
