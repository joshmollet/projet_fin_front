import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl, ValidatorFn } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/Models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UsersCommonService } from 'src/app/services/user-common.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  userForm!: FormGroup;
  usernameCtl!: FormControl;
  nameCtl!: FormControl;
  firstnameCtl!: FormControl;
  birthdateCtl!: FormControl;
  addressCtl!: FormControl;
  numberCtl!: FormControl;
  zipCtl!: FormControl;
  cityCtl!: FormControl;
  emailCtl!: FormControl;
  passwordCtl!: FormControl;
  passwordConfirmCtl!: FormControl;
  isNew: boolean = true;
  user!: User;

  constructor(private userCommonService: UsersCommonService,
              private router: Router, 
              private route: ActivatedRoute, 
              private formBuilder: FormBuilder,
              private authService: AuthService)   {
    this.initForm();
  }

  ngOnInit(): void {
  }

  initForm(): void
  {
    this.usernameCtl = this.formBuilder.control('', [Validators.required], [this.usernameExist()]);
    this.nameCtl = this.formBuilder.control('', [Validators.required]);
    this.firstnameCtl = this.formBuilder.control('', [Validators.required]);
    this.birthdateCtl = this.formBuilder.control('', [Validators.required]);
    this.addressCtl = this.formBuilder.control('', [Validators.required]);
    this.numberCtl = this.formBuilder.control('', [Validators.required]);
    this.zipCtl = this.formBuilder.control('', [Validators.required]);
    this.cityCtl = this.formBuilder.control('', [Validators.required]);
    this.emailCtl = this.formBuilder.control('', [Validators.required, Validators.email]);
    this.passwordCtl = this.formBuilder.control('', [Validators.required, Validators.minLength(6)]);
    this.passwordConfirmCtl = this.formBuilder.control('', [Validators.required, this.checkConfirm()]);

    this.userForm = this.formBuilder.group({
      username: this.usernameCtl,
      name: this.nameCtl,
      first_name: this.firstnameCtl,
      birthdate: this.birthdateCtl,
      address: this.addressCtl,
      address_number: this.numberCtl,
      zip_code: this.zipCtl,
      city: this.cityCtl,
      email: this.emailCtl,
      password: this.passwordCtl,
      passwordConfirm: this.passwordConfirmCtl
    });
  }

  userContent(){
    if(this.usernameCtl.value){
      return true;
    }
    else return false;
  }

  usernameExist(): any
  {
    var timeout: any;
    return (ctl: FormControl) =>
    {
      clearTimeout(timeout);
      const username = ctl.value;
      return new Promise(resolve => {
        timeout = setTimeout(() =>{
          if(ctl.pristine)
          {
            resolve(null);
          } else 
          {
            this.userCommonService.getOneByUsername(username).subscribe(user => 
              {
                console.log(user);
                if(user==null){
                  resolve (null);
                }
                else{
                  resolve({usernameExist: true})
                }
              })
          }
        }, 300)
      });
    }
  }

  checkConfirm(): ValidatorFn
  {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const password = control.value;

      if(password != this.passwordCtl.value && (!control.hasError('required')))
      {
        return  {forbidden: {value: 'passwords are not the same'}, pwdNotEqual: true };
      }
      return null;
    };
  }

  onSubmit()
  {
    const formVal = this.userForm.value;
    const newUser = new User(formVal);
    
    this.userCommonService.addUser(newUser).subscribe(m => {});
    
    this.router.navigate(['/']);
  }

}
