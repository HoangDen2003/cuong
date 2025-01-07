import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { format } from 'date-fns';
import { TranslationService } from '../../shared/i18n/translation.service';
import { ToastsService } from '../../featrue/toasts/toasts.service';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.css']
})
export class AccountPageComponent implements OnInit {
  postForm: FormGroup;
  profile: any;
  locale: string = '';

  toastService = inject(ToastsService);

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private translate: TranslationService) {
      this.postForm = this.fb.group({
        username: ['', Validators.required],
        birthday: [''],
        address: [''],
        email: ['', Validators.required],
        phone: [''],
        role: [''],
      });
   };

   ngOnInit(): void {
    this.locale = localStorage.getItem('locale') || 'en';
    this.translate.setDefaultLang(this.locale);
    this.loadToast();

    this.apiService.getProfile().subscribe((profile) => {
      this.profile = profile;
      this.postForm = this.fb.group({
        username: [this.profile.data.user.username],
        birthday: [format(new Date(this.profile.data.user.birthday), 'yyyy-MM-dd')],
        address: [this.profile.data.user.address],
        email: [this.profile.data.user.email],
        phone: [this.profile.data.user.phone],
        role: [this.profile.data.user.role],
      });
    });
  };

  onUpdate(): void {
    if (this.postForm.valid) {
      const formData = new FormData();
      Object.keys(this.postForm.controls).forEach(key => {
        let value = this.postForm.get(key)?.value;
        formData.append(key, value);
      });
      const formDataObject = this.formDataToObject(formData);
      this.apiService.updateUser(formDataObject).subscribe({
        next: (data: any) => {
          this.setNoty(data["message"], "toast--success", 4000)
          setTimeout(() => {
            window.location.href = '/account-page';
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
    }
  };

  setNoty(message: string, classname: string, delay: any): void {
    localStorage.setItem('template', message)
    localStorage.setItem('classname', classname)
    localStorage.setItem('delay', delay)
    localStorage.setItem('msg', "Successfully.")
  };

  loadToast() {
    const template = localStorage.getItem('template');
    const classname = localStorage.getItem('classname');
    const delay = localStorage.getItem('delay');
    const msg = localStorage.getItem('msg') || "";
    if (template && classname && delay) {
      this.toastService.show({template, msg, classname, delay: Number(delay)});
      localStorage.removeItem('template')
      localStorage.removeItem('classname')
      localStorage.removeItem('delay')
      localStorage.removeItem('msg')
    }
  };

  formDataToObject(formData: FormData): any {
    const object: { [key: string]: any } = {};
    formData.forEach((value, key) => {
      object[key] = value;
    });
    return object;
  };

}
