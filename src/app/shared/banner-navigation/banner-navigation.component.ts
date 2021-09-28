import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Injectable } from "@angular/core";

@Injectable()
@Component({
  selector: 'app-banner-navigation',
  templateUrl: './banner-navigation.component.html',
  styleUrls: ['./banner-navigation.component.scss']
})

export class BannerNavigationComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }
  user:any = [];
  isLoggedin:boolean = false;
  ngOnInit(): void {
    let user = localStorage.getItem('user');
    if(user){
      this.user = JSON.parse(user);
      this.isLoggedin = true;
    }
  }
  logout(){
    this.user =[];
    this.isLoggedin = false;
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    this.router.navigate(['/login']);
  }
}
