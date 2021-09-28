import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { HomeService } from 'src/app/pages/homepage/home.service';
import { NotificationService } from 'src/app/services/notification.service';
@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {
event:any;
blogForm!: FormGroup;
isSubmit:boolean=false;
post:any
  constructor(
    private notify: NotificationService,
    private blogService:HomeService,
    private fb : FormBuilder,
  ) { }

  ngOnInit(): void {
    let user:any = localStorage.getItem('user');
    user= JSON.parse(user);
    console.log(this.post)
    this.blogForm = this.fb.group({
      heading: [ null, [Validators.required,]],
      content: [null, [Validators.required]],
      Author:'',
      createdAt: ''
  }, {});
  if(user){
    this.blogForm.patchValue({
      Author:user.name,
      createdAt: new Date()
    })
  }
    if(this.event == 'update'){
      this.blogForm.patchValue({
        heading:this.post.heading,
        content:this.post.content,
      })
    }
  }

  addPost(){
    this.isSubmit = true;
    this.blogService.addBlogs(this.blogForm.value).subscribe(res => {
      this.isSubmit = false;
      console.log(res);
      this.notify.showNotification('success','Blog added successfully');
      this.onClose('success');
    })
  }
 
  closeModal($event: Event) {
    $event.preventDefault();
    this.onClose(null);
  }

  onClose(value:any): any {
    // close modal
   }

  updatePost(){
    this.isSubmit = true;
    this.blogService.updateBlog(this.blogForm.value,this.post.id).subscribe(res => {
      this.isSubmit = false;
      console.log(res);
      this.notify.showNotification('success','Blog updated successfully');
      this.onClose('success');
    })
  }

}
