import { TestBed,getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpServiceService } from './http-service.service';
import { HttpResponse } from '@angular/common/http';

describe('HttpServiceService', () => {
  let service: HttpServiceService;
  let injector: TestBed;
  let httpMock: HttpTestingController;
  let mockUrl = 'https://61505fb2a706cd00179b742d.mockapi.io'
  beforeEach(() => {
      let injector: TestBed;
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,RouterTestingModule],
      providers: [HttpServiceService],
    });
    service = TestBed.inject(HttpServiceService);
    injector = getTestBed();
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); //Verifies that no requests are outstanding.
  });

  describe('get method', () => {
    let expectedEmps:any;

    beforeEach(() => {
      //Dummy data to be returned by request.
      expectedEmps = [
        { id: 101, name: 'Krishna' },
        { id: 102, name: 'Arjun' },
      ] as any;
    });
  

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

      //Test case 1
      it('should return expected data by calling once', () => {
        service.get(mockUrl).subscribe(
          emps => expect(emps).toEqual(expectedEmps, 'should return expected Data'),
          fail
        );
  
        const req = httpMock.expectOne(mockUrl);
        expect(req.request.method).toEqual('GET');
        req.flush(expectedEmps); //Return expectedEmps
      });

      it('should be OK returning 0 data', () => {
        service.get(mockUrl).subscribe(
          emps => expect(emps.length).toEqual(0, 'should have empty employee array'),
          fail
        );
  
        const req = httpMock.expectOne(mockUrl);
        req.flush([]); //Return empty data
      });


      it('should add an data and return it', () => {
        const newData: any = { name: 'Mahesh', age: 25 };
    
        service.post(mockUrl,newData).subscribe(
          (data: any) => expect(data).toEqual(newData, 'should return the data'),
          fail
        );
    
        // addEmploye should have made one request to POST employee
        const req = httpMock.expectOne(mockUrl);
        expect(req.request.method).toEqual('POST');
        expect(req.request.body).toEqual(newData);
    
        // Expect server to return the employee after POST
        const expectedResponse = new HttpResponse({ status: 201, statusText: 'Created', body: newData });
        req.event(expectedResponse);
      });
  
      it('should update an data and return it', () => {
        const newData: any = { name: 'Mahesh', age: 25 };
        
        service.put(mockUrl,newData).subscribe(
          (data: any) => expect(data).toEqual(newData, 'should return the data'),
          fail
        );
    
        // addEmploye should have made one request to POST employee
        const req = httpMock.expectOne(mockUrl);
        expect(req.request.method).toEqual('PUT');
        expect(req.request.body).toEqual(newData);
    
        // Expect server to return the employee after POST
        const expectedResponse = new HttpResponse({ status: 201, statusText: 'Created', body: newData });
        req.event(expectedResponse);
      });

      it('should update an data and return it', () => {
        const deleteData: any = { name: 'Mahesh', age: 25 };
        
        service.delete(mockUrl).subscribe(
          (data: any) => expect(data).toEqual(deleteData, 'should return the data'),
          fail
        );
    
        // addEmploye should have made one request to POST employee
        const req = httpMock.expectOne(mockUrl);
        expect(req.request.method).toEqual('DELETE');
  
        // Expect server to return the employee after POST
        const expectedResponse = new HttpResponse({ status: 201, statusText: 'Deleted', body: deleteData });
        req.event(expectedResponse);
      });

});
  });