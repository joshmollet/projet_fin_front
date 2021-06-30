import { Component, OnInit } from '@angular/core';
import { Care } from 'src/app/Models/care.model';
import { AuthService } from 'src/app/services/auth.service';
import { CareService } from 'src/app/services/care.service';

@Component({
  selector: 'app-care',
  templateUrl: './care.component.html',
  styleUrls: ['./care.component.scss']
})
export class CareComponent{
careList !: Care[];
isAdmin !: boolean | undefined;
  constructor(private careService: CareService, private authService : AuthService) {
    this.careService.getAll().subscribe(cares => 
      {
        this.careList = cares;
        console.log(this.careList);
      });
      this.isAdmin = this.authService.isAdmin;
  }
}
