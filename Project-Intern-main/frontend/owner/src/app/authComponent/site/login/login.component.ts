import { Component, inject } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslationService } from 'src/app/mainComponent/shared/i18n/translation.service';
import { ToastsService } from 'src/app/mainComponent/featrue/toasts/toasts.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  postForm: FormGroup;
  email: string = '';
  password: string = '';
  locale: string = "en";
  errors: any[] = [];

  toastService = inject(ToastsService);

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder, private translate: TranslationService) {
    this.postForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  };

  ngOnInit(): void {
    localStorage.setItem('locale', this.locale);
    this.translate.setDefaultLang(this.locale);
    this.loadToast();
  };

  login(): void {
    this.authService.login(this.email, this.password).subscribe({
      next: (data: any) => {
        this.setNoty(data["message"], "toast--success", 4000)
        setTimeout(() => {
          this.router.navigate(['/post'])
        }, 500);
      },
      error: (error) => {
        this.toastService.show({
          template: error["error"]["message"],
          classname: "toast--error",
          delay: 5000
        });
      }
    });
  };

  setNoty(message: string, classname: string, delay: any): void {
    localStorage.setItem('template', message)
    localStorage.setItem('classname', classname)
    localStorage.setItem('delay', delay)
    localStorage.setItem('msg', "Login successfully.")
  };
  
  loadToast() {
    const template = localStorage.getItem('template')
    const classname = localStorage.getItem('classname')
    const delay = localStorage.getItem('delay')
    const msg = localStorage.getItem('msg') || "Register successfully.";
    if (template && classname && delay) {
      this.toastService.show({template, msg, classname, delay: Number(delay)});
      localStorage.removeItem('template')
      localStorage.removeItem('classname')
      localStorage.removeItem('delay')
      localStorage.removeItem('msg')
    }
  };
}
