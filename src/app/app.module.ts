import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './components/users/users.component';
import { HomeComponent } from './components/home/home.component';
import { ServerService } from './services/server.service';
import { UsersService } from './services/users.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { JwtModule } from '@auth0/angular-jwt';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './components/auth/auth.component';
import { CareComponent } from './components/care/care.component';
import { ProductsComponent } from './components/products/products.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { UsersCommonService } from './services/user-common.service';
import { ProfilComponent } from './components/profil/profil.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ContactComponent } from './components/contact/contact.component';
import { CreateProduitComponent } from './components/create-produit/create-produit.component'
import { ProduitService } from './services/produit.service';
import { ProduitDetailComponent } from './components/produit-detail/produit-detail.component';
import { ProduitEditComponent } from './components/produit-edit/produit-edit.component';
import { CareService } from './services/care.service';
import { CreateCareComponent } from './components/create-care/create-care.component';


export function tokenGetter() {
  return sessionStorage.getItem('id_token');
}

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    HomeComponent,
    AuthComponent,
    CareComponent,
    ProductsComponent,
    CreateUserComponent,
    ProfilComponent,
    ContactComponent,
    CreateProduitComponent,
    ProduitDetailComponent,
    ProduitEditComponent,
    CreateCareComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
          tokenGetter: tokenGetter,
          allowedDomains: ["localhost:8000"]
      }
    }),
    FontAwesomeModule
  ],
  providers: [
    ServerService,
    UsersService,
    ProduitService,
    UsersCommonService,
    AuthGuard,
    AuthService,
    CareService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
