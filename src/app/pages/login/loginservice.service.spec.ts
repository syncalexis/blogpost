import { HttpClientTestingModule } from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { HttpServiceService } from 'src/app/services/http-service.service';

import { LoginserviceService } from './loginservice.service';

describe('LoginserviceService', () => {
  let service: LoginserviceService;
  let testService: HttpServiceService
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,RouterTestingModule],
      providers: [HttpServiceService],
    });
    service = TestBed.inject(LoginserviceService);
    testService = TestBed.inject(HttpServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should be able to call Blog List with return values ', fakeAsync(() => {
    let data = [
      {
        id: 1, createdAt: "sample heading", name: "sample heading" , avatar : 'sample content' , token: 'sample Author',username:'admin1',password:'admin'
      }
    ]
    let customerSpy = spyOn(testService, 'get').and.returnValue(of(data));
    service.loginUser();
    tick(2000);
    expect(customerSpy).toHaveBeenCalled();
  }));
});
