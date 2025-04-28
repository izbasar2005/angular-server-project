import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';

import { LoginComponent } from './app/login/login.component';
import { RegisterComponent } from './app/register/register.component';
import { WelcomeComponent } from './app/welcome/welcome.component';
import { ProtectedComponent } from './app/protected/protected.component';
import { UsersComponent } from './app/users/users.component';
import { AuthGuard } from './app/guards/auth.guard'; // Guard қосу керек

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter([
      { path: '', component: WelcomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'protected', component: ProtectedComponent, canActivate: [AuthGuard] },
      { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
      { path: '**', redirectTo: '' }
    ]),
    AuthGuard  // Добавить AuthGuard в провайдеры
  ]
});












// fdescribe('RegisterComponent',()=>{
//   fit('success',async()=>{
//     const router = jasmine.createSpyObj('Router',['navigate'])
//     await TestBed.configureTestingModule({
//         imports:[FormsModule,RegisterComponent],
//         providers:[{provide:Router,useValue:router}]
//     }).compileComponents();

//     const component = TestBed.createComponent(RegisterComponent).componentInstance;
//     const data ={username:'alma',email:'alma@gmail.com',password:'1234',role:'user'};

//     Object.assign(component, data);
//     spyOn(component['http'], 'post').and.returnValue(of({}));
//     component.onRegister();

//     expect(component['http'].post).toHaveBeenCalledWith('http://localhost:3000/register', data);
//     expect(router.navigate).toHaveBeenCalledWith(['/login']);
//   });
// });




































