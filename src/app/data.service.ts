import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

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
}
