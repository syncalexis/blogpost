import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AddPostComponent } from 'src/app/modal/add-post/add-post.component';
import Swal from 'sweetalert2';
import { NotificationService } from 'src/app/services/notification.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss']
})
export class BlogDetailsComponent implements OnInit {
  blog:any = [];
  modalRef!: BsModalRef;
  id:any;
  constructor(
    public router: Router,
    private blogService:HomeService,
    protected _route : ActivatedRoute, 
    private notify: NotificationService,
    protected modalService: BsModalService,
  ) { }

  ngOnInit(): void {
    this.id = this._route.snapshot.paramMap.get("id");
    this.getBlogDetails()
  }
  getBlogDetails(){
    
    this.blogService.getBlogdetails(this.id).subscribe(res => {
      this.blog = res;
    })
  }

  updateBlog(){
    let initialState = {
      event:'update',
      post:this.blog
    };
     // Show Popup Modal
     this.modalRef = this.modalService.show(AddPostComponent,{ initialState });
     this.modalRef.content.closeBtnName = 'Close';
     this.modalRef.setClass('modal_md');
     this.modalRef.content.onClose = (value:any) => {
      if(value){
        this.getBlogDetails();
      }
       this.modalRef.hide();
     }
  }

  delete(id:any){
    Swal.fire({
      title: 'Are you sure?',
      text: "You are removing this post.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ff0017',
      confirmButtonText: 'Yes, Delete it!'
    }).then((result) => {
      this.blogService.deleteBlogs(this.id).subscribe(res => {
      console.log(res);
      this.notify.showNotification('success','Successfully Deleted')
      this.router.navigate(['/home']);
      })
    })
  }
}
