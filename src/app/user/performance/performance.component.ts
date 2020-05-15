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
dates = []
finaldata = []
finaldatamargin = []
dateoption = "Last 7 days"
datefinal = moment().subtract(7, 'days').format()

  select() {
    document.getElementById('canvas').style.display = "none"
    document.getElementById('canvastwo').style.display = "none"
    console.log(this.dateoption)
    switch(this.dateoption) {
      case "Last 7 days":
        console.log("case 1")
        this.datefinal = moment().subtract(7, 'days').format()
        break
      case "Last 30 days":
        console.log("case 2")
        this.datefinal = moment().subtract(30, 'days').format()
        break
      case "Last 90 days":
        console.log("case 3")
        this.datefinal = moment().subtract(90, 'days').format()
        break
      default:
        console.log("def")
    }
    document.getElementById('loader-1').style.display = "block"
    document.getElementById('loader-2').style.display = "block"
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
    this.charter(this.datefinal)
  }
 
  ngOnInit() {
    console.log(this.price)
    this.charter(this.datefinal)
  }
  
  charter(date) {
    document.getElementById('canvas').style.display = "none"
    document.getElementById('canvastwo').style.display = "none"
    this.http.get('http://127.0.0.1:8000/andme/orders/' + date)
    .subscribe(
      data => {
        console.log(data);
        this.deta = data
        this.margin = this.data.getuserdata().margin/100
        console.log(this.margin)
        for(var i = 0; i<this.deta.length; i++) {
          this.newlist.push(...(data[i].orders))
        }
        console.log(this.newlist)
        for(i of this.newlist) {
          if(i['discount_codes'].length) {
            this.codelist.push(...i['discount_codes'])
          }
        }
        // console.log(this.codelist)
        this.foundcode = this.codelist.filter(item => item.code=="ANDME5")
        // console.log(this.foundcode)
        for(var i=0; i<this.foundcode.length; i++) {
          this.foundorder.push(this.newlist.filter(item => item.discount_codes[0]==this.foundcode[i])[0])
        }
        console.log(this.foundorder)
        this.price = this.foundorder.map(res => parseFloat(res.subtotal_price))
        console.log(this.price.reverse())
        this.dates = this.foundorder.map(res => moment(res.created_at).format('LLL'))
        this.dates = this.dates.reverse()
        console.log(this.dates.reverse())
        for(var i=0; i<this.price.length; i++) {
          this.finaldata.push({x: new Date(this.dates[this.dates.length - i - 1]), y: this.price[i].toFixed(2)})
          this.finaldatamargin.push({x: new Date(this.dates[this.dates.length - i - 1]), y: (this.price[i]*this.margin).toFixed(2)})
        }
        console.log(this.finaldata)
        console.log(this.finaldatamargin)

        document.getElementById('loader-1').style.display = "none"
        document.getElementById('canvas').style.display = "block"

        this.chart = new Chart('canvas', {
          type: 'line',
          data: {
            datasets: [{
              data: this.finaldata,
              fill: false,
              borderColor: 'skyblue'
            }]
          },
          options: {
            elements: {
              line: {
                  tension: 0
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
            },
            hover: {
              mode: 'nearest',
              intersect: true
            },
            scales: {
              xAxes: [{
                type: 'time',
                time: {
                    unit: 'day',
                    stepSize: 1
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

        document.getElementById('loader-2').style.display = "none"
        document.getElementById('canvastwo').style.display = "block"
        
        this.charttwo = new Chart('canvastwo', {
          type: 'line',
          data: {
            // labels: DAYS(),
            datasets: [{
              data: this.finaldatamargin,
              fill: false,
              borderColor: 'skyblue'
            }]
          },
          options: {
            elements: {
              line: {
                  tension: 0
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
            },
            hover: {
              mode: 'nearest',
              intersect: true
            },
            scales: {
              xAxes: [{
                type: 'time',
                time: {
                    unit: 'day',
                    stepSize: 1
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
