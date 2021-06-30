import { Injectable } from '@angular/core';
import { ServerService } from './server.service';
import { User } from '../Models/user.model';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private server: ServerService) 
  {}

  public getAll(): Observable<User[]> 
  {
    return this.server.get<User[]>('users/').pipe(
      map(res => res.map((m: any) => new User(m))),
      catchError(err => 
        {
          console.error(err);
          return [];
        })
    );
  }

  public getOneByID(id: any): Observable<User | null> 
  {
    return this.server.get<User>('users/id/'+ id).pipe(
      map(res => res.length > 0 ? new User(res[0]) : null),
      catchError(err => 
        {
          console.error(err);
          return [];
        })
    );
  }

  public getOneByName(name: string): Observable<User | null> 
  {
    return this.server.get<User>('users/name/'+ name).pipe(
      map(res => res.length > 0 ? new User(res[0]) : null),
      catchError(err => 
        {
          console.error(err);
          return [];
        })
    );
  }

  public getOneByUsername(username: string): Observable<User | null> 
  {
    return this.server.get<User>('users/username/'+ username).pipe(
      map(res => res.length > 0 ? new User(res[0]) : null),
      catchError(err => 
        {
          console.error(err);
          return [];
        })
    );
  }

  public getOneByEmail(email: string): Observable<User | null> 
  {
    return this.server.get<User>('users/email/'+ email).pipe(
      map(res => res.length > 0 ? new User(res[0]) : null),
      catchError(err => 
        {
          console.error(err);
          return [];
        })
    );
  }

  public addUser(user: User):  Observable<User[]> 
  {
    return this.server.post<User>('users/create', user).pipe(
      map(res => res.map((m: any) => new User(m))),
      catchError(err => 
        {
          console.error(err);
          return [];
        })
    );
  }

  public updateUser(user: User): Observable<User | null>
  {
    return this.server.put<User>('users/'+ user.id, user).pipe(
      map(res => res.length > 0 ? new User(res[0]) : null),
      catchError(err => 
        {
          console.error(err);
          return [];
        })
    );
  }

  public deleteUser(user: User): Observable<User[]>
  {
    return this.server.delete<User>('users/'+ user.id).pipe(
      map(res => res.map((m: any) => new User(m))),
      catchError(err => 
        {
          console.error(err);
          return [];
        })
    );
  }
}
