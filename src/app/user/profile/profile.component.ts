import { Component, OnInit, NgZone } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  httpOptions
  buttonc
  instagram_id
  facebookid
  recipient_name
  bank_name
  account_number
  ifsc_code
  mobileno
  pincode
  city
  email
  state
  name
  address
  rcode
  userdata = JSON.parse(this.data.getuserdata()).name
  uid
  contactno
  dob
  gender
  age
  tnc

  constructor(
    private data : DataService,
    private _ngZone: NgZone,
    private http: HttpClient,
  ) {
    this.httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization' : 'Token 38e461e6f3a9951556d082e535b86c6d5f1c8c20'})
    };
  }

  url = "http://partnerapi.andme.in/andme/user" 
  gID
  gIDe

  
  update() {
    this.http.put('http://partnerapi.andme.in/andme/upreguser/'+this.email, 
    {
      account_number: this.account_number,
      address: this.userdata.address,
      bank_name: this.bank_name,
      city_name: this.userdata.city_name,
      discount: this.userdata.discount,
      dob: this.userdata.dob,
      email: this.userdata.email,
      fb_link: this.facebookid,
      gender: this.userdata.gender,
      google_id: this.userdata.google_id,
      ifsc_code: this.ifsc_code,
      insta_link: this.instagram_id,
      margin: this.userdata.margin,
      mobile_number: this.userdata.mobile_number,
      name: this.userdata.name,
      pin_code: this.userdata.pin_code,
      recipient_name: this.recipient_name,
      referral_code: this.userdata.referral_code,
      state: this.userdata.state
    }, this.httpOptions)
      .subscribe(
        data => {
          // console.log(data)
          alert("Your profile has been updated successfully")
        },
        error => {
          alert(JSON.stringify(error))
        }
    )
    // console.log("update")
  }

  ngOnInit() {
    if(this.data.getLdata()) {
      this.gID = JSON.parse(this.data.getLdata()).uidg
      this.http.get(this.url+'/'+this.gID)
        .subscribe(
          data => {
            this.userdata = data
            // console.log(this.userdata)
            this.email = this.userdata.email
            this.instagram_id = this.userdata.insta_link
            this.facebookid = this.userdata.fb_link
          },
          error => {
            alert("You need to be a registered partner to login. To become a registered partner you need to apply here http://localhost:4200/apply");
          }
        )
    }
    else if(this.data.getnldata()) {
      this.gIDe = JSON.parse(this.data.getnldata()).name
      this.http.get('http://partnerapi.andme.in/andme/normuser/'+this.gIDe)
        .subscribe(
          data => {
            this.userdata = data
            // console.log(this.userdata)
            this.instagram_id = this.userdata.insta_link
            this.facebookid = this.userdata.fb_link
          },
          error => {
            alert("You need to be a registered partner to login. To become a registered partner you need to apply here http://localhost:4200/apply");
          }
        )
    }
  }

}