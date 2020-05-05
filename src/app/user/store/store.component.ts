import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  constructor(
    private http: HttpClient,
  ) { }

  categories
  hovbutton
  hovered

  ngOnInit() {
    this.http.get('http://127.0.0.1:8000/andme/products/')
      .subscribe(
        data => {
          // console.log(data);
          this.categories = data['Categories']
          // console.log(this.categories)
          // for (var i of this.categories) {console.log(i.products)}
        },
        error => {
          alert(JSON.stringify(error))
        }
        )
  }

  onhover() {
    document.getElementById('menu'+this.hovbutton).style.color = "red"
    document.getElementById('menu'+this.hovbutton).style.backgroundColor = "white"
    this.hovered = this.hovbutton
  }

  ofhover() {
    document.getElementById('menu'+this.hovbutton).style.color = "black"
    document.getElementById('menu'+this.hovbutton).style.backgroundColor = "inherit"
    this.hovered = undefined
  }

}
