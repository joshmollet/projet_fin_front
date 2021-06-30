import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, of } from 'rxjs'
import { User } from '../Models/user.model';
import { catchError, map, flatMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  private BASE_URL: string = 'https://localhost:8000/api/';

  /**
   * Instance privée de ce helper qui nous aidera à vérifier si
   * un token est expiré ou non.
   */
  private jwt: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient) 
  {}

  public get<T>(url: string, secure: boolean = true): Observable<any> 
  {
    if(secure)
    {
      return this.call(() => this.http.get(this.BASE_URL + url));
    } else 
    {
      return this.http.get(this.BASE_URL + url);
    }
  }

  public post<T>(url: string, body: T, secure: boolean = true): Observable<any>
  {
    if(secure)
    {
      return this.call(() => this.http.post(this.BASE_URL + url, body));
    } else 
    {
      return this.http.post(this.BASE_URL + url, body);
    }
  }

  public put<T>(url: string, body: T): Observable<any>
  {
    return this.call(() => this.http.put(this.BASE_URL + url, body));
  }

  public delete<T>(url: string): Observable<any>
  {
    return this.call(() => this.http.delete(this.BASE_URL + url));
  }

  public login(user: User): Observable<boolean>
  {
    return this.http.post<any>(this.BASE_URL + 'token', user).pipe(
      map((data: any) => {
        if(data.success)
        {
          const token = data.token;
          user.isAdmin = data.isAdmin;
          sessionStorage.setItem('user', JSON.stringify(user));
          sessionStorage.setItem('id_token', token);
          console.log('TOKEN_RENEWED');
          return true;
        }
        return false;
      }), catchError((res: any) =>
        {
          return of(false);
        })
    );
  }

  public logout(): void
  {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('id_token');
  }

  /**
     * Le but de la méthode call() est de préalablement vérifier si le token existe
     * et s'il n'est pas expiré. S'il est expiré, elle en redemande un nouveau. Ensuite
     * elle exécute la fonction lambda (func) qu'elle a reçue en paramètre et qui, elle,
     * fait réellement appel au serveur via AuthHttp. De cette manière, on peut appeler
     * les méthodes ci-dessus sans se préoccuper de vérifier si le token est encore
     * valide. Cette vérification est faite de manière automatique et transparente pour
     * le code qui utilise ce service.
     */
   private call<T>(func: any): Observable<any> {
      // Récupère le token depuis le sessionStorage
      const token = sessionStorage.getItem('id_token');
      // Si le token n'existe pas ou s'il est expiré ...
      if (!token || this.jwt.isTokenExpired(token)) {
        const user = JSON.parse(sessionStorage.getItem('user') || '');
        return this.http.post<any>(this.BASE_URL + 'token', user).pipe(
          // L'opérateur flatMap permet ici d'enchaîner les requêtes en utilisant
          // le résultat de la première pour effectuer la seconde.
          flatMap((data: any) => {
            if(data.success)
            {
              const token = data.token;
              sessionStorage.setItem('id_token', token);
              console.log('TOKEN_RENEWED');
            }
            return func();
          }));
      }
      return func();
  }
}
