import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

email
type
details = {}
newdetails = {}
updateddetails = {}
httpOptions
discountcode
priceruleid = 649851404390

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private _ngZone: NgZone,
    private router: Router,
    private data: DataService
  ) { 
    this.httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization' : 'Token 38e461e6f3a9951556d082e535b86c6d5f1c8c20'})
    };
  }

  ngOnInit() {
    if(this.data.getadata()) {
      this.route.params.subscribe(
        params => {
          this.type = params.type
          this.email = params.email
        }
      );

      if(this.type=="app") {
        this.http.get('http://127.0.0.1:8000/andme/appuser/'+ this.email)
          .subscribe(
            data => {
              this.details = data
              this.newdetails = data
              this.newdetails['discount'] = 5
              this.newdetails['referral_code'] = data['name'].split(' ')[0].substr(0,3)+data['name'].split(' ')[1].substr(0,3)+(this.newdetails['discount']).toString()
              this.newdetails['margin'] = 5
            },
            error => {
              alert(JSON.stringify(error))
            }
          )
      }
      else {
        this.http.get('http://127.0.0.1:8000/andme/reguser/'+ this.email)
          .subscribe(
            data => {
              this.details = data
              this.updateddetails = data
            },
            error => {
              alert(JSON.stringify(error))
            }
          )
      }
    }
    else {
      this._ngZone.run(() => this.router.navigate(['/home'] ));
    }

  }

  selectid() {
    switch(this.updateddetails['discount']) {
      case 5:
        this.priceruleid = 649851404390
        break
      case 10:
        this.priceruleid = 649853304934
        break
      case 15:
        this.priceruleid = 649853403238
        break
      default:
        this.priceruleid = 649851404390
    }
  }

  approve() {
    this.details['accepted'] = true
    this.http.put('http://127.0.0.1:8000/andme/upappuser/'+this.email, this.details, this.httpOptions)
      .subscribe(
        data => {
        },
        error => {
          alert(JSON.stringify(error))
        }
      )
    this.http.post('http://127.0.0.1:8000/andme/newuser/', this.newdetails, this.httpOptions)
      .subscribe(
        data => {
          this._ngZone.run(() => {
            alert("User has been approved and registered. Go to the list of registered users to edit details.")
            this.router.navigate(['/admin-panel/list']);
        });
        },
        error => {
          alert(JSON.stringify(error))
        }
      )
  }

  update() {
    this.http.put('http://127.0.0.1:8000/andme/upreguser/'+this.email, this.updateddetails, this.httpOptions)
      .subscribe(
        data => {
          alert("All changes have been saved.")
          this._ngZone.run(() => this.router.navigate(['/admin-panel/list'] ));
        },
        error => {
          alert(JSON.stringify(error))
        }
      )
  }

  createcode() {
    this.discountcode = {
      "discount_code": {
        "code": this.updateddetails['referral_code']
      }
    }
    this.http.post('http://127.0.0.1:8000/andme/discountcode/'+this.priceruleid, this.discountcode, this.httpOptions)
      .subscribe(
        data => {
          alert("Code created. Please click on update to save changes.")
        },
        error => {
          alert(JSON.stringify(error))
        }
      )
    document.getElementById('nc').style.display = "none"
    document.getElementById('upd').style.display = "block"
  }

}
