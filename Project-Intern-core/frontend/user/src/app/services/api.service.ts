import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService { 
  private apiUrl = 'http://localhost:3000';
  
  selectedLanguage: any = { locale: '', id: '' };
  
  constructor(private http: HttpClient) {}


  getLocaleFromLocalStorage(): string | null {
    const storedLocale = localStorage.getItem('locale');
    if (storedLocale) {
      const { id } = JSON.parse(storedLocale);
      return id;
    }
    return null;
  };

  getPostCategories(categoryId: number, page: number = 1, perPage: number = 10): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('perPage', perPage.toString());
    this.selectedLanguage.id = this.getLocaleFromLocalStorage() || '1';
    return this.http.get<any>(`${this.apiUrl}/category/${categoryId}?languageId=${this.selectedLanguage.id}`, { params });
  };

  getDataCategory(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/category`);
  };

  getDataLanguage(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/language`);
  };

  getPostDetails(postId: number): Observable<any> {
    this.selectedLanguage.id = this.getLocaleFromLocalStorage() || '1';
    return this.http.get<any>(`${this.apiUrl}/${postId}?languageId=${this.selectedLanguage.id}`);
  };

  getData(): Observable<any> {
    this.selectedLanguage.id = this.getLocaleFromLocalStorage() || '1';
    return this.http.get<any>(`${this.apiUrl}/index?languageId=${this.selectedLanguage.id}`);
  };
}
