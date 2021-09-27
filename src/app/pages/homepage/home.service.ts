import { Injectable } from '@angular/core';
import { blogs } from 'src/app/lib/api-constant'
import { HttpServiceService } from 'src/app/services/http-service.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  baseUrl = blogs;

  constructor(
    private gen: HttpServiceService
  ) { }

  getBlogs(params:any=[]) {
    return this.gen.get(this.baseUrl.getBlogs,params)
  }

  getBlogdetails(id:any) {
    return this.gen.get(this.baseUrl.getBlogs+'/'+id);
  }
  addBlogs(params:any=[]){
    return this.gen.post(this.baseUrl.addBlogs,params)
  }
  updateBlog(params:any=[],id:any){
    return this.gen.put(this.baseUrl.addBlogs+'/'+id,params)
  }
  deleteBlogs(id:any){
    return this.gen.delete(this.baseUrl.addBlogs+'/'+id)
  }
}
