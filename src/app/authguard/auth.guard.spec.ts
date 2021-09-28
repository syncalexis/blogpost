import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from '../pages/login/login.component';

import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let injector: TestBed;
  let routeMock: any = { snapshot: {}};
  let routeStateMock: any = { snapshot: {}, url: '/login'};
  let routerMock = {navigate: jasmine.createSpy('navigate')}

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(
        [{path: 'login', component: LoginComponent}]
      ),],
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should redirect an unauthenticated user to the login route', () => {
    localStorage.removeItem('token');
    expect(guard.canActivate(routeMock, routeStateMock)).toEqual(false);
  });

  it('should allow the authenticated user to access app', () => {
    localStorage.setItem('token','mock token');
    expect(guard.canActivate(routeMock, routeStateMock)).toEqual(true);
  });

});
