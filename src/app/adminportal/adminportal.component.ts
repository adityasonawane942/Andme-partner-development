import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-adminportal',
  templateUrl: './adminportal.component.html',
  styleUrls: ['./adminportal.component.css']
})
export class AdminportalComponent implements OnInit {

  constructor(
    private _ngZone: NgZone,
    private router: Router,
    private http: HttpClient,
    private data: DataService
  ) { }

  pass
  get = this.data.getadata()

  ngOnInit() {
  }

  login() {
    this.data.setadata(this.pass)
    this.http.get('http://partnerapi.andme.in/superuser/'+this.pass)
      .subscribe(
        data => {
          this.get = this.data.getadata()
          this._ngZone.run(() => this.router.navigate(['/admin-panel/list'] ));
        },
        error => {
          this._ngZone.run(() => this.router.navigate(['/home'] ));
        }
      )
  }

  logout() {
    localStorage.removeItem('adata')
    this._ngZone.run(() => this.router.navigate(['/home'] ));
  }

}
