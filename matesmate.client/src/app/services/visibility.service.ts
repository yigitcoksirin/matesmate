import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class VisibilityService {
  private showNavbarSidebar = new BehaviorSubject<boolean>(true);

  getShowNavbarSidebar() {
    return this.showNavbarSidebar.asObservable();
  }

  setShowNavbarSidebar(value: boolean) {
    this.showNavbarSidebar.next(value);
  }
}
