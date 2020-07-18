import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { Chart } from 'chart.js';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as moment from 'moment';

@Component({
  selector: 'app-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.css']
})
export class PerformanceComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private data: DataService
  ) {
    this.httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization' : 'Token 38e461e6f3a9951556d082e535b86c6d5f1c8c20'})
    };
  }

  httpOptions
  email
  neworders
  neworderlist = []
  datestart = moment().startOf('day').format()
  dateend = moment().endOf('day').format()
margin
res
chart
charttwo
deta
newlist = []
codelist = []
foundcode = []
foundorder = []
price = []
total_price
total_margin
dates = []
datesfortable = []
days = []
finaldata = []
finaldatamargin = []
dateoption = "Today"
datefinal = moment().startOf('day').format()
unit = 'hour'
steps = 3
today = []
yesterday = []
last7days = []
last30days = []
last90days = []
disabled = false
formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'INR',
});

updateddetails = {}

datesetter() {
  var todaystart = moment().startOf('day')
  for(var i=0; i<24; i++) {
    this.today.push({x: todaystart.add(1, 'hour').toISOString(), y: 0})
  }
  // console.log(this.today)
  var startyesterday = moment().subtract(1, 'day').startOf('day')
  for(var i=0; i<24; i++) {
    this.yesterday.push({x: startyesterday.add(1, 'hour').toISOString(), y: 0})
  }
  // console.log(this.yesterday)
  var start7day = moment().subtract(7, 'days')
  for(var i=0; i<7; i++) {
    this.last7days.push({x: start7day.add(1, 'day').toISOString(), y: 0})
  }
  // console.log(this.last7days)
  var start30day = moment().subtract(30, 'days')
  for(var i=0; i<30; i++) {
    this.last30days.push({x: start30day.add(1, 'day').toISOString(), y: 0})
  }
  // console.log(this.last30days)
  var start90day = moment().subtract(90, 'days')
  for(var i=0; i<90; i++) {
    this.last90days.push({x: start90day.add(1, 'day').toISOString(), y: 0})
  }
  // console.log(this.last90days)
}

  ninety = moment().subtract(90, 'days').format()
  codeorders = []
  orderlist = []
 
  ngOnInit() {
    this.datesetter()
    // console.log(this.price)
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
            // console.log(this.newlist)
            this.changer(this.datestart, this.dateend, this.unit, this.steps)
            document.getElementById('loader-1').style.display = "none"
          },
          error => { 
            alert(JSON.stringify(error))
          }
        )
      }
      else {
        this.deta=this.data.getorderdata()
        // console.log("DETA")
        for(var i = 0; i<this.deta.length; i++) {
          this.newlist.push(...(this.deta[i].orders))
        }
        // console.log(this.newlist)
            this.changer(this.datestart, this.dateend, this.unit, this.steps)
        document.getElementById('loader-1').style.display = "none"
      }
  }

  select() {
    this.codelist = []
    this.foundcode = []
    this.foundorder = []
    this.price = []
    this.dates = []
    this.finaldata = []
    this.finaldatamargin = []
    this.chart.clear()
    this.charttwo.clear()
    this.chart.destroy()
    this.charttwo.destroy()
    document.getElementById('canvas').style.display = "none"
    document.getElementById('canvastwo').style.display = "none"
    this.orderlist = []
    this.codelist = []
    this.codeorders = []
    // this.disabled = true
    switch(this.dateoption) {
      case "Today":
        this.datestart = moment().startOf('day').format()
        this.dateend = moment().endOf('day').format()
        this.unit = 'hour'
        this.steps = 3
        break
      case "Yesterday":
        this.datestart = moment().subtract(1, 'day').startOf('day').format()
        this.dateend = moment().subtract(1, 'day').endOf('day').format()
        this.unit = 'hour'
        this.steps = 3
        break
      case "Last 7 days":
        this.datestart = moment().subtract(7, 'days').format()
        this.dateend = moment().format()
        this.unit = 'day'
        this.steps = 1
        break
      case "Last 30 days":
        this.datestart = moment().subtract(30, 'days').format()
        this.dateend = moment().format()
        this.unit = 'day'
        this.steps = 3
        break
      case "Last 90 days":
        this.datestart = moment().subtract(90, 'days').format()
        this.dateend = moment().format()
        this.unit = 'day'
        this.steps = 9
        break
      default:
        // console.log("def")
    }
    this.changer(this.datestart, this.dateend, this.unit, this.steps)
  }

  changer(datestart, dateend, unit, steps) {
    this.margin = JSON.parse(this.data.getuserdata()).margin/100
    // console.log(datestart, dateend)
    var i = 0
    var j = 0
    var current = moment(this.newlist[0].created_at)
    // console.log(current)
    if(datestart==moment().subtract(1, 'day').startOf('day').format()) {
      // console.log("IN")
      while(current.isSameOrAfter(moment().subtract(1, 'day').endOf('day').format())) {
        j = j + 1
        // console.log(j)
        current = moment(this.newlist[j].created_at)
        // console.log(current)
      }
    }
    else if(this.dateoption=="custom") {
      unit = 'day'
      // console.log("IN2")
      while(current.isSameOrAfter(dateend)) {
        j = j + 1
        // console.log(j)
        current = moment(this.newlist[j].created_at)
        // console.log(current)
      }
    }
    // console.log(current)
    while(current.isBetween(datestart, dateend)&&i<(this.newlist.length-1)) {
      // console.log(i)
      this.orderlist.push(this.newlist[j+i])
      i = i + 1
      current = moment(this.newlist[j+i].created_at)
    }
    // console.log(this.orderlist)
    for(var i=0; i<this.orderlist.length; i++) {
      if(this.orderlist[i].discount_codes.length) {
        if(this.orderlist[i].discount_codes[0].code==JSON.parse(this.data.getuserdata()).referral_code) {
          this.foundorder.push(this.orderlist[i])
        }
      }
    }
    // this.foundorder = this.orderlist.filter(item => item.discount_codes[0].code=="ANDME5")
    // console.log(this.foundorder)
    this.price = this.foundorder.map(res => parseFloat(res.subtotal_price))
        // console.log(this.price.reverse())
        this.dates = this.foundorder.map(res => moment(res.created_at).format('LLL'))
        this.dates = this.dates.reverse()
        this.datesfortable = this.foundorder.map(res => moment(res.created_at).format('LLL'))
        // console.log(this.dates.reverse())
        if((this.dateoption!="Today")&&(this.dateoption!="Yesterday")) {
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
        }
        for(var i=0; i<this.price.length; i++) {
          this.finaldata.push({x: new Date(this.dates[this.dates.length - i - 1]).toISOString(), y: this.price[i].toFixed(2)})
          // console.log(this.price[i])
          // console.log(this.margin)
          // console.log(this.price[i]*this.margin)
          this.finaldatamargin.push({x: new Date(this.dates[this.dates.length - i - 1]).toISOString(), y: (this.price[i]*this.margin).toFixed(2)})
        }
        // console.log(this.finaldata)
        // console.log(this.finaldatamargin)
        switch(this.dateoption) {
          case "Today":
            var listC = this.finaldata.concat(this.today)
            listC.sort((a, b) => {
                return (a.x || a.x).localeCompare((b.x || b.x))
            })
            // console.log(listC)
            this.finaldata = listC
            var listD = this.finaldatamargin.concat(this.today)
            listD.sort((a, b) => {
                return (a.x || a.x).localeCompare((b.x || b.x))
            })
            // console.log(listD)
            this.finaldatamargin = listD
            break
          case "Yesterday":
            var listC = this.finaldata.concat(this.yesterday)
            listC.sort((a, b) => {
                return (a.x || a.x).localeCompare((b.x || b.x))
            })
            // console.log(listC)
            this.finaldata = listC
            var listD = this.finaldatamargin.concat(this.yesterday)
            listD.sort((a, b) => {
                return (a.x || a.x).localeCompare((b.x || b.x))
            })
            // console.log(listD)
            this.finaldatamargin = listD
            break
          case "Last 7 days":
            var listC = this.finaldata.concat(this.last7days)
            listC.sort((a, b) => {
                return (a.x || a.x).localeCompare((b.x || b.x))
            })
            // console.log(listC)
            this.finaldata = listC
            var listD = this.finaldatamargin.concat(this.last7days)
            listD.sort((a, b) => {
                return (a.x || a.x).localeCompare((b.x || b.x))
            })
            // console.log(listD)
            this.finaldatamargin = listD
            break
          case "Last 30 days":
            var listC = this.finaldata.concat(this.last30days)
            listC.sort((a, b) => {
                return (a.x || a.x).localeCompare((b.x || b.x))
            })
            // console.log(listC)
            this.finaldata = listC
            var listD = this.finaldatamargin.concat(this.last30days)
            listD.sort((a, b) => {
                return (a.x || a.x).localeCompare((b.x || b.x))
            })
            // console.log(listD)
            this.finaldatamargin = listD
            break
          case "Last 90 days":
            var listC = this.finaldata.concat(this.last90days)
            listC.sort((a, b) => {
                return (a.x || a.x).localeCompare((b.x || b.x))
            })
            // console.log(listC)
            this.finaldata = listC
            var listD = this.finaldatamargin.concat(this.last90days)
            listD.sort((a, b) => {
                return (a.x || a.x).localeCompare((b.x || b.x))
            })
            // console.log(listD)
            this.finaldatamargin = listD
            break
          default:
            // console.log("def")
        }
        this.total_price = this.price.reduce((a, b) => a + b, 0).toFixed(2)
        this.total_price = this.formatter.format(this.total_price)
        this.total_margin = (this.price.reduce((a, b) => a + b, 0)*this.margin).toFixed(2)
        this.total_margin = this.formatter.format(this.total_margin)
        // console.log(this.finaldata)
        // console.log(this.finaldatamargin)

        document.getElementById('loader-1').style.display = "none"
        document.getElementById('canvas').style.display = "block"

        this.chart = new Chart('canvas', {
          type: 'line',
          data: {
            datasets: [{
              data: this.finaldata,
              fill: false,
              borderColor: 'red',
              pointRadius: 0
            }]
          },
          options: {
            elements: {
              line: {
                  tension: 0,
                  borderWidth: 2,
              },
            },  
            responsive: true,
            legend: {
              display: false,
              labels: {
                generateLabels: (canvas) => [
                  {
                    text: 'Amount',
                    fillStyle: 'skyblue'
                  }
                ] 
              }
            },
            tooltips: {
              mode: 'index',
              intersect: false,
              callbacks: {
                title: function(tooltipItems, data) {
                  //Return value for title
                  if(tooltipItems[0].yLabel!=0) {
                    if(this.dateoption=="Today"||this.dateoption=="Yesterday") {
                      return tooltipItems[0].xLabel.toString()
                    }
                    else {
                      return new Date(tooltipItems[0].xLabel).toDateString();
                    }
                  }
                  else {
                    return ''
                  }
                },
                label: function(tooltipItems, data) {
                  if(tooltipItems.yLabel!=0) {
                    return tooltipItems.yLabel.toString()
                  }
                  else {
                    return ''
                  }
                },
              }
            },
            scales: {
              xAxes: [{
                type: 'time',
                time: {
                    unit: unit,
                    stepSize: steps
                },
                
                display: true,
                scaleLabel: {
                  display: false,
                  labelString: 'Time'
                }
              }],
              yAxes: [{
                ticks: {
                  callback: function(value, index, values) {
                      return '₹' + value;
                  },
                  beginAtZero: true,
              },
                display: true,
                scaleLabel: {
                  display: false,
                  labelString: 'Amount'
                }
              }]
            }
          }
        })

        document.getElementById('loader-2').style.display = "none"
        document.getElementById('canvastwo').style.display = "block"

        this.charttwo = new Chart('canvastwo', {
          type: 'line',
          data: {
            // labels: DAYS(),
            datasets: [{
              data: this.finaldatamargin,
              fill: false,
              borderColor: 'red',
              pointRadius: 0
            }]
          },
          options: {
            elements: {
              line: {
                  tension: 0,
                  borderWidth: 2,
              }
            },
            responsive: true,
            legend: {
              display: false,
              labels: {
                generateLabels: (canvastwo) => [
                  {
                    text: 'Amount',
                    fillStyle: 'skyblue'
                  }
                ] 
              }
            },
            tooltips: {
              mode: 'index',
              intersect: false,
              callbacks: {
                title: function(tooltipItems, data) {
                  //Return value for title
                  if(tooltipItems[0].yLabel!=0) {
                    return new Date(tooltipItems[0].xLabel).toDateString();
                  }
                  else {
                    return ''
                  }
                },
                label: function(tooltipItems, data) {
                  if(tooltipItems.yLabel!=0) {
                    return tooltipItems.yLabel.toString()
                  }
                  else {
                    return ''
                  }
                },
              }
            },
            hover: {
              mode: 'nearest',
              intersect: true
            },
            scales: {
              xAxes: [{
                type: 'time',
                time: {
                    unit: unit,
                    stepSize: steps
                },
                display: true,
                scaleLabel: {
                  display: false,
                  labelString: 'Time'
                }
              }],
              yAxes: [{
                ticks: {
                  callback: function(value, index, values) {
                      return '₹' + value;
                  },
                  beginAtZero: true,
              },
                display: true,
                scaleLabel: {
                  display: true,
                  labelString: 'Amount'
                }
              }]
            }
          }
        })

  }

}
