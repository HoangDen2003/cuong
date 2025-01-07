import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { TranslationService } from 'src/app/shared/i18n/translation.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  responseDataCategory: any[] = [];
  selectedLanguage: any = { locale: '', id: '' };
  
  constructor( private apiService: ApiService,private translate: TranslationService) {}

  ngOnInit(): void {
    this.selectedLanguage.locale = this.getLocaleFromLocalStorage() || 'vi';
    this.translate.setDefaultLang(this.selectedLanguage.locale);
    this.getDataCategory();
  };

  getDataCategory(): void {
    this.apiService.getDataCategory().subscribe(response => {
      this.responseDataCategory = response.data;
    });
  };

  getLocaleFromLocalStorage(): string | null {
    const storedLocale = localStorage.getItem('locale');
    if (storedLocale) {
      const { locale } = JSON.parse(storedLocale);
      return locale;
    }
    return null;
  };
}
