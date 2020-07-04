import { Component, OnInit, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataService } from 'src/app/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(
    private _ngZone: NgZone,
    private router: Router,
    private http: HttpClient,
    private data: DataService
    ) {
      this.httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization' : 'Token 38e461e6f3a9951556d082e535b86c6d5f1c8c20'})
      };
     }

  httpOptions
  applications
  registered

  ngOnInit() {
    if(this.data.getadata()) {
      this.http.get('http://partnerapi.andme.in/andme/applist')
        .subscribe(
          data => {
            this.applications = data['applications'].reverse()
          },
          error => {
            alert(JSON.stringify(error))
          }
        )

      this.http.get('http://partnerapi.andme.in/andme/reglist')
        .subscribe(
          data => {
            this.registered = data['registered'].reverse()
          },
          error => {
            alert(JSON.stringify(error))
          }
        )
    }
    else {
      this._ngZone.run(() => this.router.navigate(['/home'] ));
    }
  }

  remover(email) {
    this.http.delete('http://partnerapi.andme.in/andme/delreguser/'+email, this.httpOptions)
      .subscribe(
        data => {
          console.log(data)
        },
        error => {
          alert(JSON.stringify(error))
        }
      )
    console.log(email)
    console.log("removed")
  }

  showapp() {
    document.getElementById('registered').style.display = "none"
    document.getElementById('applications').style.display = "block"
  }

  showreg() {
    document.getElementById('applications').style.display = "none"
    document.getElementById('registered').style.display = "block"
  }

  showpricerule() {
    document.getElementById('applications').style.display = "none"
    document.getElementById('registered').style.display = "none"
  }

}
