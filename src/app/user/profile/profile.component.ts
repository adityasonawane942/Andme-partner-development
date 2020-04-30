import { Component, OnInit, NgZone } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(
    private data : DataService,
    private _ngZone: NgZone,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  logout() {
    localStorage.removeItem('ldata');
    console.log("loggedout")
    this._ngZone.run(() => this.router.navigate(['/home'] ));
  }

}
