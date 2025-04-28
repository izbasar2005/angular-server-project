import { TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';

fdescribe('RegisterComponent', () => {
  fit('should register and navigate', async () => {
    const router = jasmine.createSpyObj('Router', ['navigate']);
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule, RegisterComponent],
      providers: [{ provide: Router, useValue: router }]
    }).compileComponents();

    const component = TestBed.createComponent(RegisterComponent).componentInstance;
    const data = { username: 'testuser', email: 'test@test.com', password: 'password123', role: 'user' };

    Object.assign(component, data);
    spyOn(component['http'], 'post').and.returnValue(of({}));
    component.onRegister();

    expect(component['http'].post).toHaveBeenCalledWith('http://localhost:3000/register', data);
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
