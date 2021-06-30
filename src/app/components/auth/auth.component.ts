import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl, ValidatorFn } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/Models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  userForm!: FormGroup;
  usernameCtl!: FormControl;
  passwordCtl!: FormControl;
  isLoggedIn: boolean;

  constructor(private authService: AuthService, 
    private router: Router,
    private formBuilder: FormBuilder) 
  {
    this.isLoggedIn = this.authService.isLoggedIn;
    this.initForm();
  }

  ngOnInit(): void {
    
  }

  initForm(): void
  {
    this.usernameCtl = this.formBuilder.control('', [Validators.required]);
    this.passwordCtl = this.formBuilder.control('', [Validators.required]);

    this.userForm = this.formBuilder.group({
      username: this.usernameCtl,
      password: this.passwordCtl
    });
  }

  onSubmit()
  {
    const formVal = this.userForm.value;
    
    const newUser = new User(formVal);
    this.authService.login(newUser).subscribe(m => 
      {
        if(m)
        {
          this.router.navigate([this.authService.redirectUrl]);
        }
      });
  }

  onLogout()
  {
    this.authService.logout();
    this.isLoggedIn = this.authService.isLoggedIn;
  }

}
