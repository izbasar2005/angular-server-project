import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    if (!token) {
      // Возвращаем пустые заголовки, если токена нет
      return new HttpHeaders();
    }
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { headers: this.getAuthHeaders() }).pipe(
      catchError(this.handleError)  // Обработка ошибок
    );
  }

  addUser(user: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, user, { headers: this.getAuthHeaders() }).pipe(
      catchError(this.handleError)
    );
  }
  

  updateUser(id: string, updatedUser: any): Observable<any> {
  return this.http.put<any>(`${this.apiUrl}/${id}`, updatedUser, { headers: this.getAuthHeaders() })
    .pipe(catchError(this.handleError));  // Обработка ошибок
}

  deleteUser(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() }).pipe(
      catchError(this.handleError)  // Обработка ошибок
    );
  }

  // Метод для обработки ошибок
  private handleError(error: any): Observable<never> {
    console.error('Произошла ошибка:', error);
    throw error; // Можно расширить, чтобы обрабатывать ошибки более подробно (например, показывать сообщения пользователю)
  }
}
