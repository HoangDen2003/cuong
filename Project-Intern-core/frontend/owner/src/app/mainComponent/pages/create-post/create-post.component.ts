import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CustomUploadAdapter } from '../../custom-upload-adapter';
import { HttpClient } from '@angular/common/http';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFloppyDisk, faXmark } from '@fortawesome/free-solid-svg-icons';
import { CustomUploadImage } from '../../custom-upload-image';
import { TranslationService } from '../../shared/i18n/translation.service';
import { ToastsService } from '../../featrue/toasts/toasts.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  public Editor = ClassicEditor;
  postForm: FormGroup;
  categories: any[] = [];
  languages: any[] = [];
  selectedCategoryText = '--Choose category--';
  selectedLanguageText = '--Choose language--';
  previewUrl: string | ArrayBuffer | null = null;
  selectedTab: string = 'Vietnamese'; // Default selected tab
  userId = localStorage.getItem('user_id');
  languageIds: { [key: string]: string } = {};
  tabData: { [key: string]: { title: string, body: string } } = {
    Vietnamese: { title: '', body: '' },
    English: { title: '', body: '' },
    Chinese: { title: '', body: '' }
  };
  selectedFile: File | null = null;

  toastService = inject(ToastsService);

  faFloppyDisk = faFloppyDisk;
  faXmark = faXmark;
  locale: string = '';

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private http: HttpClient,
    private translate: TranslationService
  ) {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
      user_id: [this.userId],
      status: [true],
      file: [''],
      category_id: ['', Validators.required]
    });

    library.add(faFloppyDisk, faXmark);
  };

  ngOnInit(): void {
    this.locale = localStorage.getItem('locale') || 'en';
    this.translate.setDefaultLang(this.locale);
    
    this.fetchCategories();
    this.fetchLanguages();
  };

  onReady(editor: any): void {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
      return new CustomUploadAdapter(loader, this.http, 'http://localhost:3000/upload');
    };
  };

  fetchCategories(): void {
    this.apiService.getDataCategory().subscribe(response => {
      this.categories = response.data;
    });
  };

  fetchLanguages(): void {
    this.apiService.getDataLanguage().subscribe(response => {
      this.languages = response.data;
      this.languages.forEach(language => {
        this.languageIds[language.name] = language.id;
      });
      this.updateLanguageId();
    });
  };

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;
      };
      reader.readAsDataURL(file);
      this.selectedFile = file;
    }
  };

  async onCreate(): Promise<void> {
    this.saveCurrentTabData();
    if (this.postForm.valid) {
      const formData = await this.prepareFormData();
      const postData = this.formatPostData(formData);
      this.apiService.createPost(postData).subscribe({
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
    }
  };

  setNoty(message: string, classname: string, delay: any): void {
    localStorage.setItem('template', message)
    localStorage.setItem('classname', classname)
    localStorage.setItem('delay', delay)
    localStorage.setItem('msg', "Create successfully.")
  };

  async prepareFormData(): Promise<FormData> {
    const formData = new FormData();
    const file = this.selectedFile;
    if (file) {
      const customUploadImage = new CustomUploadImage(file, this.http, 'http://localhost:3000/upload');
      const fileUrl = await customUploadImage.uploadImage();
      formData.append('file', fileUrl);
    }
  
    formData.append('user_id', this.userId || '');
    formData.append('status', this.postForm.get('status')?.value);
    formData.append('category_id', this.postForm.get('category_id')?.value);
    return formData;
  };

  formatPostData(formData: FormData): any {
    const translations = Object.keys(this.tabData).map(tab => ({
      language_id: this.languageIds[tab],
      title: this.tabData[tab].title,
      body: this.tabData[tab].body
    }));

    return this.formDataToObject(formData, translations);
  };

  formDataToObject(formData: FormData, translations: { language_id: string, title: string, body: string }[]): any {
    const object: { [key: string]: any } = {};
    formData.forEach((value, key) => {
      object[key] = value;
    });
    object['translations'] = translations.map(t => ({
      language_id: t.language_id,
      title: t.title || '',
      body: t.body || ''
    }));
    return object;
  };

  selectTab(tab: string): void {
    this.saveCurrentTabData();
    this.selectedTab = tab;
    this.updateForm();
  };

  saveCurrentTabData(): void {
    this.tabData[this.selectedTab].title = this.postForm.get('title')?.value;
    this.tabData[this.selectedTab].body = this.postForm.get('body')?.value;
  };

  updateForm(): void {
    const data = this.tabData[this.selectedTab];
    this.postForm.patchValue({
      title: data.title,
      body: data.body
    });
  };

  updateLanguageId(): void {
    const languageId = this.languageIds[this.selectedTab] || '';
    this.postForm.get('language_id')?.setValue(languageId);
  };
}
