import { Injectable } from '@angular/core';
import { login } from 'src/app/lib/api-constant'
import { HttpServiceService } from 'src/app/services/http-service.service';

@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {
  baseUrl = login;

  constructor(
    private gen: HttpServiceService
  ) { }


  loginUser() {
    return this.gen.get(this.baseUrl.loginUser)
  }

  
}
