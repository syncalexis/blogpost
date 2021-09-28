import { Component, OnInit } from '@angular/core';
import { Blog } from 'src/app/models/blog-type';
import { HomeService } from '../home.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AddPostComponent } from 'src/app/modal/add-post/add-post.component';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
 blogs:any = [];
 modalRef!: BsModalRef;
 isLoading:boolean = true;
 startSearching = new Subject<any>();
 isEmpty:boolean=false;
 skeletonloader:any = [1,2,3,4]
 listingArgs = {
  search:'',
  sortBy:'createdAt',
  order:'desc',
};
  constructor(
    public router: Router,
    private blogService:HomeService,
    protected modalService: BsModalService,
  ) {

  }

  ngOnInit(): void {
    this.getBlogs()
    this.startSearching.pipe(
      debounceTime(300),
      distinctUntilChanged())
      .subscribe(value => {
        this.getBlogs();
    });
  }

  add_post(){
    let initialState = {
      event:'add'
    };
     // Show Popup Modal
     this.modalRef = this.modalService.show(AddPostComponent,{ initialState });
     this.modalRef.content.closeBtnName = 'Close';
     this.modalRef.setClass('modal_md');
     this.modalRef.content.onClose = (value:any) => {
      if(value){
        this.getBlogs();
      }
       this.modalRef.hide();
     }
  }
  getBlogs(){
    this.isEmpty =false;
    this.isLoading = true;
    this.blogService.getBlogs(this.listingArgs).subscribe(res => {
      this.isLoading = false;
      if(res.length < 1){
        this.isEmpty= true;
      }
      else{
        this.blogs = res;
      }
      
    })
  }

}
