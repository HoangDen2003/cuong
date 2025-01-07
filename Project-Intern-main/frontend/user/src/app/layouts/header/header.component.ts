import { Component, OnInit } from '@angular/core';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from 'src/app/services/api.service';
import { TranslationService } from 'src/app/shared/i18n/translation.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  faGlobe = faGlobe;
  responseDataCategory: any[] = [];
  isMenuOpen: boolean = false;
  activeCategoryId: number | null = null;
  languages: any[] = [];
  icActive: boolean = false;
  selectedLanguage: any = { locale: '', id: '' };

  constructor(
    private apiService: ApiService,
    private translate: TranslationService
  ) {
    library.add(faGlobe);
  };

  ngOnInit(): void {
    this.getDataCategory();
    this.getDataLanguage();
    this.selectedLanguage.locale = this.getLocaleFromLocalStorage() || 'vi';
    this.translate.setDefaultLang(this.selectedLanguage.locale);
    this.selectedLanguage = this.languages.find(language => language.locale === this.selectedLanguage.locale) || {};
  };

  onTouchOn(): void {
    this.isMenuOpen = !this.isMenuOpen;
  };

  onCloseMenu(): void {
    this.isMenuOpen = false;
  };

  setActiveCategory(categoryId: number | null): void {
    this.activeCategoryId = categoryId;
  };

  getDataCategory(): void {
    this.apiService.getDataCategory().subscribe(response => {
      this.responseDataCategory = response.data;
    });
  };

  getDataLanguage(): void {
    this.apiService.getDataLanguage().subscribe(
      response => {
        if (Array.isArray(response.data)) {
          this.languages = response.data;
          const locale = this.getLocaleFromLocalStorage();
          this.selectedLanguage = this.languages.find(language => language.locale === locale) || this.languages[0];
        } else {
          this.languages = [];
        }
      },
      error => {
        console.error('Failed to fetch languages:', error);
      }
    );
  };

  getLocaleFromLocalStorage(): string | null {
    const storedLocale = localStorage.getItem('locale');
    if (storedLocale) {
      const { locale } = JSON.parse(storedLocale);
      return locale;
    }
    return null;
  };

  onLanguageChange(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    const [locale, id] = selectedValue.split(',');

    this.selectedLanguage = { locale, id };
    this.translate.switchLang(locale);
    localStorage.setItem('locale', JSON.stringify({ locale, id }));
    window.location.reload();
  };
}
