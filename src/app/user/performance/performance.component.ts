import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.css']
})
export class PerformanceComponent implements OnInit {

  constructor(
    private weather: DataService
  ) { }
  
res
chart

  ngOnInit() {
    this.res = JSON.parse(this.weather.dailyForecast())
    console.log(this.res)
    let temp_max = this.res['list'].map(res => res.main.temp_max)
    let temp_min = this.res['list'].map(res => res.main.temp_min)
    let alldates = this.res['list'].map(res => res.dt)

    let weatherDates = []
    alldates.forEach((res) => {
      let jsdate = new Date(res * 1000)
      weatherDates.push(jsdate.toLocaleTimeString('en', {year:'numeric', month: 'short', day: 'numeric'}))
    })

    console.log(weatherDates)

    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: weatherDates,
        datasets: [
          {
            data: temp_max,
            borderColor: '#3cba9f',
            fill: false
          },
          {
            data: temp_min,
            borderColor: '#ffcc00',
            fill: false
          },
        ]
      },
      options: {
        responsive: true,
        legend: {
          display: false
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
						display: true,
						scaleLabel: {
							display: true,
							labelString: 'Time'
						}
					}],
					yAxes: [{
						display: true,
						scaleLabel: {
							display: true,
							labelString: 'Temp'
						}
					}]
				}
      }
    })
  }

}
