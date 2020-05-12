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
    $(document).ready(function(){
      var w_w = $(window).width();
      console.log("ready")
      if(w_w < 1200){
        $("#main").removeClass('container')
        $("#main").addClass('container-fluid');
      }
      $(window).resize(function(){
      var w_w = $(window).width();
      console.log("resize")
      if(w_w < 1200){
        $("#main").removeClass('container')
        $("#main").addClass('container-fluid');
      }
      });
    });

    this.http.get('http://127.0.0.1:8000/andme/products/')
      .subscribe(
        data => {
          this.products = data['products']
          this.data.setstoredata(this.products)
        },
        error => {
          alert(JSON.stringify(error))
        }
        )
  }
}
