import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';

@Component({
  selector: 'app-updates',
  templateUrl: './updates.component.html',
  styleUrls: ['./updates.component.css']
})
export class UpdatesComponent implements OnInit {
  deta
  margin
  newlist = []
  codelist = []
  foundcode = []
  foundorder = []
  price = []
  dates = []
  finaldata = []
  finaldatamargin = []
  total_price
  total_margin
  date = moment().startOf('day').format()

  constructor(
    private data: DataService,
    private http: HttpClient
  ) { }

links = this.data.getpostdata()

formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'INR',
});


  ngOnInit() { 
    this.http.get('http://partnerapi.andme.in/andme/orders/' + this.date)
    .subscribe(
      data => {
        // console.log(data);
        this.deta = data
        this.margin = (JSON.parse(this.data.getuserdata()).margin)/100
        // console.log(this.margin)
        for(var i = 0; i<this.deta.length; i++) {
          this.newlist.push(...(data[i].orders))
        }
        // console.log(this.newlist)
        for(i of this.newlist) {
          if(i['discount_codes'].length) {
            this.codelist.push(...i['discount_codes'])
          }
        }
        // console.log(this.codelist)
        // console.log(this.data.getuserdata().referral_code)
        this.foundcode = this.codelist.filter(item => item.code==JSON.parse(this.data.getuserdata()).referral_code)
        // this.foundcode = this.codelist.filter(item => item.code==this.data.getuserdata().referral_code)
        // console.log(this.foundcode)
        for(var i=0; i<this.foundcode.length; i++) {
          this.foundorder.push(this.newlist.filter(item => item.discount_codes[0]==this.foundcode[i])[0])
        }
        // console.log(this.foundorder)
        this.price = this.foundorder.map(res => parseFloat(res.subtotal_price))
        // console.log(this.price.reverse())
        this.dates = this.foundorder.map(res => moment(res.created_at).format('LLL'))
        this.dates = this.dates.reverse()
        // console.log(this.dates.reverse())
        for(var i=0; i<this.dates.length-1; i++) {
          if(this.dates[i].substr(0,13)==this.dates[i+1].substr(0,13)) {
            // console.log(this.dates[i].substr(0,13))
            // console.log(this.dates[i+1].substr(0,13))
            // console.log(new Date(this.dates[i].substr(0,13)).toDateString())
            this.dates.splice(i, 0, moment(this.dates[i]).format('LLL'))
            // console.log(this.dates)
            this.dates.splice(i,2)
            // console.log(this.dates)
            // console.log(this.price[this.price.length - i-1])
            // console.log(this.price[this.price.length - i-2])
            // console.log(this.price[this.price.length - i-1] + this.price[this.price.length - i-2])
            this.price.splice(this.price.length - i, 0,this.price[this.price.length - i-1] + this.price[this.price.length - i-2])
            // console.log(this.price)
            this.price.splice(this.price.length - i-3,2)
            // console.log(this.price)
          }
        }
        // this.dater(7)
        for(var i=0; i<this.price.length; i++) {
          this.finaldata.push({x: new Date(this.dates[this.dates.length - i - 1]).toDateString(), y: this.price[i].toFixed(2)})
          this.finaldatamargin.push({x: new Date(this.dates[this.dates.length - i - 1]).toDateString(), y: (this.price[i]*this.margin).toFixed(2)})
        }
        this.total_price = this.price.reduce((a, b) => a + b, 0).toFixed(2)
        this.total_price = this.formatter.format(this.total_price)
        this.total_margin = (this.price.reduce((a, b) => a + b, 0)*this.margin).toFixed(2)
        this.total_margin = this.formatter.format(this.total_margin)
      },
      error => {
        alert(JSON.stringify(error))
      }
    )

    if(this.links) {
      document.getElementById('one').style.display = "none"
      for(var i=0; i<10; i++) {
        document.getElementById(i.toString()).innerHTML = '<div style="border: 0px;" class="card"><img style="width: 100%; border-radius: 15px;" src="'+ this.links[i].media +'" /><a href="'+ this.links[i].url +'" target="_blank" class="stretched-link"></a></div>'
        document.getElementsByTagName('img')[i].onerror = function () {
          this.src = '../../../assets/photos/1_600x.png'
          document.getElementsByTagName('a')[i].setAttribute('href','https://www.instagram.com/andme.in/')
        };
      }
    }
    else {
      setTimeout(() => { 
        document.getElementById('one').style.display = "none"
        this.links = this.data.getpostdata()
        for(var i=0; i<10; i++) {
          document.getElementById(i.toString()).innerHTML = '<div style="border: 0px;" class="card"><img style="width: 100%; border-radius: 15px;" src="'+ this.links[i].media +'" /><a href="'+ this.links[i].url +'" target="_blank" class="stretched-link"></a></div>'
          document.getElementsByTagName('img')[i].onerror = function () {
            this.src = '../../../assets/photos/1_600x.png';
            document.getElementsByTagName('a')[i].setAttribute('href','https://www.instagram.com/andme.in/')
          };
        }
      }, 5000);
    }
  }

}
