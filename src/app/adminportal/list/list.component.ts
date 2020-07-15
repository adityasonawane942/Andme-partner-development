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
  customdatestart
  customdateend
  disabled
  newlist = []
  orderlist = []
  codelist = []
  codeorders = []
  deta
  codebucket = []

  go() {
    this.datestart = this.customdatestart
    console.log(this.datestart)
    this.dateend = this.customdateend
    console.log(this.dateend)
    this.orderlist = []
    this.codelist = []
    this.codeorders = []
    this.dateoption = "custom"
    if(this.customdatestart!=null&&this.customdateend!=null) {
      console.log("changer")
      this.changer(this.datestart, this.dateend)
    }
    else {
      alert("Please select a range")
    }
  }

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
        this.dateend = moment().format()
        break
      case "Last 30 days":
        this.datestart = moment().subtract(30, 'days').format()
        this.dateend = moment().format()
        break
      case "Last 90 days":
        this.datestart = moment().subtract(90, 'days').format()
        this.dateend = moment().format()
        break
      default:
        // console.log("def")
    }
    this.changer(this.datestart, this.dateend)
  }

  changer(datestart, dateend) {
    console.log(datestart, dateend)
    var i = 0
    var j = 0
    var current = moment(this.newlist[0].created_at)
    console.log(current)
    if(datestart==moment().subtract(1, 'day').startOf('day').format()) {
      console.log("IN")
      while(current.isSameOrAfter(moment().subtract(1, 'day').endOf('day').format())) {
        j = j + 1
        console.log(j)
        current = moment(this.newlist[j].created_at)
        console.log(current)
      }
    }
    else if(this.dateoption=="custom") {
      console.log("IN2")
      while(current.isSameOrAfter(dateend)) {
        j = j + 1
        console.log(j)
        current = moment(this.newlist[j].created_at)
        console.log(current)
      }
    }
    console.log(current)
    while(current.isBetween(datestart, dateend)&&i<(this.newlist.length-1)) {
      // console.log(i)
      this.orderlist.push(this.newlist[j+i])
      i = i + 1
      current = moment(this.newlist[j+i].created_at)
    }
    console.log(i)
    console.log(this.orderlist)
    console.log(current.format())
    for(var l of this.codebucket) {
      // console.log(l.code)
      this.codeorders.push(this.orderlist.filter(item => {if(item.discount_codes.length&&item.discount_codes[0].code==l.code) {return item} else {return false}}))
    }
    console.log(this.codeorders)
    for(var i=0; i<this.codeorders.length; i++) {
      this.codebucket[i].sale = 0
      this.codebucket[i].margin = 0
      for(var k = 0; k<this.codeorders[i].length; k++) {
        console.log(this.codeorders[i][k].subtotal_price)
        this.codebucket[i].sale += parseFloat(this.codeorders[i][k].subtotal_price)
      }
      this.codebucket[i].sale = this.codebucket[i].sale.toFixed(2)
      this.codebucket[i].margin = (this.codebucket[i].sale*this.codebucket[i].marginper/100).toFixed(2)
    }
    console.log(this.codebucket)
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

        if(!this.data.getcodebucketdata()||!this.data.getreglistdata()) {
      this.http.get('http://partnerapi.andme.in/andme/reglist')
        .subscribe(
          data => {
            // console.log(data)
            this.registered = data['registered'].reverse()
            this.data.setreglistdata(this.registered)
            for(var i of data['registered']) {
              this.codebucket.push({code: i['referral_code'], marginper:i['margin'], sale: 0, margin: 0})
            }
            // console.log(this.codebucket)
            this.data.setcodebucketdata(this.codebucket)
          },
          error => {
            alert(JSON.stringify(error))
          }
        )
        }
        else {
          this.registered = this.data.getreglistdata()
          console.log(this.registered)
          this.codebucket = this.data.getcodebucketdata()
          console.log(this.codebucket)
        }

      if(!this.data.getorderdata()) {
      this.http.get('http://partnerapi.andme.in/andme/getorder/'+this.ninety)
        .subscribe(
          data => {
            // console.log(data)
            this.deta = data
            this.data.setorderdata(data)
            for(var i = 0; i<this.deta.length; i++) {
              this.newlist.push(...(data[i].orders))
            }
            console.log(this.newlist)
            this.select()
            document.getElementById('loader-1').style.display = "none"
          },
          error => { 
            alert(JSON.stringify(error))
          }
        )
      }
      else {
        this.deta=this.data.getorderdata()
        console.log("DETA")
        for(var i = 0; i<this.deta.length; i++) {
          this.newlist.push(...(this.deta[i].orders))
        }
        console.log(this.newlist)
        this.select()
        document.getElementById('loader-1').style.display = "none"
      }
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
