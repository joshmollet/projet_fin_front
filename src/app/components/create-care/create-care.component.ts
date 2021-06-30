import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Care } from 'src/app/Models/care.model';
import { CareService } from 'src/app/services/care.service';

@Component({
  selector: 'app-create-care',
  templateUrl: './create-care.component.html',
  styleUrls: ['./create-care.component.scss']
})
export class CreateCareComponent{
care !: Care;
careForm !: FormGroup;
nameCtl !: FormControl;
durationCtl !: FormControl;
priceCtl !: FormControl;
descriptionCtl !: FormControl;

  constructor(private careService: CareService, private formBuilder: FormBuilder, private router: Router) {
    this.initForm();
  }

  initForm(){
    this.nameCtl = this.formBuilder.control('', [Validators.required]);
    this.durationCtl = this.formBuilder.control('', [Validators.required]);
    this.priceCtl = this.formBuilder.control('', [Validators.required]);
    this.descriptionCtl = this.formBuilder.control('');
    
    this.careForm = this.formBuilder.group({
      name: this.nameCtl,
      duration: this.durationCtl,
      price: this.priceCtl,
      description: this.descriptionCtl
    })
  }

  onSubmitForm(){
    const formVal = this.careForm.value;
    const newCare = new Care(formVal);
    
    this.careService.addCare(newCare).subscribe(m => {});
    
    this.router.navigate(['/care']);
  }
}
