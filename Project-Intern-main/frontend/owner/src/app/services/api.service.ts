import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService implements CanActivate {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient, private router: Router) { }

  private getHeaders(): HttpHeaders {
    const accessToken = localStorage.getItem('access_token');
    return new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`
    });
  };

  canActivate(): boolean {
    if (localStorage.getItem('user_id')) {
      return true;
    } else {
      this.router.navigate(['/auth/login']);
      return false;
    }
  }

  getData(Keyword: string, CategoryId: number, Status: string ,page: number = 1, perPage: number = 10): Observable<any> {
    const userId = localStorage.getItem('user_id');
    const headers = this.getHeaders();
    const keyword = Keyword ? Keyword : '';
    const categoryId = CategoryId ? CategoryId : '';
    const status = Status ? Status : '';
    let params = new HttpParams()
      .set('keyword', keyword)
      .set('categoryId', categoryId)
      .set('status', status)
      .set('page', page.toString())
      .set('perPage', perPage.toString());
  
    return this.http.get<any>(`${this.apiUrl}/post/user/${userId}`, { headers, params });
  };

  getDataLanguage(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/language`);
  };

  getDataCategory(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/category`);
  };

  getPostDetails(postId: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.apiUrl}/post/${postId}`, { headers });
  };

  createPost(formData: string): Observable<any> { // Changed type to any
    const headers = this.getHeaders();
    return this.http.post<any>(`${this.apiUrl}/post/create`, { formData }, { headers });
  };

  updatePost(postId: number, formData: string): Observable<any> { // Changed type to any
    const headers = this.getHeaders();
    return this.http.put<any>(`${this.apiUrl}/post/update/${postId}`, { formData }, { headers });
  };

  deletePost(formData: number[]): Observable<any> {
    const headers = this.getHeaders();
    const options = {
      headers: headers,
      body: { formData }
    };
    return this.http.delete<any>(`${this.apiUrl}/post/delete`, options);
  };

  updateCategory(formData: number[]): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/post/update-multiple`, { formData });
  };

  updateLanguage(formData: number[]): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/post/update-multiple`, { formData });
  };

  updateStatus(formData: number[]): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/post/update-multiple`, { formData });
  };

  getProfile(): Observable<any> {
    const userId = localStorage.getItem('user_id');
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.apiUrl}/user/${userId}`, { headers });
  };

  updateUser(formData: string): Observable<any> {
    const userId = localStorage.getItem('user_id');
    const headers = this.getHeaders();
    return this.http.put<any>(`${this.apiUrl}/user/update/${userId}`, { formData }, { headers });
  };
}
