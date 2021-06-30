import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Care } from '../Models/care.model';
import { ServerService } from './server.service';

@Injectable({
  providedIn: 'root'
})
export class CareService {

  constructor(private server : ServerService) { }

  public getAll(): Observable <Care[]>{
    return this.server.get<Care[]>('care/', false).pipe(
      map(res => res.map((m: any) => new Care(m))),
      catchError(err => 
        {
          console.error(err);
          return [];
        })
    );
  }

  public getOneByRef(id: any): Observable<Care> 
  {
    return this.server.get<Care>('care/id/'+ id, false).pipe(
      map(res => res.length > 0 ? new Care(res[0]) : new Care({})),
      catchError(err => 
        {
          console.error(err);
          return [];
        })
    );
  }

  public addCare(care: Care):  Observable<Care[]> 
  {
    return this.server.post<Care>('care/create', care).pipe(
      map(res => {
        console.log(res);
        return res.map((m: any) => new Care(m))
      }),
      catchError(err => 
        {
          console.error(err);
          return [];
        })
    );
  }
}
