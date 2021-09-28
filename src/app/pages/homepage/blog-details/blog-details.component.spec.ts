import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, discardPeriodicTasks, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentLoaderFactory } from 'ngx-bootstrap/component-loader';
import { BsModalService } from 'ngx-bootstrap/modal';
import { PositioningService } from 'ngx-bootstrap/positioning';
import { of } from 'rxjs';
import Swal from 'sweetalert2';
import { HomeService } from '../home.service';
import { HomepageComponent } from '../homepage/homepage.component';

import { BlogDetailsComponent } from './blog-details.component';
const mockActivatedRoute = { 
  parent: { 
    paramMap: of(convertToParamMap(
        { id: '1' }
    ))}
};
describe('BlogDetailsComponent', () => {
  let component: BlogDetailsComponent;
  let fixture: ComponentFixture<BlogDetailsComponent>;
  let testService: HomeService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogDetailsComponent ],
      imports: [RouterTestingModule.withRoutes(
        [{path: 'home', component: HomepageComponent}]
      ), HttpClientTestingModule],
      providers: [FormBuilder, BsModalService, ComponentLoaderFactory, PositioningService,Swal,
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: {get:(id:number)=>{id:1}}}}
      }
      ]
    
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogDetailsComponent);
    component = fixture.componentInstance;
    testService = TestBed.inject(HomeService);
    fixture.detectChanges();
  });
  

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to call Blog Details with return values ', fakeAsync(() => {
    let data =  {
        id: 1, heading: "sample heading", createdAt: new Date() , content : 'sample content' , Author: 'sample Author',
      };
    let customerSpy = spyOn(testService, 'getBlogdetails').and.returnValue(of(data));
    component.getBlogDetails();
    fixture.detectChanges();
    tick(2000);
    expect(customerSpy).toHaveBeenCalled();
    expect(component.blog).toBeDefined();
    expect(component.blog).toEqual(data);
    flush();
    discardPeriodicTasks()
  }));

  it('should show blog  modal ', fakeAsync(() => {
    fixture.detectChanges();
    expect(document.querySelector('#text-node')).toBeNull;
    tick(50);
    const modalSpy = spyOn(component, 'updateBlog').and.callThrough();
    fixture.detectChanges();
    const button: HTMLButtonElement = fixture.debugElement.nativeElement.querySelector('#update_post');
    button.dispatchEvent(new Event("click"));
    fixture.detectChanges();
    tick(250);
    spyOn(component.modalRef.content, 'onClose').and.returnValue(of('success'));
    expect(modalSpy).toHaveBeenCalledWith();
    expect(component.modalRef.content.closeBtnName).toEqual('Close');
    flush();
    discardPeriodicTasks()
  }));

  it('should be able to delete', fakeAsync(() => {
    let data =  {
      id: 1, heading: "sample heading", createdAt: new Date() , content : 'sample content' , Author: 'sample Author',
    };
    component.blog = { id: 1, heading: "sample heading", createdAt: new Date() , content : 'sample content' , Author: 'sample Author'};
    let customerSpy = spyOn(testService, 'deleteBlogs').and.returnValue(of(data));
    spyOn(component, "delete").and.callThrough();
    const button: HTMLButtonElement = fixture.debugElement.nativeElement.querySelector('#deletePost');
    button.dispatchEvent(new Event('click'));
    Swal.clickConfirm();
    fixture.detectChanges();
    tick(250);
    expect(customerSpy).toHaveBeenCalled();
    expect(Swal.isVisible).toBeTruthy();
    flush();
    discardPeriodicTasks()
  }));

  

});
