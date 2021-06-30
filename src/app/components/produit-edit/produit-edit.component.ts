import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/Models/product.model';
import { ProduitService } from 'src/app/services/produit.service';

@Component({
  selector: 'app-produit-edit',
  templateUrl: './produit-edit.component.html',
  styleUrls: ['./produit-edit.component.scss']
})
export class ProduitEditComponent implements OnInit {
  produit !: Product;
  editForm !: FormGroup;
  // referenceCtl!: FormControl;
  nameCtl!: FormControl;
  stockCtl!: FormControl;
  priceCtl!: FormControl;
  image_urlCtl!: FormControl;
  descriptionCtl!: FormControl;
  emploiCtl!: FormControl;
  ingredientCtl!: FormControl;
  ref : string;

  constructor(private produitService : ProduitService, private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute){
    this.ref = this.route.snapshot.params["reference"];
    this.produitService.getOneByRef(this.ref).subscribe(produit => 
      {
        this.produit = produit;
        this.initForm();
      })
  }

  ngOnInit(): void {
  }

  initForm(){
      // this.referenceCtl = this.formBuilder.control(this.produit.reference, [Validators.required]);
      this.nameCtl = this.formBuilder.control(this.produit.name, [Validators.required]);
      this.stockCtl = this.formBuilder.control(this.produit.stock, [Validators.required]);
      this.priceCtl = this.formBuilder.control(this.produit.price, [Validators.required]);
      this.image_urlCtl = this.formBuilder.control(this.produit.image_url, [Validators.required]);
      this.descriptionCtl = this.formBuilder.control(this.produit.description);
      this.emploiCtl = this.formBuilder.control(this.produit.emploi);
      this.ingredientCtl = this.formBuilder.control(this.produit.ingredient);

      this.editForm = this.formBuilder.group({
        // reference: this.referenceCtl,
        name: this.nameCtl,
        stock: this.stockCtl,
        price: this.priceCtl,
        image_url: this.image_urlCtl,
        description: this.descriptionCtl,
        emploi: this.emploiCtl,
        ingredient: this.ingredientCtl
      });
    }

  onSubmitForm() {
    const formVal = this.editForm.value;
    const newProduct = new Product(formVal);
    
    this.produitService.updateProduct(this.ref, newProduct).subscribe(m => {});
    
    this.router.navigate(['/products/ref/'+ this.ref]);
  }
}
