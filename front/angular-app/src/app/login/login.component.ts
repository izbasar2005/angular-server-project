import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onLogin() {
    const loginData = {
      email: this.email,
      password: this.password
    };
  
    this.http.post<any>('http://localhost:3000/login', loginData, {
      headers: { 'Content-Type': 'application/json' }
    }).subscribe({
      next: (response) => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          this.router.navigate(['/users']);
        } else {
          this.errorMessage = 'Логин немесе пароль қате';
        }
      },
      error: (error) => {
        this.errorMessage = 'Қате: ' + (error.error?.message || 'Логин мүмкін болмады');
      }
    });
  }
}
