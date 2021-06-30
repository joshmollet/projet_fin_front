import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { User } from '../Models/user.model';
import { ServerService } from './server.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: boolean;
  redirectUrl: string;
  tok?: string | null;
  isAdmin?: boolean;

  constructor(private http: ServerService, private router: Router, private jwtHelper : JwtHelperService) 
  {
    this.isLoggedIn = sessionStorage.getItem('id_token') != null;
    if(this.isLoggedIn){
      this.tok =  sessionStorage.getItem('id_token') || '';
      this.isAdmin = this.jwtHelper.decodeToken(this.tok).isAdmin
      console.log(this.tok);
      console.log(this.isAdmin);
    }
    this.redirectUrl = '/';
  }

  public getCurrentUser(): User
  {
    return JSON.parse(sessionStorage.getItem('user') || '');
  }

  public updateCurrentUser(user: User)
  {
    if(!user.password)
    {
      let oldUser = JSON.parse(sessionStorage.getItem('user') || '')
      user.password = oldUser.password;
    }
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  public login(user: User): Observable<boolean>
  {
    return this.http.login(user).pipe(
      map(res => 
        {
          this.isLoggedIn = res;
          this.isAdmin = user.isAdmin;
          return res;
        })
    );
  }

  public logout(): void 
  {
    this.isLoggedIn = false;
    this.isAdmin = false;
    this.http.logout();
    this.redirectUrl = '/';
    this.router.navigate(['/']);
  }
}
