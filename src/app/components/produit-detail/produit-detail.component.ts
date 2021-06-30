import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/Models/product.model';
import { AuthService } from 'src/app/services/auth.service';
import { ProduitService } from 'src/app/services/produit.service';

@Component({
  selector: 'app-produit-detail',
  templateUrl: './produit-detail.component.html',
  styleUrls: ['./produit-detail.component.scss']
})
export class ProduitDetailComponent implements OnInit {
  produit !: Product;
  ref : string;
  isAdmin!: boolean|undefined;
  constructor(private produitService: ProduitService, private route : ActivatedRoute, private authService: AuthService) {
    this.ref = this.route.snapshot.params["reference"];
    this.produit = new Product({});
    this.produitService.getOneByRef(this.ref).subscribe(produits => 
      {
        this.produit = produits;
      });
    this.isAdmin = this.authService.isAdmin;
  }

  ngOnInit(): void {
  }

  estVide(col : string){
    if(col ==''){
      return false;
    }
    else{
      return true;
    }
  }

  achat(){
    alert('Malheureusement, vous ne pouvez encore rien acheter ici..');
  }

}
