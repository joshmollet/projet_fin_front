import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { User } from './Models/user.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {  } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'L.V Beauty';
  loginForm !: FormGroup;
  usernameLogin!: FormControl;
  passwordLogin!: FormControl;

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder){
    this.initFormLogin();
  }
  
  initFormLogin(): void{
    this.usernameLogin = this.formBuilder.control('', [Validators.required]);
    this.passwordLogin = this.formBuilder.control('', [Validators.required]);

    this.loginForm = this.formBuilder.group({
      username: this.usernameLogin,
      password: this.passwordLogin
    });
  }

  onSubmit(){
    console.log('ok');
    const formVal = this.loginForm.value;
    console.log('a '+formVal);
    const newUser = new User(formVal);
    this.authService.login(newUser).subscribe(m => 
      {
        if(m)
        {
          this.router.navigate([this.authService.redirectUrl]);
        }
      });
  }

  motDePasseOubli(){
    alert('ça c\'est bien dommage');
  }

  public checkAuth()
  {
    return this.authService.isLoggedIn;
  }

  public checkAdmin(){
    return this.authService.isAdmin;
  }

  public logout(): void
  {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  // public profile(): void 
  // {
  //   const profileRte = 'users/' + this.authService.getCurrentUser().id;
  //   this.router.navigate([profileRte]);
  // }
}
