import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Product } from '../Models/product.model';
import { ServerService } from './server.service';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  constructor(private server : ServerService) { }

  public getAll(): Observable <Product[]>{
    return this.server.get<Product[]>('products/', false).pipe(
      map(res => res.map((m: any) => new Product(m))),
      catchError(err => 
        {
          console.error(err);
          return [];
        })
    );
  }

  public getOneByRef(reference: any): Observable<Product> 
  {
    return this.server.get<Product>('products/reference/'+ reference, false).pipe(
      map(res => res.length > 0 ? new Product(res[0]) : new Product({})),
      catchError(err => 
        {
          console.error(err);
          return [];
        })
    );
  }

  public addProduct(product: Product):  Observable<Product[]> 
  {
    return this.server.post<Product>('products/create', product).pipe(
      map(res => {
        console.log(res);
        return res.map((m: any) => new Product(m))
      }),
      catchError(err => 
        {
          console.error(err);
          return [];
        })
    );
  }

  public updateProduct(baseRef: string , product: Product): Observable<Product>{
    return this.server.put<Product>('products/' + baseRef, product).pipe(
      map(res => res.length > 0 ? new Product(res[0]) : new Product({})),
      catchError(err => 
        {
          console.error(err);
          return [];
        })
    );
  }
}
