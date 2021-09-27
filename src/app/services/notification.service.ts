import { Injectable } from '@angular/core';
import * as jQuery from 'jquery';
import 'bootstrap-notify';
let $: any = jQuery;

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  showNotification(type:any, message:any) {
    if(type == 'success'){
      $.notify({
        icon: "add_alert",
        message: message
      }, {
        timer: 1000,
        placement: {
          from: 'top',
          align: 'right'
        },
        template:
          '<div class="alert alert-success alert-with-icon" data-notify="container">' +
          '<i class="material-icons" data-notify="icon">check</i>' +
          '<button mat-button type="button" class="close" data-dismiss="alert" aria-label="Close">  <i class="material-icons">close</i></button>' +
          '<span data-notify="message">{2}</span>' +
          '</div>'
      });
    }
    else if(type == 'failed'){
      $.notify({
        icon: "add_alert",
        message: message
      }, {
        timer: 1000,
        placement: {
          from: 'top',
          align: 'right'
        },
        template:
          '<div class="alert alert-danger alert-with-icon" data-notify="container">' +
          '<i class="material-icons" data-notify="icon">error_outline</i>' +
          '<button mat-button type="button" class="close" data-dismiss="alert" aria-label="Close">  <i class="material-icons">close</i></button>' +
          '<span data-notify="message">{2}</span>' +
          '</div>'
      });
    }
    else if(type == 'warning'){
      $.notify({
        icon: "add_alert",
        message: message
      }, {
        timer: 1000,
        placement: {
          from: 'top',
          align: 'right'
        },
        template:
          '<div class="alert alert-warning alert-with-icon" data-notify="container">' +
          '<i class="material-icons" data-notify="icon">warning</i>' +
          '<button mat-button type="button" class="close" data-dismiss="alert" aria-label="Close">  <i class="material-icons">close</i></button>' +
          '<span data-notify="message">{2}</span>' +
          '</div>'
      });
    }
  }

}