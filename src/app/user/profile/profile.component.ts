import { Component, OnInit, NgZone } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  buttonc
  update() {
    console.log("update")
  }
  instagram_id
  facebookid
    mobileno
    pincode
    city
    email
    state
    name
    address
    // dob
    rcode
  userdata

  constructor(
    private data : DataService,
    private _ngZone: NgZone,
    private router: Router,
    private http: HttpClient,
  ) { }

  url = "http://127.0.0.1:8000/andme/user" 
  gID

  ngOnInit() {
    this.gID = JSON.parse(this.data.getLdata()).uid

    if(this.data.getuserdata()) {
    this.userdata = this.data.getuserdata()
    }
    else {
      this.http.get(this.url+'/'+this.gID)
      .subscribe(
        data => {
          this.data.setuserdata(data)
          this.userdata = data
          this._ngZone.run(() => this.router.navigate(['/user/profile']));
        },
        error => {
          alert("You need to be a registered partner to login. To become a registered partner you need to apply here http://localhost:4200/apply");
        }
      )
    }
  }

}
