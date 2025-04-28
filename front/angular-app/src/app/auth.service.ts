import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private API = 'http://localhost:3000';

  register(data: any) {
  return this.http.post(`${this.API}/register`, data);
}


login(data: any) {
  return this.http.post(`${this.API}/login`, data);
}

saveToken(token: string) {
  localStorage.setItem('token', token);
}

getToken(): string | null {
  return localStorage.getItem('token');
}

logout() {
  localStorage.removeItem('token');
}

isLoggedIn(): boolean {
  return !!this.getToken();
}

getUserRole(): string | null {
  const token = this.getToken();
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.role;
  } catch {
    return null;
  }
}

}
