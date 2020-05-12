import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private router: Router,
    private _ngZone: NgZone,
    private http: HttpClient,
    ) {}

  userdata  
  storedata

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
  
 }
