import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/Models/product.model';
import { AuthService } from 'src/app/services/auth.service';
import { ProduitService } from 'src/app/services/produit.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  produitsList !: Product[];
  isAdmin!: boolean | undefined;
  constructor(private produitService: ProduitService, private authService : AuthService) { }

  ngOnInit(): void {
    this.produitService.getAll().subscribe(produits => 
      {
        this.produitsList = produits;
      });
      this.isAdmin = this.authService.isAdmin;

  }

}
