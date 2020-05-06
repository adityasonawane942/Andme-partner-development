import { Injectable, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
// import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private router: Router,
    private _ngZone: NgZone,
    private http: HttpClient,
    ) {
    this.httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
  }

  dailyForecast() {
    return JSON.stringify({"message":"","cod":"200","city_id":2643743,"calctime":0.0875,"cnt":3,"list":[{"main":{"temp":279.946,"temp_min":279.946,"temp_max":279.946,"pressure":1016.76,"sea_level":1024.45,"grnd_level":1016.76,"humidity":100},"wind":{"speed":4.59,"deg":163.001},"clouds":{"all":92},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10n"}],"rain":{"3h":2.69},"dt":1485717216},{"main":{"temp":282.597,"temp_min":282.597,"temp_max":282.597,"pressure":1012.12,"sea_level":1019.71,"grnd_level":1012.12,"humidity":98},"wind":{"speed":4.04,"deg":226},"clouds":{"all":92},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10n"}],"rain":{"3h":0.405},"dt":1485745061},{"main":{"temp":279.38,"pressure":1011,"humidity":93,"temp_min":278.15,"temp_max":280.15},"wind":{"speed":2.6,"deg":30},"clouds":{"all":90},"weather":[{"id":701,"main":"Mist","description":"mist","icon":"50d"},{"id":741,"main":"Fog","description":"fog","icon":"50d"}],"dt":1485768552}]})
  }

  setLdata(data) {
    localStorage.setItem('ldata',data)
  }

  getLdata() {
    return localStorage.getItem('ldata')
  }

  setjdata(data) {
    localStorage.setItem('jdata',data)
  }

  getjdata() {
    return localStorage.getItem('jdata')
  }

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
  

  
   // Uses http.post() to get an auth token from djangorestframework-jwt endpoint
   public login(user) {
     this.http.post('http://127.0.0.1:8000/api-token-auth/', JSON.stringify(user), this.httpOptions).subscribe(
       data => {
         this.updateData(data['token']);
         this._ngZone.run(() => this.router.navigate(['/user/profile']));
       },
       err => {
         this.errors = err['error'];
         alert("You need to be a registered partner to login. To become a registered partner you need to apply here http://localhost:4200/apply");
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
     this._ngZone.run(() => this.router.navigate(['/home'] ));
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
  
 }
