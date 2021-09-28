import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, discardPeriodicTasks, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentLoaderFactory } from 'ngx-bootstrap/component-loader';
import { BsModalService } from 'ngx-bootstrap/modal';
import { PositioningService } from 'ngx-bootstrap/positioning';
import { of } from 'rxjs';
import { HomepageComponent } from '../homepage/homepage/homepage.component';

import { LoginComponent } from './login.component';
import { LoginserviceService } from './loginservice.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let testService: LoginserviceService
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [RouterTestingModule.withRoutes(
        [{path: 'home', component: HomepageComponent}]
      ), HttpClientTestingModule],
      providers: [FormBuilder, BsModalService, ComponentLoaderFactory, PositioningService],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    testService = TestBed.inject(LoginserviceService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('check initial login form values', fakeAsync(() => {
    fixture.detectChanges();
    component.ngOnInit();
    const loginFormGroup = component.loginForm;
    const formValues = {
      username: '',
      password: '',
    };
    loginFormGroup.patchValue({
      username: '',
      password: '',
    })
    fixture.detectChanges();
    expect(loginFormGroup.value).toEqual(formValues);
  }));

  it('should have a form validation', fakeAsync(() => {
    let loginFormGroup = component.loginForm;
    loginFormGroup.controls['username'].setValue('admin1');
    loginFormGroup.controls['password'].setValue('admin');
    fixture.detectChanges();
    expect(component.loginForm.valid).toBeTrue();
  }));

  it('should have a form validation', fakeAsync(() => {
    let loginFormGroup = component.loginForm;
    loginFormGroup.controls['username'].setValue('');
    loginFormGroup.controls['password'].setValue('');
    fixture.detectChanges();
    expect(component.loginForm.invalid).toBeTrue();
  }));

  it('should not be able to login if wrong credentials', fakeAsync(() => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    let loginFormGroup = component.loginForm;
    loginFormGroup.controls['username'].setValue('admin2');
    loginFormGroup.controls['password'].setValue('admin');
    let data =  [
      {
        id: 1, createdAt: "sample heading", name: "sample heading" , avatar : 'sample content' , token: 'sample Author',username:'admin1',password:'admin'
      }
    ];
    let customerSpy = spyOn(testService, 'loginUser').and.returnValue(of(data));
    component.login();
    fixture.detectChanges();
    tick(2000);
    expect(customerSpy).toHaveBeenCalled();
    expect(localStorage.getItem('user')).toBeNull();
    expect(localStorage.getItem('token')).toBeNull();
    expect(component.isLoading).toBeFalse();
    flush();
    discardPeriodicTasks()
  }));

  it('should be able to login', fakeAsync(() => {
    let loginFormGroup = component.loginForm;
    loginFormGroup.controls['username'].setValue('admin1');
    loginFormGroup.controls['password'].setValue('admin');
    let data =  [
      {
        id: 1, createdAt: "sample heading", name: "sample heading" , avatar : 'sample content' , token: 'sample Author',username:'admin1',password:'admin'
      }
    ];
    let customerSpy = spyOn(testService, 'loginUser').and.returnValue(of(data));
    component.login();
    fixture.detectChanges();
    tick(2000);
    expect(customerSpy).toHaveBeenCalled();
    expect(localStorage.getItem('user')).toBeTruthy();
    expect(localStorage.getItem('token')).toBeTruthy();
    expect(component.isLoading).toBeFalse();
    flush();
    discardPeriodicTasks()
  }));



});
