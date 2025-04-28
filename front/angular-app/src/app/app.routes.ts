import { Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProtectedComponent } from './protected/protected.component';
import { UsersComponent } from './users/users.component';
import { AuthGuard } from './guards/auth.guard';  // Убедитесь, что ваш AuthGuard правильно настроен


export const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'protected', component: ProtectedComponent, canActivate: [AuthGuard] },  // Защищенный путь
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },  // Защищенный путь
  { path: '**', redirectTo: '' }  // Редирект на главную страницу, если путь не найден
];
