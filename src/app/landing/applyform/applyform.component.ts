import { Component, OnInit, NgZone } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-applyform',
  templateUrl: './applyform.component.html',
  styleUrls: ['./applyform.component.css']
})
export class ApplyformComponent implements OnInit {

  constructor(
    private data : DataService,
    private _ngZone: NgZone,
    private router: Router,
    private http: HttpClient,
  ) { }

  name = JSON.parse(this.data.getLdata()).name
  email = JSON.parse(this.data.getLdata()).email
  uid = JSON.parse(this.data.getLdata()).uid
  contactno
  dob
  gender
  address
  city
  state
  pincode
  age
  tnc
  form = new FormGroup({});

  ngOnInit() {

  }

  submit() {
    this.http.post("http://127.0.0.1:8000/andme/apply",{
    name: this.name,
    google_id: this.uid,
    mobile_number: this.contactno,
    email: this.email,
    dob: this.dob,
    gender: this.gender,
    address: this.address,
    city_name: this.city,
    pin_code: this.pincode,
    state: this.state,
  }).subscribe(
    result =>{
      console.log(result)
      alert("Your details have been recorded. Futher details will be mailed to you.")
      this._ngZone.run(() => this.router.navigate(['/home'] ));
    },
    error => {
      console.log(error)
      // alert(JSON.stringify(error["error"]))
    },
    () => {}
  );
}

}
