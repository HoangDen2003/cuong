import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { TranslationService } from 'src/app/shared/i18n/translation.service';
import { format } from 'date-fns';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
reponseDataPosts: any[] = [];
reponsePosts: any[] = [];
postsNews: any[] = [];
postsNewsFirst: any[] = [];
postsNewsSecond: any[] = [];
postsSport: any[] = [];
postsSportFirst: any[] = [];
postsSportSecond: any[] = [];
postsScience: any[] = [];
postsScienceFirst: any[] = [];
postsEntertaiment: any[] = [];
postsEntertaimentFirst: any[] = [];
postsEntertaimentSecond: any[] = [];
selectedLanguage: any = { locale: '', id: '' };

currentPage: number = 1;
totalPosts: number = 0;
totalPages: number = 0;
itemsPerPage: number = 10;

constructor(private apiService: ApiService,
  private route: ActivatedRoute,
  private sanitizer: DomSanitizer,
  private translate: TranslationService) { }

  ngOnInit(): void {
    this.selectedLanguage.locale = this.getLocaleFromLocalStorage() || 'vi';
    this.translate.setDefaultLang(this.selectedLanguage.locale);
    this.getData();
    this.getCategoryNews(1);
    this.getCategorySport(2);
    this.getCategoryScience(3);
    this.getCategoryEntertaiment(4);
  };

  getData(): void {
    this.apiService.getData().subscribe((response) => {
        this.reponsePosts = response.data,
        this.reponseDataPosts = this.reponsePosts.map((post) => ({
          ...post,
          formattedDate: format(new Date(post.createdAt), 'PP'),
          title: this.getTranslationData(post.translations).title,
        }))
        .filter(post => post.title !== 'No title available');
    });
  };

  getCategoryNews(categoryId: number, page: number = this.currentPage, perPage: number = this.itemsPerPage): void {
    this.apiService.getPostCategories(categoryId, page, perPage).subscribe((response) => {
      this.postsNews = response.data.posts.map((post: any) => ({
        ...post,
        formattedDate: format(new Date(post.createdAt), 'PP')
      }));
  
      this.postsNewsFirst = this.postsNews
        .filter((post: { translations: any[]; }) => this.getTranslationData(post.translations).title !== 'No title available')
        .slice(0, 1);
  
      this.postsNewsSecond = this.postsNews
        .filter((post: { translations: any[]; }) => this.getTranslationData(post.translations).title !== 'No title available')
        .slice(1, 3);
  
      this.totalPages = response.data.totalPages;
      this.totalPosts = this.postsNews.length;
    });
  };

  getCategorySport(categoryId: number, page: number = this.currentPage, perPage: number = this.itemsPerPage): void {
    this.apiService.getPostCategories(categoryId, page, perPage).subscribe((response) => {
      this.postsSport = response.data.posts.map((post: any) => ({
        ...post,
        formattedDate: format(new Date(post.createdAt), 'PP')
      }));
  
      this.postsSportFirst = this.postsSport
        .filter((post: { translations: any[]; }) => this.getTranslationData(post.translations).title !== 'No title available')
        .map((post: { translations: any[]; content: string; }) => {
          post.translations[0].body = this.removeFigureTags(post.translations[0].body);
          return post;
        })
        .slice(0, 1);
  
      this.postsSportSecond = this.postsSport
        .filter((post: { translations: any[]; }) => this.getTranslationData(post.translations).title !== 'No title available')
        .slice(1, 5);
  
      this.totalPages = response.data.totalPages;
      this.totalPosts = this.postsSport.length;
    });
  };

  getCategoryScience(categoryId: number, page: number = this.currentPage, perPage: number = this.itemsPerPage): void {
    this.apiService.getPostCategories(categoryId, page, perPage).subscribe((response) => {
      this.postsScience = response.data.posts;
      this.postsScienceFirst = this.postsScience.map((post: any) => ({
        ...post,
        formattedDate: format(new Date(post.createdAt), 'PP')
      }))
        .filter((post: { translations: any[]; }) => this.getTranslationData(post.translations).title !== 'No title available')
        .slice(0, 7);
  
      this.totalPages = response.data.totalPages;
      this.totalPosts = this.postsScience.length;
    });
  };

  getCategoryEntertaiment(categoryId: number, page: number = this.currentPage, perPage: number = this.itemsPerPage): void {
    this.apiService.getPostCategories(categoryId, page, perPage).subscribe((response) => {
      this.postsEntertaiment = response.data.posts.map((post: any) => ({
        ...post,
        formattedDate: format(new Date(post.createdAt), 'PP')
      }));
  
      this.postsEntertaimentFirst = this.postsEntertaiment
        .filter((post: { translations: any[]; }) => this.getTranslationData(post.translations).title !== 'No title available')
        .slice(0, 1);
  
      this.postsEntertaimentSecond = this.postsEntertaiment
        .filter((post: { translations: any[]; }) => this.getTranslationData(post.translations).title !== 'No title available')
        .slice(1, 3);
  
      this.totalPages = response.data.totalPages;
      this.totalPosts = this.postsEntertaiment.length;
    });
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
          languageName === 'No language available' && title !== 'No title available') {
          languageName = translations[i].language.name; }
        if(title !== 'No title available' && body !== this.sanitizer.bypassSecurityTrustHtml('<p>No content available</p>')) {
          break;
        }
      }
    }
    return { title, body, languageName };
  };

  removeFigureTags(content: string): string {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const figures = doc.getElementsByTagName('figure');
    while (figures.length > 0) {
      figures[0].parentNode?.removeChild(figures[0]);
    }
    return doc.body.innerHTML;
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
