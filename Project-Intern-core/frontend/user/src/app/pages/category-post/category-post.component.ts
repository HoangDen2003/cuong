import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { format } from 'date-fns';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { TranslationService } from 'src/app/shared/i18n/translation.service';

@Component({
  selector: 'app-category-post',
  templateUrl: './category-post.component.html',
  styleUrls: ['./category-post.component.css']
})
export class CategoryPostComponent implements OnInit {
  reponseDataPosts: any[] = [];
  reponsePosts: any[] = [];
  posts: any[] = [];
  selectedLanguage: any = { locale: '', id: '' };

  currentPage: number = 1;
  totalPosts: number = 0;
  totalPages: number = 0;
  itemsPerPage: number = 10;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private translate: TranslationService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const categoryId = +params['id'];
      if (categoryId) {
        this.getCategoryPosts(categoryId);
      }
    });

    this.selectedLanguage.locale = this.getLocaleFromLocalStorage() || 'vi';
    this.translate.setDefaultLang(this.selectedLanguage.locale);
    this.getData();
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

  getLocaleFromLocalStorage(): string | null {
    const storedLocale = localStorage.getItem('locale');
    if (storedLocale) {
      const { locale } = JSON.parse(storedLocale);
      return locale;
    }
    return null;
  };

  getSanitizedHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.route.params.subscribe(params => {
      const categoryId = +params['id'];
      this.getCategoryPosts(categoryId, this.currentPage, this.itemsPerPage);
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

  getCategoryPosts(categoryId: number, page: number = this.currentPage, perPage: number = this.itemsPerPage): void {
    this.apiService.getPostCategories(categoryId, page, perPage).subscribe((response) => {
      this.posts = response.data.posts
        .map((post: { translations: any[]; content: string; }) => {
          post.translations[0].body = this.removeFigureTags(post.translations[0].body);
          return post;
        })
        .filter((post: { translations: any[]; }) => this.getTranslationData(post.translations).title !== 'No title available');
      this.totalPages = response.data.totalPages;
      this.totalPosts = this.posts.length;
    });
  };
  
  removeFigureTags(content: string): string {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const figures = doc.getElementsByTagName('figure');
    while (figures.length > 0) {
      figures[0].parentNode?.removeChild(figures[0]);
    }

    const pictures = doc.getElementsByTagName('picture');
    while (pictures.length > 0) {
      pictures[0].parentNode?.removeChild(pictures[0]);
    }

    return doc.body.innerHTML;
  };
}
