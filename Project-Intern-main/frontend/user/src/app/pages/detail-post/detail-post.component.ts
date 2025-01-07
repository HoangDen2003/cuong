import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { format } from 'date-fns';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { TranslationService } from 'src/app/shared/i18n/translation.service';

@Component({
  selector: 'app-detail-post',
  templateUrl: './detail-post.component.html',
  styleUrls: ['./detail-post.component.css']
})
export class DetailPostComponent implements OnInit{
  post: any;
  formattedDate: any;
  reponsePosts: any[] = [];
  reponseDataPosts: any[] = [];
  reponDataPostsHeader: any[] = [];
  responseDataCategory: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  selectedLanguage: any = { locale: '', id: '' };

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private sanitizer: DomSanitizer,
    private translate: TranslationService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const postId = +params['id'];
      if (postId) {
        this.getPostDetails(postId);
      }
    });
    this.selectedLanguage.locale = this.getLocaleFromLocalStorage() || 'vi';
    this.translate.setDefaultLang(this.selectedLanguage.locale);
    this.getDataCategory();
    this.getData();
  };

  getLocaleFromLocalStorage(): string | null {
    const storedLocale = localStorage.getItem('locale');
    if (storedLocale) {
      const { locale } = JSON.parse(storedLocale);
      return locale;
    }
    return null;
  };

  getTranslationData(translations: any[]): { title: string, body: SafeHtml, languageName: string } {
    let title = 'No title available';
    let body: SafeHtml = this.sanitizer.bypassSecurityTrustHtml('<p>No content available</p>');
    let languageName = 'No language available';
  
    if (translations.length > 0) {
      for (let i = 0; i < translations.length; i++) {
        if(translations[i].title && title === 'No title available') title = translations[i].title;
        if(translations[i].body) body = this.sanitizer.bypassSecurityTrustHtml(translations[i].body);
        if(translations[i].language && translations[i].language.name &&
          languageName === 'No language available' &&
          title !== 'No title available') {
          languageName = translations[i].language.name; }
          if(title !== 'No title available' && body !== this.sanitizer.bypassSecurityTrustHtml('<p>No content available</p>') && languageName !== 'No language available') {
            break;
          }
      }
    }
    return { title, body, languageName };
  };

  getData(): void {
    this.apiService.getData().subscribe((response) => {
      this.reponsePosts = response.data;
      this.reponDataPostsHeader = this.reponsePosts.map((post) => ({
        ...post,
        title: this.getTranslationData(post.translations).title,
      }))
      .filter(post => post.title !== 'No title available')
      .slice(0, 3);
  
      this.reponseDataPosts = this.reponsePosts.map((post) => ({
        ...post,
        formattedDate: format(new Date(post.createdAt), 'PP'),
        title: this.getTranslationData(post.translations).title,
      }))
      .filter(post => post.title !== 'No title available');
    });
  };

  getDataCategory(): void {
    this.apiService.getDataCategory().subscribe((response) => {
      this.responseDataCategory = response.data;
    });
  };

  getPostDetails(postId: number): void {
    this.apiService.getPostDetails(postId).subscribe((response) => {
      this.post = response.data;
      console.log('post', this.post);
      this.formattedDate = format(new Date(response.data.createdAt), 'PP');
    });
  }

  getSanitizedHtml(body: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(body);
  }

}
