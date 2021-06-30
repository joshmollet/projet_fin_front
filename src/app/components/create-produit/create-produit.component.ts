import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/Models/product.model';
import { ProduitService } from 'src/app/services/produit.service';

@Component({
  selector: 'app-create-produit',
  templateUrl: './create-produit.component.html',
  styleUrls: ['./create-produit.component.scss']
})
export class CreateProduitComponent {
  produit !: Product;
  produitForm !: FormGroup;
  referenceCtl!: FormControl;
  nameCtl!: FormControl;
  stockCtl!: FormControl;
  priceCtl!: FormControl;
  image_urlCtl!: FormControl;
  descriptionCtl!: FormControl;
  emploiCtl!: FormControl;
  ingredientCtl!: FormControl;

  constructor(private produitService : ProduitService, private formBuilder: FormBuilder, private router: Router){
    this.initForm();
  }


  initForm(){
      this.referenceCtl = this.formBuilder.control('', [Validators.required]);
      this.nameCtl = this.formBuilder.control('', [Validators.required]);
      this.stockCtl = this.formBuilder.control('', [Validators.required]);
      this.priceCtl = this.formBuilder.control('', [Validators.required]);
      this.image_urlCtl = this.formBuilder.control('', [Validators.required]);
      this.descriptionCtl = this.formBuilder.control('');
      this.emploiCtl = this.formBuilder.control('');
      this.ingredientCtl = this.formBuilder.control('');

      this.produitForm = this.formBuilder.group({
        reference: this.referenceCtl,
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
    const formVal = this.produitForm.value;
    const newProduct = new Product(formVal);
    
    this.produitService.addProduct(newProduct).subscribe(m => {});
    
    this.router.navigate(['/products']);
  }
}
