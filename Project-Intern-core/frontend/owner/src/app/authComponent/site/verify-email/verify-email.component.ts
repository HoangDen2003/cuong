import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastsService } from 'src/app/mainComponent/featrue/toasts/toasts.service';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent {
  toastService = inject(ToastsService);
  postForm: FormGroup;

  errors: any[] = [];
  otpControls: FormControl[];
  
  constructor( private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.otpControls = Array(6).fill(null).map(() => new FormControl('', Validators.required));
    this.postForm = this.fb.group({
      otp: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]),
    });
  };

  ngOnInit(): void { 
    this.loadToast();
  }

  onOtpInput(event: any, index: number): void {
    const input = event.target.value;
    if (input.length === 1 && index < 5) {
      const otpInput = document.querySelectorAll('.numeral-mask')[index + 1] as HTMLInputElement;
      otpInput.focus();
    }
    this.updateOtpValue();
  }

  updateOtpValue(): void {
    const otpValue = this.otpControls.map(control => control.value).join('');
    this.postForm.get('otp')?.setValue(otpValue);
  }

  onSubmit(): void {
    const email = localStorage.getItem('email');
    const otp = this.postForm.get('otp')?.value;
    if (email) {
      this.authService.checkOtpMail(email, otp).subscribe({
        next: (data: any) => {
          this.setNoty(data["message"], "toast--success", 4000)
          setTimeout(() => {
            this.router.navigate(['/auth/reset-password'])
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
    }
  };

  setNoty(message: string, classname: string, delay: any): void {
    localStorage.setItem('template', message);
    localStorage.setItem('classname', classname);
    localStorage.setItem('delay', delay);
    localStorage.setItem('msg', "Input valid OTP.");
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
