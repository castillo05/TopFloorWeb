import { User } from './../models/user.model';
import { Global } from './global';
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public urlBase: string;
  public token;
  public identity;

  constructor(private http: HttpClient) {
    this.urlBase = Global.url;
    console.log(this.urlBase);
   }

   singin(user,gethash=null){
     if(gethash != null) {
       user.gethash=gethash;
     }
    const json = JSON.stringify(user);
    const params = json;
    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    return this.http.post(this.urlBase+'singin',params,{headers});
   }

   singup(user: User){


     const json = JSON.stringify(user);
     const params = json;
     const headers = new HttpHeaders({'Content-Type': 'application/json'});

     return this.http.post(this.urlBase+'singup',params,{headers});

   }

    // Obtener Token y Identity
    getIdentity() {

         const identity = JSON.parse(localStorage.getItem('identity'));
          if (identity != 'undefined') {
              this.identity = identity;
          } else {
              this.identity = null;
          }
          return this.identity;


  }


  getToken() {
          const token = localStorage.getItem('token');
          if (token != 'undefined') {
              this.token = token;
          } else {
              this.token = null;
          }
          return this.token;
      }



}
