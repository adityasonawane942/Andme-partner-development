import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from 'src/app/data.service';
import * as $ from 'jquery'

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private data: DataService,
  ) { }

  products

  ngOnInit() {
    if(this.data.getstoredata()) {
      this.products = this.data.getstoredata()
    }
    else {
      this.http.get('http://127.0.0.1:8000/andme/products/')
      .subscribe(
        data => {
          this.products = data['products']
          this.data.setstoredata(this.products)
          console.log(this.products)
        },
        error => {
          alert(JSON.stringify(error))
        }
        )
    }

    $(document).ready(function(){
      var w_w = $(window).width();
      if(w_w < 1200){
        $("#main").removeClass('container')
        $("#main").addClass('container-fluid');
      }
      else {
        $("#main").removeClass('container-fluid')
        $("#main").addClass('container');
      }
      $(window).resize(function(){
      var w_w = $(window).width();
      if(w_w < 1200){
        $("#main").removeClass('container')
        $("#main").addClass('container-fluid');
      }
      else {
        $("#main").removeClass('container-fluid')
        $("#main").addClass('container');
      }
      });
    });
  }
}
