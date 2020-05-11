import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from 'src/app/data.service';

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

  categories
  hovbutton
  hovered

  ngOnInit() {
    this.http.get('http://127.0.0.1:8000/andme/products/')
      .subscribe(
        data => {
          this.categories = data['Categories']
          this.data.setstoredata(this.categories)
        },
        error => {
          alert(JSON.stringify(error))
        }
        )
  }

  onhover() {
    this.hovered = this.hovbutton
  }

  ofhover() {
    this.hovered = undefined
  }

}
