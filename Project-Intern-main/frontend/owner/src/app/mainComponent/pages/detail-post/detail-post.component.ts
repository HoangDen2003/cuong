import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { TranslationService } from '../../shared/i18n/translation.service';

@Component({
  selector: 'app-detail-post',
  templateUrl: './detail-post.component.html',
  styleUrls: ['./detail-post.component.css']
})
export class DetailPostComponent implements OnInit {
  post: any;
  selectedTab = '0';
  locale: string = '';

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private sanitizer: DomSanitizer,
    private translate: TranslationService
  ) {}

  ngOnInit(): void {
    this.locale = localStorage.getItem('locale') || 'en';
    this.translate.setDefaultLang(this.locale);
    
    const postId = this.route.snapshot.paramMap.get('id');
    if (postId) {
      this.apiService.getPostDetails(Number(postId)).subscribe(response => {
        this.post = response.data;
        this.selectedTab = '0';
      });
    }
  }

  selectTab(tab: string): void {
    this.selectedTab = tab;
  }

  getSanitizedHtml(body: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(body);
  }
}
