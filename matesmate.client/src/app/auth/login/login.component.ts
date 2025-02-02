import { Component, OnDestroy, OnInit } from '@angular/core';
import { VisibilityService } from '../../services/visibility.service';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, OnDestroy {

  constructor(private visibilityService:VisibilityService, private authService:AuthService) {}

  ngOnInit():void {
    this.visibilityService.setShowNavbarSidebar(false);
    document.body.style.background = 'linear-gradient(to bottom,rgb(141, 255, 121),rgb(255, 255, 255))'; // Set gradient background
    document.documentElement.style.height = '100%';
    document.body.style.height = '100%';
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.display = 'flex';
    document.body.style.justifyContent = 'center';
    document.body.style.alignItems = 'center';
  }

  ngOnDestroy():void {
    this.visibilityService.setShowNavbarSidebar(true);
    document.body.style.background = '';
    document.documentElement.style.height = '';
    document.body.style.height = '';
    document.body.style.margin = '';
    document.body.style.padding = '';
    document.body.style.display = '';
    document.body.style.justifyContent = '';
    document.body.style.alignItems = '';
  }


  //burayı düzelt, nested subscribe olmamalı
  login(form:NgForm):void {
    const username = form.value.username;
    const password = form.value.password
    this.authService.login(username, password).pipe(catchError(error => {
      console.log(error);
      return throwError(() => error);
    })
  ).subscribe(response => {
    if(response.success){
      console.log('Login successful');
      this.authService.checkSession(username).pipe(catchError(error => {
        console.log(error);
        return throwError(() => error);
      })
    ).subscribe(sessionResponse => {
      console.log(sessionResponse);
    });
    } else {
      console.log('Login failed');
    }
  })
  }

}
