import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersComponent } from './users.component';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});























































// constructor(private router: Router) {}

//   canActivate(): boolean {
//     const token = localStorage.getItem('token');
//     if (token) {
//       return true;
//     } else {
//       this.router.navigate(['/login']);
//       return false;
//     }
//   }