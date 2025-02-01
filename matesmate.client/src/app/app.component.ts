import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { VisibilityService } from './services/visibility.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  showNavbarAndSidebar:boolean = true;

  constructor(
    private http: HttpClient,
    private visibilityService: VisibilityService,
    private router: Router) {}

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const currentRoute = this.router.url;
      if (currentRoute.includes('login') || currentRoute.includes('register')) {
        this.visibilityService.setShowNavbarSidebar(false);
      } else {
        this.visibilityService.setShowNavbarSidebar(true);
      }
    });

    this.visibilityService.getShowNavbarSidebar().subscribe(status => {
      this.showNavbarAndSidebar = status;
    });
  }

}
