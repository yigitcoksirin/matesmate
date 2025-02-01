import { Component, OnDestroy, OnInit } from '@angular/core';
import { VisibilityService } from '../../services/visibility.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit, OnDestroy {

  constructor(private visibilityService:VisibilityService) {}

  ngOnInit():void {
    this.visibilityService.setShowNavbarSidebar(false);
  }

  ngOnDestroy():void {
    this.visibilityService.setShowNavbarSidebar(true);
  }

}
