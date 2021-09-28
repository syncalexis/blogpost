import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentLoaderFactory } from 'ngx-bootstrap/component-loader';
import { BsModalService } from 'ngx-bootstrap/modal';
import { PositioningService } from 'ngx-bootstrap/positioning';
import { of } from 'rxjs';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { BannerNavigationComponent } from 'src/app/shared/banner-navigation/banner-navigation.component';
import { HomeService } from '../home.service';
import { HomepageComponent } from './homepage.component';
const mockBlogList:any = []

describe('HomepageComponent', () => {
  let component: HomepageComponent;
  let fixture: ComponentFixture<HomepageComponent>;
  let testService: HomeService
  let mockList = mockBlogList;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomepageComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [FormBuilder, BsModalService, ComponentLoaderFactory, PositioningService,BannerNavigationComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageComponent);
    component = fixture.componentInstance;
    testService = TestBed.inject(HomeService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to call Blog List with return values ', fakeAsync(() => {
    let data = [
      {
        id: 1, heading: "sample heading", createdAt: new Date() , content : 'sample content' , Author: 'sample Author',
      },
      {
        id: 2, heading: "sample heading", createdAt: new Date() , content : 'sample content' , Author: 'sample Author',
      }
    
  ]
    let customerSpy = spyOn(testService, 'getBlogs').and.returnValue(of(data));
    component.getBlogs();
    fixture.detectChanges();
    tick(2000);
    expect(customerSpy).toHaveBeenCalled();
    expect(component.blogs).toBeDefined();
    expect(component.blogs).toEqual(data);
    expect(component.isEmpty).toBeFalse();
    expect(component.isLoading).toBeFalse();
  }));

  it('should be able to call Blog List with no return values ', fakeAsync(() => {
    let data:any = []
    let customerSpy = spyOn(testService, 'getBlogs').and.returnValue(of(data));
    component.getBlogs();
    fixture.detectChanges();
    tick(2000);
    expect(customerSpy).toHaveBeenCalled();
    expect(component.blogs).toBeDefined();
    expect(component.blogs).toEqual(data);
    expect(component.isEmpty).toBeTruthy();
    expect(component.isLoading).toBeFalse();
  }));

  it('should show blog  modal ', fakeAsync(() => {
    component.isLoading = false;
    fixture.detectChanges();
    expect(document.querySelector('#text-node')).toBeNull;
    tick(50);
    const modalSpy = spyOn(component, 'add_post').and.callThrough();
    fixture.detectChanges();
    const button: HTMLButtonElement = fixture.debugElement.nativeElement.querySelector('#add_post');
    button.dispatchEvent(new Event("click"));
    fixture.detectChanges();
    tick(250);
    spyOn(component.modalRef.content, 'onClose').and.returnValue(of('success'));
    expect(modalSpy).toHaveBeenCalledWith();
    expect(component.modalRef.content.closeBtnName).toEqual('Close');
  }));
});
