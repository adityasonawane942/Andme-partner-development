import { Component, OnInit, NgZone } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-applyform',
  templateUrl: './applyform.component.html',
  styleUrls: ['./applyform.component.css']
})
export class ApplyformComponent implements OnInit {

  public addArray: Add[] = [];

  constructor(
    private data : DataService,
    private _ngZone: NgZone,
    private router: Router,
    private http: HttpClient,
  ) { 
    this.http.get('assets/Pincode District State.csv', {responseType: 'text'})
    .subscribe(
        data => {
            let csvToRowArray = data.split("\n");
            for (let index = 1; index < csvToRowArray.length - 1; index++) {
              let row = csvToRowArray[index].split(",");
              this.addArray.push(new Add( parseInt( row[0], 10), row[1], row[2].trim()));
            }
            console.log(this.addArray);
        },
        error => {
            console.log(error);
        }
    );
    
    this.httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization' : 'Token 38e461e6f3a9951556d082e535b86c6d5f1c8c20'})
    };
  }  

  httpOptions
  name
  email
  uid
  contactno
  dob
  gender
  address
  city
  state
  pincode
  age=false
  tnc=false
  form = new FormGroup({});

  ngOnInit() {
    try {
    this.name = JSON.parse(this.data.getLdata()).name
    this.email = JSON.parse(this.data.getLdata()).email
    this.uid = JSON.parse(this.data.getLdata()).uidg
    }
    catch {
      this.name = ''
      this.email = ''
      this.uid = ''
    }
    console.log(this.age)
    console.log(this.tnc)
  }

  ticka() {
    this.age = !this.age;
    console.log(this.age)
  }

  tickt() {
    this.tnc = !this.tnc;
    console.log(this.tnc)
  }

  change = (event) => {
    console.log(event.target.value)
    var pin = event.target.value;
    var result = this.addArray.find(obj => {
      return obj.pincode == pin;
    });
    console.log(result)
    this.state = result.state;
    this.city = result.district;
  }

  submit() {
    if(this.age && this.tnc) {
    this.http.post("http://partnerapi.andme.in/andme/apply",{
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
    age: this.age,
    tnc: this.tnc
  }, this.httpOptions).subscribe(
    result =>{
      console.log(result)
      alert("Your details have been recorded. Futher details will be mailed to you.")
      this._ngZone.run(() => this.router.navigate(['/home'] ));
    },
    error => {
      console.log(error)
      alert(JSON.stringify(error["error"]))
    },
    () => {}
  );
}
else {
  alert("Please confirm you are 18+ and accept the T&C")
}
  }
}

export class Add{
  pincode: number;
  district: String;
  state: String;

  constructor(pincode: number, district: String, state: String){
    this.pincode = pincode;
    this.district = district;
    this.state = state;
  }
}