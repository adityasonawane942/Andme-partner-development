import { Injectable, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { error } from 'protractor';

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

  nudata
  userdata  
  storedata
  postdata
  adata
  orderdata
  codebucketdata
  reglistdata

    // Uses http.post() to get an auth token from djangorestframework-jwt endpoint
    public login(user) {
      this.http.post('http://partnerapi.andme.in/api-token-auth/', JSON.stringify(user), this.httpOptions).subscribe(
        data => {
          this.updateData(data['token']);
          this.setnldata(JSON.stringify({
            'name': user.username,
            'uidn': data['token']
          }));
          this.http.get('http://partnerapi.andme.in/andme/normuser/'+user.username)
            .subscribe(
              data => {
                // console.log(data)
                this._ngZone.run(() => this.router.navigate(['/user/updates']));
              },
              error => {
                // console.log(error)
                this._ngZone.run(() => this.router.navigate(['/form']));
              }
            )
        },
        err => {
          // console.log(err)
          if(err.error.non_field_errors) {
            alert("Please provide correct credentials.")
          }
          else {
            alert("You need to be a registered partner to login. To become a registered partner you need to apply here http://localhost:4200/apply");
          }
          this.errors = err['error'];
        }
      );
    }
   
    // Refreshes the JWT token, to extend the time the user is logged in
    public refreshToken() {
      this.http.post('http://partnerapi.andme.in/api-token-refresh/', JSON.stringify({token: this.token}), this.httpOptions).subscribe(
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

  setnldata(data) {
    localStorage.setItem('nldata',data)
  }

  getnldata() {
    return localStorage.getItem('nldata')
  }

  setuserdata(data) {
    localStorage.setItem('udata', JSON.stringify(data))
  }

  getuserdata() {
    return localStorage.getItem('udata')
  }

  setadata(data) {
    localStorage.setItem('adata',data)
  }

  getadata() {
    return localStorage.getItem('adata')
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
  
  setorderdata(data) {
    this.orderdata = data
  }

  getorderdata() {
    return this.orderdata
  }
  
  setcodebucketdata(data) {
    this.codebucketdata = data
  }

  getcodebucketdata() {
    return this.codebucketdata
  }
  
  setreglistdata(data) {
    this.reglistdata = data
  }

  getreglistdata() {
    return this.reglistdata
  }

 }
