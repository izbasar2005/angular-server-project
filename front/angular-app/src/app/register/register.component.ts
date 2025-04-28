import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';  // HttpClientModule импорттау
import e, { response } from 'express';
// http://localhost:3000/login

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
  role: string = 'user';  

  constructor(private http: HttpClient, private router: Router) {}


  onRegister(){
    const registerData={
      username:this.username,
  email: this.email,
  password: this.password,
  role:'user' 
    }

  console.log('data user:',registerData)
  debugger;

  this.http.post('http://localhost:3000/register',registerData).subscribe(
    response =>{
      console.log('Satti otti',response),
      this.router.navigate(['/login']);
    },
    
     error =>{
      console.error(error);
    }
  )

  }
  
  
  
  
  
  
}
