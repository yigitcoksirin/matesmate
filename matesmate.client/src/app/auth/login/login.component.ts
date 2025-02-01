import { Component, OnDestroy, OnInit } from '@angular/core';
import { VisibilityService } from '../../services/visibility.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, OnDestroy {

  constructor(private visibilityService:VisibilityService) {}

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

}
