import { Component, OnInit, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataService } from 'src/app/data.service';
import { Router } from '@angular/router';
import * as moment from 'moment';


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

  ninety = moment().subtract(90, 'days').format()
  httpOptions
  applications
  registered
  dateoption = "Today"
  datestart
  dateend = moment().format()
  disabled
  newlist = []
  orderlist = []
  codelist = []
  codeorders = []
  deta
  codebucket = []


  select() {
    this.orderlist = []
    this.codelist = []
    this.codeorders = []
    this.disabled = true
    switch(this.dateoption) {
      case "Today":
        this.datestart = moment().startOf('day').format()
        this.dateend = moment().endOf('day').format()
        break
      case "Yesterday":
        this.datestart = moment().subtract(1, 'day').startOf('day').format()
        this.dateend = moment().subtract(1, 'day').endOf('day').format()
        break
      case "Last 7 days":
        this.datestart = moment().subtract(7, 'days').format()
        break
      case "Last 30 days":
        this.datestart = moment().subtract(30, 'days').format()
        break
      case "Last 90 days":
        this.datestart = moment().subtract(90, 'days').format()
        break
      default:
        // console.log("def")
    }
    this.changer(this.datestart, this.dateend)
  }

  changer(datestart, dateend) {
    // console.log(datestart, dateend)
    var i = 0
    var current = moment(this.newlist[0].created_at)
    while(current.isBetween(datestart, dateend)&&i<(this.newlist.length-1)) {
      this.orderlist.push(this.newlist[i])
      i = i + 1
      current = moment(this.newlist[i].created_at)
    }
    // console.log(i)
    // console.log(this.orderlist)
    // console.log(current.format())
    for(var j of this.codebucket) {
      // console.log(j.code)
      this.codeorders.push(this.orderlist.filter(item => {if(item.discount_codes.length&&item.discount_codes[0].code==j.code) {return item} else {return false}}))
    }
    // console.log(this.codeorders)
    for(var i=0; i<this.codeorders.length; i++) {
      for(var k = 0; k<this.codeorders[i].length; k++) {
        // console.log(this.codeorders[i][k].subtotal_price)
        this.codebucket[i].sale += parseFloat(this.codeorders[i][k].subtotal_price)
      }
      this.codebucket[i].sale = this.codebucket[i].sale.toFixed(2)
      this.codebucket[i].margin = (this.codebucket[i].sale*this.codebucket[i].marginper/100).toFixed(2)
      // if(this.codeorders[i].length) {
      //   this.codebucket[i].sale = this.codeorders[i].reduce((a, b) => parseFloat(a.subtotal_price) + parseFloat(b.subtotal_price)).toFixed(2)
      //   this.codebucket[i].margin = ((this.codeorders[i].reduce((a, b) => parseFloat(a.subtotal_price) + parseFloat(b.subtotal_price)))*(this.codebucket[i].marginper/100)).toFixed(2)
      // }
    }
    // console.log(this.codebucket)
    this.disabled = false
  }

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
            // console.log(data)
            this.registered = data['registered'].reverse()
            for(var i of data['registered']) {
              this.codebucket.push({code: i['referral_code'], marginper:i['margin'], sale: 0, margin: 0})
            }
            // console.log(this.codebucket)
          },
          error => {
            alert(JSON.stringify(error))
          }
        )

        this.http.get('http://partnerapi.andme.in/andme/getorder/'+this.ninety)
          .subscribe(
            data => {
              // console.log(data)
              this.deta = data
              for(var i = 0; i<this.deta.length; i++) {
                this.newlist.push(...(data[i].orders))
              }
              // console.log(this.newlist)
              this.select()
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
          // console.log(data)
        },
        error => {
          alert(JSON.stringify(error))
        }
      )
      
    this.http.delete('http://partnerapi.andme.in/andme/deluserapp/'+email, this.httpOptions)
    .subscribe(
      data => {
        // console.log(data)
      },
      error => {
        alert(JSON.stringify(error))
      }
    )
    // console.log(email)
    // console.log("removed")
  }

  showapp() {
    document.getElementById('registered').style.display = "none"
    document.getElementById('applications').style.display = "block"
  }

  showreg() {
    document.getElementById('applications').style.display = "none"
    document.getElementById('registered').style.display = "block"
  }

}
