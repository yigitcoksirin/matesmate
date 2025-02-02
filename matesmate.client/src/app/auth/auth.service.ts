import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'https://localhost:7118/auth/';

  constructor(private http:HttpClient, private cookieService: CookieService) { }


  login(username: string, password:string){
    return this.http.post<any>(this.url + 'login', {
      username:username,
      password:password
    });
  }

  checkSession(username:string){
    return this.http.post<any>(this.url + 'check-session', {
      username:username
    });
  }

  getAccessToken(username:string, password:string){
    return this.http.post<any>(this.url + 'access-token', {
      username:username,
      password:password
    });
  }

  renewRefreshToken(refreshToken:string){
    return this.http.post<any>(this.url + 'refresh-token', {
      refreshToken:refreshToken
    });
  }
}
