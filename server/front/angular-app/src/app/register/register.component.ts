import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';  // HttpClientModule импорттау

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],  // HttpClientModule қосылды
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  role: string = 'user';  // Default рольді орнату (мысалы, user)

  constructor(private http: HttpClient, private router: Router) {}

  onRegister() {
    const registerData = {
      username: this.username,
      email: this.email,
      password: this.password,
      role: "user"
    };
  
    console.log('Жіберілетін деректер:', registerData); // Логты қосу
  
    // Дебаггерді қосу
    debugger;
  
    this.http.post('http://localhost:3000/register', registerData).subscribe(
      response => {
        // Тіркелу сәтті болса ғана хабарламаны көрсетеміз
        console.log('Тіркелу сәтті болды:', response);
        this.router.navigate(['/login']);
      },

      error => {
        // Қате болғанда консольге шығару
        console.error('Тіркелу қатесі:', error);
      }
    );
  }
  
  
  
  
  
}
