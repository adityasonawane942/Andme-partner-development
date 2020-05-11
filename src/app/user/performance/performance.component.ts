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
    private weather: DataService,
    private http: HttpClient
  ) { }

res
chart
newlist = []
codelist = []
foundcode = []
foundorder = []
price = []
dates = []
finaldata = []

  ngOnInit() {
    console.log(this.price)
    this.http.get('http://127.0.0.1:8000/andme/orders')
    .subscribe(
      data => {
        console.log(data);
        for(var i = 0; i<5; i++) {
          this.newlist.push(...data[i].orders)
        }
        // console.log(this.newlist)
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
        console.log(this.dates.reverse())
        for(var i=0; i<this.price.length; i++) {
          this.finaldata.push({x: new Date(this.dates[i]), y: this.price[i]})
        }
        console.log(this.finaldata)

        this.chart = new Chart('canvas', {
          type: 'line',
          data: {
            // labels: DAYS(),
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
              }
            },
            responsive: true,
            legend: {
              display: true,
              labels: {
                generateLabels: (canvas) => [
                  {
                    text: 'Amount',
                    fillStyle: 'skyblue'
                  }
                ] 
              }
            },
            title: {
              display: true,
              text: 'Chart.js Line Chart'
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
                // time: {
                //     displayFormats: {
                //         quarter: 'MMM YYYY'
                //     }
                // }
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
