import { HttpClientTestingModule } from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { HttpServiceService } from 'src/app/services/http-service.service';

import { HomeService } from './home.service';

describe('HomeService', () => {
  let service: HomeService;
  let testService: HttpServiceService
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
    });
    service = TestBed.inject(HomeService);
    testService = TestBed.inject(HttpServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be able to call Blog List with return values ', fakeAsync(() => {
    let data = [
      {
        id: 1, heading: "sample heading", createdAt: new Date(), content: 'sample content', Author: 'sample Author',
      },
      {
        id: 2, heading: "sample heading", createdAt: new Date(), content: 'sample content', Author: 'sample Author',
      }

    ]
    let customerSpy = spyOn(testService, 'get').and.returnValue(of(data));
    let params = {
      search: ''
    }
    service.getBlogs(params);
    tick(2000);
    expect(customerSpy).toHaveBeenCalled();
  }));

  it('should be able to call Blog details with return values ', fakeAsync(() => {
    let id = 1;
    let data =
    {
      id: 1, heading: "sample heading", createdAt: new Date(), content: 'sample content', Author: 'sample Author',
    };
    let customerSpy = spyOn(testService, 'get').and.returnValue(of(data));
    service.getBlogdetails(id);
    tick(2000);
    expect(customerSpy).toHaveBeenCalled();
  }));

  it('should be able to call add blog with return values ', fakeAsync(() => {
    let data =
    {
      id: 1, heading: "sample heading", createdAt: new Date(), content: 'sample content', Author: 'sample Author',
    };
    let customerSpy = spyOn(testService, 'post').and.returnValue(of(data));
    service.addBlogs(data);
    tick(2000);
    expect(customerSpy).toHaveBeenCalled();
  }));


  it('should be able to call updated blog with return values ', fakeAsync(() => {
    let id: any = 1;
    let data: any =
    {
      id: 1, heading: "sample heading", createdAt: new Date(), content: 'sample content', Author: 'sample Author',
    };
    let customerSpy = spyOn(testService, 'put').and.returnValue(of(data));
    service.updateBlog(data, id);
    tick(2000);
    expect(customerSpy).toHaveBeenCalled();
  }));

  it('should be able to call delete blog with return values ', fakeAsync(() => {
    let id: any = 1;
    let data: any =
    {
      id: 1, heading: "sample heading", createdAt: new Date(), content: 'sample content', Author: 'sample Author',
    };
    let customerSpy = spyOn(testService, 'delete').and.returnValue(of(data));
    service.deleteBlogs(id);
    tick(2000);
    expect(customerSpy).toHaveBeenCalled();
  }));
});
