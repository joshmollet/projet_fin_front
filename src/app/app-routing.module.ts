import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { CareComponent } from './components/care/care.component';
import { ContactComponent } from './components/contact/contact.component';
import { CreateCareComponent } from './components/create-care/create-care.component';
import { CreateProduitComponent } from './components/create-produit/create-produit.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { ProduitDetailComponent } from './components/produit-detail/produit-detail.component';
import { ProduitEditComponent } from './components/produit-edit/produit-edit.component';
import { ProfilComponent } from './components/profil/profil.component';
import { UsersComponent } from './components/users/users.component';
import { AdminGuard, AuthGuard } from './services/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent },
  { path: 'create-user', component: CreateUserComponent },
  { path: 'care', component: CareComponent },

  { path: 'products', component: ProductsComponent },
  { path: 'products/ref/:reference', component: ProduitDetailComponent },
  { path: 'products/ref/:reference/edit', component: ProduitEditComponent },

  { path: 'contact', component: ContactComponent },

  { path: '', canActivate: [AuthGuard], children: [
    { path: 'profil', component: ProfilComponent }
    ]},

  { path: '', canActivate: [AdminGuard], children: [
  { path: 'users', component: UsersComponent },
  { path: 'products/create', component: CreateProduitComponent },
  { path: 'care/create', component: CreateCareComponent }
  ]},

  { path: 'home', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
