import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { LoginserviceService } from './loginservice.service';
import { NotificationService } from 'src/app/services/notification.service';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading:boolean = false;
  constructor(
    private router: Router,
    private fb : FormBuilder,
    private loginService: LoginserviceService,
    private notify: NotificationService,
  ) { }

  ngOnInit(): void {
    if(localStorage.getItem('token')){
      this.router.navigate(['/home']);
    }
    this.loginForm = this.fb.group({
      username: [ null, [Validators.required,]],
      password: [null, [Validators.required]],
  }, {});
  }
  login() {
    this.isLoading = true
    this.loginService.loginUser().subscribe(res => {
      this.isLoading = false;
      if(this.loginForm.controls.username.value == res[0].username && this.loginForm.controls.password.value == res[0].password){
        localStorage.setItem('token', res[0].token);
          let userInfo = {
            name:res[0].name,
            username:res[0].username,
            id:res[0].id,
            user_type:res[0].avatar,
          }
          localStorage.setItem('user',JSON.stringify(userInfo));
          this.notify.showNotification('success',
           'Hello!'+ ' '+res[0].name);
          this.router.navigate(['/home']);
      }
      else{
        this.notify.showNotification('failed',
        'Invalid login credentials' );
      }
    });

}
  
}
