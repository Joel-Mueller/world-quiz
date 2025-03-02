import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private apiUrl = 'http://localhost:3000';
  private tokenKey = 'auth_token';

  constructor(private http: HttpClient) {}

  public login(username: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { username, password }).pipe(
      tap(response => {
        localStorage.setItem(this.tokenKey, response.token);
      })
    );
  }

  public register(username: string, password: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.apiUrl}/register`, { username, password });
  }

  public logOut(): void {
    localStorage.removeItem(this.tokenKey);
  }

  public isLoggedIn(): boolean {
    return this.isTokenValid();
  }

  public getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private isTokenValid(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      const decoded: any = jwtDecode(token);
      return decoded.exp > Math.floor(Date.now() / 1000);
    } catch (error) {
      return false;
    }
  }

  public validateToken(): Observable<{ valid: boolean, username: string }> {
    return this.http.get<{ valid: boolean, username: string }>(`${this.apiUrl}/validate-token`).pipe(
      tap(response => {
        if (!response.valid) {
          this.logOut();
        }
      })
    );
  }
}
