import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { Chart } from 'chart.js';
import { HttpClient } from '@angular/common/http';
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
  ) { }

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


  select() {
    this.disabled = true
    this.newlist = []
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
    // console.log(this.dateoption)
    switch(this.dateoption) {
      case "Today":
        this.datefinal = moment().startOf('day').format()
        // this.finaldata = []
        // var start = moment().startOf('day')
        // for(var i=0; i<24; i=i+3) {
        //   this.finaldata.push({x: start.toDate(), y: 0})
        //   start = start.add(3, 'hours')
        // }
        // console.log(this.finaldata)
        break
      case "Yesterday":
        this.datefinal = moment().subtract(1, 'days').startOf('day').format()
        // this.finaldata = []
        // var start = moment().subtract(1, 'day').startOf('day')
        // for(var i=0; i<24; i=i+3) {
        //   this.finaldata.push({x: start.toDate(), y: 0})
        //   start = start.add(3, 'hours')
        // }
        // console.log(this.finaldata)
        break
      case "Last 7 days":
        this.datefinal = moment().subtract(7, 'days').format()
        this.unit = 'day'
        this.steps = 1
        // this.finaldata = []
        // var start = moment().subtract(7, 'days')
        // for(var i=0; i<7; i++) {
        //   this.finaldata.push({x: start.toDate(), y: 0})
        //   start = start.add(1, 'day')
        // }
        // console.log(this.finaldata)
        break
      case "Last 30 days":
        this.datefinal = moment().subtract(30, 'days').format()
        this.unit = 'day'
        this.steps = 3
        break
      case "Last 90 days":
        this.datefinal = moment().subtract(90, 'days').format()
        this.unit = 'day'
        this.steps = 9
        break
      default:
        // console.log("def")
    }
    document.getElementById('loader-1').style.display = "block"
    document.getElementById('loader-2').style.display = "block"
    this.charter(this.datefinal, this.unit, this.steps)
  }
 
  ngOnInit() {
    this.datesetter()
    // console.log(this.price)
    this.charter(this.datefinal, this.unit, this.steps)
  }

  // dater(startday) {
  //   var now = moment()
  //   var start = moment().subtract(startday, 'days')
  //   var next = moment().subtract(startday-1, 'days')
  //   console.log(now.format())
  //   console.log(start.format())
  //   console.log(next.format())
  //   var count = 0
  //   while(next.format()!=now.format()&&count!=7) {
  //     count = count + 1
  //     this.finaldata.push({x: start.toDate(), y: 0})
  //     console.log("add0")
  //     for(var i=0; i<this.price.length; i++) {
  //       console.log("for")
  //       var mome = moment(this.dates[this.dates.length - i - 1])
  //       console.log(mome.format())
  //       if(mome.isBetween(start, next)) {
  //         this.finaldata.push({x: new Date(this.dates[this.dates.length - i - 1]).toDateString(), y: this.price[i].toFixed(2)})
  //         this.finaldatamargin.push({x: new Date(this.dates[this.dates.length - i - 1]).toDateString(), y: (this.price[i]*this.margin).toFixed(2)})
  //       }
  //     }
  //     start = next
  //     console.log(start.format())
  //     next = next.add(1, 'day')
  //     console.log(next.format())
  //     console.log(next.format()==now.format())
  //     console.log(now.format())
  //   }
  // }
  
  charter(date, unit, steps) {
    document.getElementById('canvas').style.display = "none"
    document.getElementById('canvastwo').style.display = "none"
    this.http.get('http://partnerapi.andme.in/andme/orders/' + date)
    .subscribe(
      data => {
        // console.log(data);
        this.disabled = false
        this.deta = data
        this.margin = this.data.getuserdata().margin/100
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
        this.foundcode = this.codelist.filter(item => item.code=="FREESHAKER")
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
        this.datesfortable = this.foundorder.map(res => moment(res.created_at).format('LLL'))
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
          this.finaldata.push({x: new Date(this.dates[this.dates.length - i - 1]).toISOString(), y: this.price[i].toFixed(2)})
          this.finaldatamargin.push({x: new Date(this.dates[this.dates.length - i - 1]).toISOString(), y: (this.price[i]*this.margin).toFixed(2)})
        }
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
                  return moment(tooltipItems[0].xLabel).toString().substr(0,24);
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
                  display: true,
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
      },
      error => {
        alert(JSON.stringify(error))
      }
    )
  }

}
