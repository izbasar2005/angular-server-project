import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';

// Интерфейс для ответа на регистрацию
interface RegisterResponse {
  message: string;
}

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Проверка незавершённых запросов
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should register a user', () => {
    const mockData = { username: 'test', password: 'test123' };
    const mockResponse: RegisterResponse = { message: 'User registered successfully' };

    // Вызов метода регистрации
    service.register(mockData).subscribe((response: any) => {  // Используем any, чтобы избежать ошибки типизации
      expect(response).toBeDefined();
      expect(response.message).toBe('User registered successfully'); // Проверка свойства message
    });

    const req = httpMock.expectOne('YOUR_API_URL/register');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });
});
