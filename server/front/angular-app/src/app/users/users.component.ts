import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { FormsModule } from '@angular/forms'; // Импорт FormsModule
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common'; // Импорт CommonModule
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: true,  // Если используете standalone компонент
  imports: [FormsModule, CommonModule],  // Добавьте CommonModule и FormsModule
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  currentName = '';
  currentEmail = '';
  currentPassword = '';
  currentRole = 'user';
  editMode: string | null = null;
  userRole: string | null = null;

  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUsers();
    this.userRole = this.authService.getUserRole();
  }

  loadUsers(): void {
    this.usersService.getUsers().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.error('Error loading users', error);
      }
    );
  }

  startEdit(user: any): void {
    this.editMode = user._id;
    this.currentName = user.username;
    this.currentEmail = user.email;
    this.currentPassword = ''; // Не редактируем пароль
    this.currentRole = user.role; // Подставляем текущую роль
  }

  saveUser(): void {
    const name = this.currentName.trim();
    if (!name) return;

    if (this.editMode) {
      // Редактировать существующего пользователя
      const updatedUser = { username: name, email: this.currentEmail.trim(), role: this.currentRole };
      
      this.usersService.updateUser(this.editMode, updatedUser).subscribe(
        () => {
          this.loadUsers();
          this.resetForm();
        },
        (error) => {
          console.error('Error updating user', error);
        }
      );
    } else {
      // Добавить нового пользователя
      const email = this.currentEmail.trim();
      const password = this.currentPassword.trim();
      const role = this.currentRole;

      if (!email || !password) {
        alert('Email мен парольді толтырыңыз');
        return;
      }

      const newUser = { username: name, email, password, role };

      this.usersService.addUser(newUser).subscribe(
        () => {
          this.loadUsers();
          this.resetForm();
        },
        (error) => {
          console.error('Error adding user', error);
        }
      );
    }
  }

  deleteUser(user: any): void {
    if (confirm('Вы уверены, что хотите удалить пользователя?')) {
      this.usersService.deleteUser(user._id).subscribe(
        () => {
          this.loadUsers();
        },
        (error) => {
          console.error('Error deleting user', error);
        }
      );
    }
  }

  resetForm(): void {
    this.currentName = '';
    this.currentEmail = '';
    this.currentPassword = '';
    this.currentRole = 'user';
    this.editMode = null;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
