import { Injectable, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataService {

   // http options used for making API calls
   private httpOptions: any;
 
   // the actual JWT token
   public token: string;
  
   // the token expiration date
   public token_expires: Date;
  
   // the username of the logged in user
   public username: string;
  
   // error messages received from the login attempt
   public errors: any = [];

  constructor(
    private router: Router,
    private _ngZone: NgZone,
    private http: HttpClient,
    ) {
      this.httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
      };
    }

  userdata  
  storedata
  postdata

    // Uses http.post() to get an auth token from djangorestframework-jwt endpoint
    public login(user) {
      this.http.post('http://127.0.0.1:8000/api-token-auth/', JSON.stringify(user), this.httpOptions).subscribe(
        data => {
          this.updateData(data['token']);
        },
        err => {
          this.errors = err['error'];
        }
      );
    }
   
    // Refreshes the JWT token, to extend the time the user is logged in
    public refreshToken() {
      this.http.post('http://127.0.0.1:8000/api-token-refresh/', JSON.stringify({token: this.token}), this.httpOptions).subscribe(
        data => {
          this.updateData(data['token']);
        },
        err => {
          this.errors = err['error'];
        }
      );
    }
   
    public logout() {
      this.token = null;
      this.token_expires = null;
      this.username = null;
    }
   
    private updateData(token) {
      this.token = token;
      this.errors = [];
   
      // decode the token to read the username and expiration timestamp
      const token_parts = this.token.split(/\./);
      const token_decoded = JSON.parse(window.atob(token_parts[1]));
      this.token_expires = new Date(token_decoded.exp * 1000);
      this.username = token_decoded.username;
    }

  setLdata(data) {
    localStorage.setItem('ldata',data)
  }

  getLdata() {
    return localStorage.getItem('ldata')
  }

  setuserdata(data) {
    this.userdata = data
  }

  getuserdata() {
    return this.userdata
  }

  setstoredata(data) {
    this.storedata = data
  }

  getstoredata() {
    return this.storedata
  }

  setpostdata(data) {
    this.postdata = data
  }

  getpostdata() {
    return this.postdata
  }
  
 }
