import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;
  nameCtl!: FormControl;
  firstnameCtl!: FormControl;
  emailCtl!: FormControl;
  telCtl!: FormControl;
  msgCtl!: FormControl;
  honeypot: FormControl = new FormControl(""); // we will use this to prevent spam
  submitted: boolean = false; // show and hide the success message
  isLoading: boolean = false; // disable the submit button if we're loading
  responseMessage!: string; // the response message to show to the user

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private http : HttpClient
     ) { 
    this.initForm();
  }

  ngOnInit(): void {
  }

  initForm(): void {
    this.nameCtl = this.formBuilder.control('', [Validators.required]);
    this.firstnameCtl = this.formBuilder.control('', [Validators.required]);
    this.emailCtl = this.formBuilder.control('', [Validators.required]);
    this.telCtl = this.formBuilder.control('', [Validators.required]);
    this.msgCtl = this.formBuilder.control('', [Validators.required]);

    this.contactForm = this.formBuilder.group({
      name : this.nameCtl,
      firstname : this.firstnameCtl,
      email : this.emailCtl,
      tel : this.telCtl,
      msg : this.msgCtl
    });
  }

  onSubmit() {
    console.log('test');
    if (this.contactForm.status == "VALID" && this.honeypot.value == "") {
      this.contactForm.disable(); // disable the form if it's valid to disable multiple submissions
      var formData: any = new FormData();
      formData.append("Nom", this.contactForm.get("name")!.value);
      formData.append("Prénom", this.contactForm.get("firstname")!.value);
      formData.append("Email", this.contactForm.get("email")!.value);
      formData.append("Téléphone", this.contactForm.get("tel")!.value);
      formData.append("Message", this.contactForm.get("msg")!.value);
      console.log(formData);
      this.isLoading = true; // sending the post request async so it's in progress
      this.submitted = false; // hide the response message on multiple submits
      this.http.post("https://script.google.com/macros/s/AKfycbwA0AwMCovK5XnW4a5KTVHOKMnEfmlQXZ_pLIt7/exec", formData).subscribe(
        (response) => {
          // choose the response message
          const resp = JSON.stringify(response);
          const resp2 = JSON.parse(resp);
          if (resp2.result == "success") {
            this.responseMessage = "Merci pour le message, je vous répondrais dès que possible !";
          } else {
            this.responseMessage = "Erreur, veuillez réessayer plus tard...";
          }
          this.contactForm.enable(); // re enable the form after a success
          this.submitted = true; // show the response message
          this.isLoading = false; // re enable the submit button
          console.log(response);
        },
        (error) => {
          this.responseMessage = "Erreur, veuillez réessayer plus tard...";
          this.contactForm.enable(); // re enable the form after a success
          this.submitted = true; // show the response message
          this.isLoading = false; // re enable the submit button
          console.log(error);
        }
      );
    }
  }
}
