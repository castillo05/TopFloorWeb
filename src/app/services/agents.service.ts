import { Global } from './global';
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AgentsService {

  public urlBase: string;
  public token;
  public identity;

  constructor(private http: HttpClient) {
    this.urlBase = Global.url;
   }

   trasferData(token){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    });

    return this.http.get(this.urlBase+'agents',{headers});
   }

   getAgents(token){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    });

    return this.http.get(this.urlBase+'agentsinformation',{headers});
   }
}
