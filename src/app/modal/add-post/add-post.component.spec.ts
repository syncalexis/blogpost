import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, discardPeriodicTasks, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { HomeService } from 'src/app/pages/homepage/home.service';

import { AddPostComponent } from './add-post.component';

describe('AddPostComponent', () => {
  let component: AddPostComponent;
  let fixture: ComponentFixture<AddPostComponent>;
  let testService: HomeService
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPostComponent ],
      providers: [FormBuilder],
      imports: [RouterTestingModule, HttpClientTestingModule],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    testService = TestBed.inject(HomeService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('check initial Address form values on add', fakeAsync(() => {
    localStorage.removeItem('user');
    component.event = 'add';
    fixture.detectChanges();
    component.ngOnInit();
    const blogFormGroup = component.blogForm;
    const formValues = {
      heading:'',
      content:'',
      Author:'',
      createdAt: ''
    };
    blogFormGroup.patchValue({
      heading:'',
      content:'',
      Author:'',
      createdAt: ''
    })
    fixture.detectChanges();
    expect(blogFormGroup.value).toEqual(formValues);
  }));

  it('should have a form validation on add', fakeAsync(() => {
    localStorage.removeItem('user');
    component.event = 'add';
    let blogFormGroup = component.blogForm;
    blogFormGroup.controls['heading'].setValue('heading');
    blogFormGroup.controls['content'].setValue('content');
    blogFormGroup.controls['createdAt'].setValue('createdAt');
    blogFormGroup.controls['Author'].setValue('Author');
    fixture.detectChanges();
    expect(component.blogForm.valid).toBeTrue();
  }));

  it('should have a form validation on add', fakeAsync(() => {
    localStorage.removeItem('user');
    component.event = 'add';
    let blogFormGroup = component.blogForm;
    blogFormGroup.controls['heading'].setValue('');
    blogFormGroup.controls['content'].setValue('');
    blogFormGroup.controls['createdAt'].setValue('');
    blogFormGroup.controls['Author'].setValue('');
    fixture.detectChanges();
    expect(component.blogForm.invalid).toBeTrue();
  }));
  
  it('should  be able to add blogpost ', fakeAsync(() => {
    localStorage.removeItem('user');
    component.event = 'add';
    let blogFormGroup = component.blogForm;
    blogFormGroup.controls['heading'].setValue('heading');
    blogFormGroup.controls['content'].setValue('content');
    blogFormGroup.controls['createdAt'].setValue('createdAt');
    blogFormGroup.controls['Author'].setValue('Author');
    let data =  [
      {
         heading: "heading", createdAt:'createdAt' , content : 'content' , Author: 'Author',
      }
    ];
    let customerSpy = spyOn(testService, 'addBlogs').and.returnValue(of(data));
    component.addPost();
    fixture.detectChanges();
    tick(2000);
    expect(customerSpy).toHaveBeenCalled();
    expect(component.blogForm.valid).toBeTrue();
    flush();
    discardPeriodicTasks()
  }));

  it('check initial Address form values on add', fakeAsync(() => {
    component.post ={
      heading:'sampleheading',
      content:'samplecontent',
      Author:'sampleAuthor',
      createdAt: 'samplecreatedAt'
    }
    let userInfo = {
      name:'sample',
      username:'sample user',
      id:'1',
    }
    localStorage.setItem('user',JSON.stringify(userInfo));
    component.event = 'edit';
    fixture.detectChanges();
    component.ngOnInit();
    const blogFormGroup = component.blogForm;
    blogFormGroup.patchValue({
      heading:'sampleheading',
      content:'samplecontent',
      Author:'sampleAuthor',
      createdAt: 'samplecreatedAt'
    })
    fixture.detectChanges();
    expect(blogFormGroup.value).toEqual(component.post);
  }));

  it('should have a form validation on add', fakeAsync(() => {
    component.event = 'edit';
    let blogFormGroup = component.blogForm;
    blogFormGroup.controls['heading'].setValue('heading');
    blogFormGroup.controls['content'].setValue('content');
    blogFormGroup.controls['createdAt'].setValue('createdAt');
    blogFormGroup.controls['Author'].setValue('Author');
    fixture.detectChanges();
    expect(component.blogForm.valid).toBeTrue();
  }));

  it('should have a form validation on add', fakeAsync(() => {
    component.event = 'edit';
    let blogFormGroup = component.blogForm;
    blogFormGroup.controls['heading'].setValue('');
    blogFormGroup.controls['content'].setValue('');
    blogFormGroup.controls['createdAt'].setValue('');
    blogFormGroup.controls['Author'].setValue('');
    fixture.detectChanges();
    expect(component.blogForm.invalid).toBeTrue();
  }));

  it('should close modal', () => {
    let button = fixture.debugElement.nativeElement.querySelector('#closehomodal');
    button.click()
    expect(component.isSubmit).toBeFalse();
  });

  it('should  be able to update blogpost ', fakeAsync(() => {
    component.post ={
      heading:'sampleheading',
      content:'samplecontent',
      Author:'sampleAuthor',
      createdAt: 'samplecreatedAt'
    }
    let userInfo = {
      name:'sample',
      username:'sample user',
      id:'1',
    }
    let blogFormGroup = component.blogForm;
    blogFormGroup.controls['heading'].setValue('heading');
    blogFormGroup.controls['content'].setValue('content');
    blogFormGroup.controls['createdAt'].setValue('createdAt');
    blogFormGroup.controls['Author'].setValue('Author');
    let data =  [
      {
         heading: "heading", createdAt:'createdAt' , content : 'content' , Author: 'Author',
      }
    ];
    let customerSpy = spyOn(testService, 'updateBlog').and.returnValue(of(data));
    component.updatePost();
    fixture.detectChanges();
    tick(2000);
    expect(customerSpy).toHaveBeenCalled();
    expect(component.blogForm.valid).toBeTrue();
    flush();
    discardPeriodicTasks()
  }));
});
