import { TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';


fdescribe('RegisterComponent',()=>{
  fit('success',async()=>{
    const router = jasmine.createSpyObj('Router',['navigate'])
    await TestBed.configureTestingModule({
      imports:[FormsModule,RegisterComponent],
      providers:[{provide:Router,useValue:router}]
    }).compileComponents();

    const component = TestBed.createComponent(RegisterComponent).componentInstance;
    const data ={username:'alma',email:'alma@gmail.com',password:'1234',role:'user'};

    Object.assign(component,data);
    spyOn(component['http'],'post').and.returnValue(of({}));
    component.onRegister();

    expect(component['http'].post).toHaveBeenCalledWith('http://localhost:3000/register',data);
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
