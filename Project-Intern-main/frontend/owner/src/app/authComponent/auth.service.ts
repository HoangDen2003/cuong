import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

interface AuthResponse {
  access_token: string;
  refresh_token: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth';

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/sign-in`, { email, password })
      .pipe(
        tap(response => {
          if (response && response.data) {
            this.storeTokens(response.data);
          } else {
            console.error('Invalid response structure:', response);
          }
        })
      );
  };

  private storeTokens(tokens: AuthResponse) {
    if (tokens && tokens.access_token && tokens.refresh_token && tokens.user.id) {
      localStorage.setItem('access_token', tokens.access_token);
      localStorage.setItem('refresh_token', tokens.refresh_token);
      localStorage.setItem('user_id', tokens.user.id.toString());
    } else {
      console.error('Tokens received from API are invalid:', tokens);
    }
  };

  register(username: string, email: string, password: string, confirmPassword: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/sign-up`, { username, email, password, confirmPassword });
  };

  resetPassword(email: string, password: string, confirmPassword: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/reset-password`, { email, password, confirmPassword });
  };

  forgotPassword( email: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/forgot-password`, { email });
  };
  
  checkOtpMail(email: string, otp: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/check-otp-mail`, { email, otp });
  };
}
